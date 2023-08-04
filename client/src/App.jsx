import { useEffect, useState, useContext } from "react";
import "./App.css";
import styled from "styled-components";
import { spotifyContent } from "./components/Router";
import UserDetails from "./components/UserDetails";

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
  const [authCode, setAuthCode] = useState("");
  const { setToken } = useContext(spotifyContent);

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${
    import.meta.env.VITE_CLIENTID
  }&response_type=code&redirect_uri=${
    import.meta.env.VITE_REDIRECTURI
  }&scope=playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public app-remote-control streaming`;

  function getCode() {
    const code = new URLSearchParams(window.location.search).get("code");
    // return code;
    setAuthCode(code);
  }

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
    let code = getCode();
    // console.log(code);
    if (authCode !== "") {
      getAuthToken(authCode);
    }
  });

  return (
    <div>
      <Header className="header">
        <h2 style={{ color: "white" }}>Spotify Playlist Editor</h2>
        <GreenButton href={authUrl}>Login</GreenButton>
      </Header>
      <div className="body">
        <UserDetails />
      </div>
    </div>
  );
}

export default App;
