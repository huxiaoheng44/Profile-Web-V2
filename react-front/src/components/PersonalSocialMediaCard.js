import React, { useState } from "react";
import { FaGithub, FaWeixin, FaLinkedin } from "react-icons/fa";

const PersonalSocialMediaCard = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      link: "https://github.com/huxiaoheng44",
      showQR: false,
    },
    {
      name: "WeChat",
      icon: FaWeixin,
      qrCode: `${process.env.PUBLIC_URL}/resources/contact/wechat-qr.jpg`,
      showQR: true,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/xiaohenghu",
      qrCode: `${process.env.PUBLIC_URL}/resources/contact/linkedin-qr.jpg`,
      showQR: true,
    },
  ];

  return (
    <div className="text-white p-4 rounded-md shadow-lg border-primary flex flex-col h-[25rem] relative">
      <h2 className="text-xl font-bold mb-6">Connect With Me</h2>
      <div className="flex justify-around items-center flex-grow">
        {socialLinks.map((social) => (
          <div
            key={social.name}
            className="relative group"
            onMouseEnter={() => setHoveredIcon(social.name)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {social.link ? (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl hover:text-primary transition-colors duration-300"
              >
                <social.icon />
              </a>
            ) : (
              <div className="text-4xl hover:text-primary transition-colors duration-300 cursor-pointer">
                <social.icon />
              </div>
            )}

            {hoveredIcon === social.name && social.showQR && (
              <div className="absolute -top-[280px] left-1/2 transform -translate-x-1/2 bg-zinc-800 p-3 rounded-lg shadow-lg z-10">
                <div className="w-[200px] h-[200px] relative">
                  <img
                    src={social.qrCode}
                    alt={`${social.name} QR Code`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-sm mt-2">{social.name}</p>
              </div>
            )}

            {hoveredIcon === social.name && !social.showQR && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded-lg shadow-lg z-10">
                <p className="text-center text-sm">{social.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalSocialMediaCard;
