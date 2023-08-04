import React, { useState, useContext, useEffect } from "react";
import { spotifyContent } from "./Router";

const UserDetails = () => {
  const { tokenDetails } = useContext(spotifyContent);
  const [username, setUsername] = useState("");
  let myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);

  async function getUserName() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      mode: "cors",
      headers: myHeader,
    });
    const data = await response.json();
    setUsername(data.display_name);
  }

  useEffect(() => {
    getUserName();
  }, [tokenDetails]);

  return (
    <div>
      <p>{username !== "" ? username : ""}</p>
    </div>
  );
};

export default UserDetails;
