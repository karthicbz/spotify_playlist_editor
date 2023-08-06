import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { spotifyContent } from "./Router";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const GridDiv = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 8px;

  & > div {
    cursor: pointer;
    display: grid;
    justify-items: center;
    padding: 4px;
    transition: box-shadow ease-in-out 0.3s;
  }

  & > div:hover {
    box-shadow: 3px 2px 9px 0px #bdb7b7;
  }

  & > div > a {
    text-decoration: none;
  }

  & > div > a > p {
    font-family: "Fira Sans", sans-serif;
    color: black;
    font-size: 1.2rem;
  }
`;

const UserPlaylists = () => {
  const { tokenDetails, userDetails } = useContext(spotifyContent);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  let myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);
  myHeader.append("Content-Type", "application/json");

  async function getPlayList() {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      mode: "cors",
      headers: myHeader,
    });
    const data = await response.json();
    setPlaylistDetails(data.items);
  }

  async function createNewPlaylist() {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userDetails.id}/playlists`,
      {
        mode: "cors",
        headers: myHeader,
        body: JSON.stringify({
          name: `${playlistName}`,
          description: "",
          public: true,
        }),
        method: "POST",
      }
    );
  }

  useEffect(() => {
    getPlayList();
  }, [tokenDetails]);

  return (
    <GridDiv>
      {playlistDetails !== undefined ? (
        playlistDetails.map((detail) => {
          return (
            <div key={detail.id}>
              {/* <img src={detail.images[1].url} /> */}
              <Link to={`/${detail.id}`}>
                {detail.images[0] !== undefined ? (
                  <img
                    src={detail.images[0].url}
                    style={{ maxWidth: "250px" }}
                  />
                ) : (
                  <span class="material-symbols-outlined">imagesmode</span>
                )}
                <p>{detail.name}</p>
              </Link>
            </div>
          );
        })
      ) : (
        <p>Login to see your playlists</p>
      )}
      {playlistDetails !== undefined && (
        <div
          style={{
            maxWidth: "250px",
            minHeight: "250px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            const name = prompt("New Playlist name?");
            setPlaylistName(name);
          }}
        >
          <span class="material-symbols-outlined" style={{ fontSize: "4rem" }}>
            add
          </span>
        </div>
      )}
    </GridDiv>
  );
};

export default UserPlaylists;
