import { useCallback } from "react";

const useCursorScale = () => {
  const scaleUpCursor = useCallback(() => {
    const cursor = document.querySelector("#cursor-blende");
    cursor.style.transform = 'scale(2.5)'; 
    console.log('scale up');
  }, []);

  const resetCursorScale = useCallback(() => {
    const cursor = document.querySelector("#cursor-blende");
    cursor.style.transform = 'scale(1)'; 
  }, []);

  return { scaleUpCursor, resetCursorScale };
};

export default useCursorScale;
