require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const mongoose = require("mongoose");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

async function verifyToken(tokenId) {
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}

async function login(req, res) {
  try {
    const { tokenId } = req.body;

    if (!GOOGLE_CLIENT_ID || !client) {
      return res.status(503).json({ message: "Google login is not configured" });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is not connected" });
    }

    if (!tokenId) {
      return res.status(400).json({ message: "tokenId is required" });
    }

    const payload = await verifyToken(tokenId);
    const { sub, name, email, locale, picture } = payload;

    let user = await User.findOne({ googleid: sub });

    if (user) {
      const updates = {};
      if (user.name !== name) updates.name = name;
      if (user.email !== email) updates.email = email;
      if (user.locale !== locale) updates.locale = locale;
      if (user.picture !== picture) updates.picture = picture;

      if (Object.keys(updates).length > 0) {
        Object.assign(user, updates);
        user = await user.save();
      }
    } else {
      user = await User.create({
        name,
        googleid: sub,
        email,
        locale,
        picture,
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = {
  login,
};
