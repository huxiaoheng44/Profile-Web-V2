import React, { useEffect } from "react";
import { useUser } from "../UserContext";

const BlendeCursor = () => {
  const { cursorMessage } = useUser();

  useEffect(() => {
    const followCursor = (e) => {
      const cursor = document.querySelector("#cursor-blende");

      // clientX and clientY are the coordinates of the mouse pointer, relative to the top-left corner of the document
      const left = e.clientX - 15; // Half of the cursor width
      const top = e.clientY - 15; // Half of the cursor height
      cursor.style.left = left + "px";
      cursor.style.top = top + "px";

      // If the hovered element has a pointer cursor, enlarge the custom cursor
      if (window.getComputedStyle(e.target).cursor === "pointer") {
        cursor.style.transform = "scale(3)";
      } else if (!cursorMessage) {
        cursor.style.transform = "scale(1)";
      }
    };

    const cursorScaleDown = () => {
      const cursor = document.querySelector("#cursor-blende");
      cursor.style.transform = "scale(0.75)";
    };

    const cursorScaleNormal = () => {
      const cursor = document.querySelector("#cursor-blende");
      if (!cursorMessage) {
        cursor.style.transform = "scale(1)";
      }
    };

    document.addEventListener("mousemove", followCursor);

    // Add event listeners for mousedown and mouseup
    document.addEventListener("mousedown", cursorScaleDown);
    document.addEventListener("mouseup", cursorScaleNormal);

    return () => {
      document.removeEventListener("mousemove", followCursor);
      document.removeEventListener("mousedown", cursorScaleDown);
      document.removeEventListener("mouseup", cursorScaleNormal);
    };
  }, [cursorMessage]);

  return (
    <div
      id="cursor-blende"
      className="rounded-full bg-white w-8 h-8 fixed pointer-events-none mix-blend-difference flex items-center justify-center"
      style={{
        transform: cursorMessage ? "scale(4)" : "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <div
        className="w-7 h-7 text-wrap  flex items-center justify-center"
        style={{
          transform: "scale(1)", // Fixes the scale of the text
          fontSize: "10px", // Set a fixed font size here
        }}
      >
        {cursorMessage && (
          <p
            className="text-black text-center font-bold"
            style={{ fontSize: "5px" }}
          >
            {cursorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlendeCursor;
