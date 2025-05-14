import React from "react";
import { BASE_URL } from "../../config/config";
import { useEffect } from "react";
import { useUser } from "../../UserContext";

const GoogleLoginButton = ({ onError }) => {
  const { setUserId, setUserAvatar, setUserName } = useUser();

  useEffect(() => {
    window.handleLogin = async (response) => {
      try {
        console.log(response);
        const res = await fetch(BASE_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tokenId: response.credential }),
        });

        if (!res.ok) {
          throw new Error("Login failed");
        }

        const data = await res.json();
        console.log("userInfo:", data);
        setUserName(data.name);
        setUserAvatar(data.picture);
        setUserId(data.googleid);

        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("userAvatar", data.picture);
        sessionStorage.setItem("userId", data.googleid);
      } catch (error) {
        console.error("Login error:", error);
        if (onError) {
          onError(error);
        }
      }
    };

    return () => {
      window.handleLogin = undefined;
    };
  }, [setUserId, setUserAvatar, setUserName, onError]);

  // make sure the google login button is always showed
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {};
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        className=" z-10"
        id="g_id_onload"
        data-client_id="428394025772-7dku9vrms7l56cpcf28l9a2ara40098r.apps.googleusercontent.com"
        data-context="use"
        data-ux_mode="popup"
        data-callback="handleLogin"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="circle"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="medium"
      ></div>
    </>
  );
};

export default GoogleLoginButton;
