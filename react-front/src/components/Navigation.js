import React from "react";
import IconXiaoheng from "../Icons/IconXiaoheng";
import PrimaryButton from "./Buttons/PrimaryButton";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export default function Navigation() {
  const handlePrimaryTabClick = (tabName, path) => {
    trackEvent("primary_tab_click", {
      tab_name: tabName,
      tab_level: "primary",
      target_path: path,
    });
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 border-b-2 border-zinc-600 h-20">
      <div className="text-2xl">
        <Link
          to="/home"
          onClick={() => handlePrimaryTabClick("home_logo", "/home")}
        >
          <IconXiaoheng className="inline-block" />
        </Link>
      </div>
      <div className="button-group flex flex-row gap-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() =>
              handlePrimaryTabClick(item.label.toLowerCase(), item.path)
            }
          >
            <PrimaryButton>{item.label}</PrimaryButton>
          </Link>
        ))}
      </div>
    </nav>
  );
}
