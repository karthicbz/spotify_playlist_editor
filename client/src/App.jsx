import { useEffect, useState, useContext } from "react";
import "./App.css";
import { spotifyContent } from "./components/Router";
import UserDetails from "./components/UserDetails";
import UserPlaylists from "./components/UserPlaylists";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [authCode, setAuthCode] = useState("");
  const { setToken } = useContext(spotifyContent);

  async function getAuthToken(code) {
    // console.log(`${import.meta.env.VITE_BACKENDURI}`);
    const response = await fetch(`${import.meta.env.VITE_BACKENDURI}login`, {
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
      <div className="body">
        <UserDetails />
        <UserPlaylists />
      </div>
    </div>
  );
}

export default App;
