import React from "react";

const PrimaryButton = ({ children }) => {
  return (
    <button
      className="bg-black text-white p-2 rounded-lg"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
