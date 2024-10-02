import React from "react";
import { useUser } from "../../UserContext";

const GoogleLogoutButton = () => {
  // Get user information from useUser
  const { userId, userName, setUserId, setUserAvatar, setUserName } = useUser();

  const handleLogout = () => {
    console.log("Logging out, current user info:", userId, userName);

    // Clear session storage
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userAvatar");
    sessionStorage.removeItem("userId");

    // Reset user information in context
    setUserId(null);
    setUserName(null);
    setUserAvatar(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-black text-sm text-red-100 font-bold border-red-400 border rounded-md hover:bg-green-200  hover:text-black focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
    >
      Sign Out
    </button>
  );
};

export default GoogleLogoutButton;
