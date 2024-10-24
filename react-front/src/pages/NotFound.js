import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-start p-40 h-screen bg-black text-white ">
      <h1 className="text-[10rem] font-bold">404</h1>
      <p className="text-2xl mt-4">
        Page Not Found, You come to a page of nowhere
      </p>
    </div>
  );
};

export default NotFoundPage;
