import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import { createContext } from "react";
import PlaylistSongs from "./PlaylistSongs";
import Header from "./Header";

export const spotifyContent = createContext(null);
const Router = () => {
  const [tokenDetails, setTokenDetails] = useState("");
  const [userDetails, setUserDetails] = useState("");
  // const [expiryTime, setExpiryTime] = useState(0);

  // useEffect(() => {
  //   setExpiryTime(tokenDetails.token_expiry);
  // }, [tokenDetails]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refreshToken();
  //   }, expiryTime);
  //   console.log(expiryTime);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (tokenDetails !== "") {
      console.log(tokenDetails.token_expiry * 1000);
      const interval = setInterval(() => {
        refreshToken();
      }, tokenDetails.token_expiry * 1000);
      return () => clearInterval(interval);
    }
  }, [tokenDetails]);

  async function refreshToken() {
    const response = await fetch("http://localhost:3000/refresh_token", {
      mode: "cors",
    });
    const data = await response.json();
    setToken(data);
  }

  function setUser(details) {
    setUserDetails(details);
  }

  function setToken(token) {
    setTokenDetails(token);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        { path: "/", element: <App /> },
        { path: "/:id", element: <PlaylistSongs /> },
      ],
    },
  ]);

  return (
    <spotifyContent.Provider
      value={{ tokenDetails, setToken, setUser, userDetails }}
    >
      <RouterProvider router={router} />
    </spotifyContent.Provider>
  );
};

export default Router;
