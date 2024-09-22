import React, { useEffect } from "react";

const BlendeCursor = () => {

    useEffect(() => {
        const followCursor = (e) => {
            const cursor = document.querySelector("#cursor-blende");

            const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
            
            // clientX and clientY are the coordinates of the mouse pointer, relative to the top-left corner of the document
            const left = e.clientX - 15;   //half of the width of the cursor
            const top = e.clientY - 15;
            cursor.style.left = left + "px";
            cursor.style.top = top + "px";

            if (window.getComputedStyle(e.target).cursor === 'pointer') {
                cursor.style.transform = 'scale(3)'; 
            } else {
                cursor.style.transform = 'scale(1)'; 
            }
        };

        const cursorScaleDown = () => {
            const cursor = document.querySelector("#cursor-blende");
            cursor.style.transform = 'scale(0.75)';
        };

        const cursorScaleNormal = () => {
            const cursor = document.querySelector("#cursor-blende");
            cursor.style.transform = 'scale(1)';
        };

        document.addEventListener("mousemove", followCursor);

        // Add event listeners for mousedown and mouseup
        document.addEventListener('mousedown', cursorScaleDown);
        document.addEventListener('mouseup', cursorScaleNormal);
    
        return () => {
            document.removeEventListener("mousemove", followCursor);
            document.removeEventListener("mousedown", cursorScaleDown);
            document.removeEventListener("mouseup", cursorScaleNormal);
        };
    }, []);

    return (
        <div
            id="cursor-blende"
            // use fixed to prevent the cursor from moving when scrolling
            className="rounded-full bg-white w-8 h-8 fixed pointer-events-none mix-blend-difference"

            style={{ transform: "translate(-50%, -50%)", zIndex: 1000 }}
        >
        </div>
    );
};

export default BlendeCursor;
