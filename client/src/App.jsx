import { useEffect, useState, useContext } from "react";
import "./App.css";
import styled from "styled-components";
import { spotifyContent } from "./components/Router";
import UserDetails from "./components/UserDetails";
import UserPlaylists from "./components/UserPlaylists";

const GreenButton = styled.a`
  background-color: #bc2cbc;
  padding: 10px;
  color: white;
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
  const [authCode, setAuthCode] = useState("");
  const { setToken } = useContext(spotifyContent);

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${
    import.meta.env.VITE_CLIENTID
  }&response_type=code&redirect_uri=${
    import.meta.env.VITE_REDIRECTURI
  }&scope=playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming`;

  async function getAuthToken(code) {
    const response = await fetch("http://localhost:3000/login", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: `${code}` }),
      method: "POST",
    });
    const token = await response.json();
    // console.log(token);
    // setAccessToken(token);
    setToken(token);
  }

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    setAuthCode(code);
  }, []);

  useEffect(() => {
    getAuthToken(authCode);
  }, [authCode]);

  return (
    <div>
      <Header className="header">
        <h2 style={{ color: "white", fontFamily: "'Fira Sans', sans-serif" }}>
          Spotify Playlist Editor
        </h2>
        <GreenButton href={authUrl}>Login</GreenButton>
      </Header>
      <div className="body">
        <UserDetails />
        <UserPlaylists />
      </div>
    </div>
  );
}

export default App;
