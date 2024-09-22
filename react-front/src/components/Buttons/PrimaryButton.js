import React from "react";
import useCursorScale from "../../utils/useCursorScale";



const PrimaryButton = ({ children }) => {
  const { scaleUpCursor, resetCursorScale } = useCursorScale();
  return (
    <button
      className="bg-black text-white p-2 rounded-lg"
      // onMouseEnter={scaleUpCursor}
      // onMouseLeave={resetCursorScale}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;