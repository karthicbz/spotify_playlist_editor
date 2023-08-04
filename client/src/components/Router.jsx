import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { createContext } from "react";

export const spotifyContent = createContext(null);
const Router = () => {
  const [tokenDetails, setTokenDetails] = useState("");
  function setToken(token) {
    setTokenDetails(token);
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);

  return (
    <spotifyContent.Provider value={{ tokenDetails, setToken }}>
      <RouterProvider router={router} />
    </spotifyContent.Provider>
  );
};

export default Router;
