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
      <p
        style={{
          fontSize: "1.8rem",
          padding: "10px",
          fontFamily: "'Fira Sans', sans-serif",
          color: "#78c945",
        }}
      >
        {username !== undefined ? username + "'s playlist" : ""}
      </p>
    </div>
  );
};

export default UserDetails;
