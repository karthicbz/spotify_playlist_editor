import "./App.css";
import styled from "styled-components";

const GreenButton = styled.button`
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
  return (
    <div>
      <Header className="header">
        <h2 style={{ color: "white" }}>Spotify Playlist Editor</h2>
        <GreenButton className="login-button">Login</GreenButton>
      </Header>
    </div>
  );
}

export default App;
