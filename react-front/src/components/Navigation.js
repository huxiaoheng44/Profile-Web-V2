import React from "react";
import IconXiaoheng from "../Icons/IconXiaoheng";
import PrimaryButton from "./Buttons/PrimaryButton";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-black text-white flex justify-between items-center p-4 border-b-2 border-zinc-600 h-20">
      <div className="text-2xl">
        <Link to="/home">
          <IconXiaoheng className="inline-block" />
        </Link>
      </div>
      <div className="button-group flex flex-row gap-3">
        <Link to="/home">
          <PrimaryButton>Home</PrimaryButton>
        </Link>
        <Link to="/about">
          <PrimaryButton>About</PrimaryButton>
        </Link>
        <Link to="/projects">
          <PrimaryButton>Projects</PrimaryButton>
        </Link>
        <Link to="/contact">
          <PrimaryButton>Contact</PrimaryButton>
        </Link>
      </div>
    </nav>
  );
}
