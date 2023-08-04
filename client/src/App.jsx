import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

const GreenButton = styled.a`
  background-color: greenyellow;
  padding: 10px;
  color: #474747;
  border: none;
  font-size: 2rem;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  background-color: purple;
`;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${
    import.meta.env.VITE_CLIENTID
  }&response_type=code&redirect_uri=${
    import.meta.env.VITE_REDIRECTURI
  }&scope=playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming`;

  function getCode() {
    const code = new URLSearchParams(window.location.search).get("code");
    return code;
  }

  async function getAuthToken(code) {
    let urlEncoded = new URLSearchParams();
    urlEncoded.append("grant_type", "authorization_code");
    urlEncoded.append("code", code);
    urlEncoded.append("redirect_uri", import.meta.env.VITE_REDIRECTURI);

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncoded,
    };

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    );
    const token = await response.json();
    console.log(token);
  }

  useEffect(() => {
    let code = getCode();
    if (code !== "") {
      getAuthToken(code);
    }
  });

  return (
    <div>
      <Header className="header">
        <h2 style={{ color: "white" }}>Spotify Playlist Editor</h2>
        <GreenButton href={authUrl}>Login</GreenButton>
      </Header>
      <div className="body"></div>
    </div>
  );
}

export default App;
