import React from "react";
import headerBackground from "../assets/header-background.jpg";
import styled from "styled-components";

const GreenButton = styled.a`
  background-color: #bc2cbc;
  padding: 10px;
  color: white;
  border: none;
  font-size: 2rem;
  border-radius: 8px;
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  /* background-color: purple; */
  filter: contrast(1);
`;

const Header = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${
    import.meta.env.VITE_CLIENTID
  }&response_type=code&redirect_uri=${
    import.meta.env.VITE_REDIRECTURI
  }&scope=playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming`;
  return (
    <HeaderDiv
      className="header"
      style={{ background: `url(${headerBackground})` }}
    >
      <h1
        style={{
          fontFamily: "'Fira Sans', sans-serif",
          color: "#78c945",
          textShadow: "2px 2px Green",
        }}
      >
        Spotify Playlist Editor
      </h1>
      <GreenButton href={authUrl}>Login</GreenButton>
    </HeaderDiv>
  );
};

export default Header;
