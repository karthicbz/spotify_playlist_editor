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

const DummyDiv = styled.div`
  max-width: 250px;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 4rem;
    color: #78c945;
  }
`;

const UserPlaylists = () => {
  const { tokenDetails, userDetails } = useContext(spotifyContent);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  // const [playlistName, setPlaylistName] = useState("");

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

  async function createNewPlaylist(playlistName) {
    let raw = `{"name": "${playlistName}","description": "New playlist description","public": false}`;
    console.log(raw);
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userDetails.id}/playlists`,
      {
        mode: "cors",
        headers: myHeader,
        body: raw,
        method: "POST",
      }
    );
    // console.log(response.json());
    getPlayList();
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
                  <DummyDiv>
                    <span className="material-symbols-outlined">
                      music_note
                    </span>
                  </DummyDiv>
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
        <DummyDiv
          onClick={() => {
            const name = prompt("New Playlist name?");
            // setPlaylistName(name);
            if (name !== "" && name !== null) {
              if (name) {
                createNewPlaylist(name);
              } else {
                alert("Playlist name should not be empty");
              }
            }
          }}
        >
          <span className="material-symbols-outlined">library_add</span>
        </DummyDiv>
      )}
    </GridDiv>
  );
};

export default UserPlaylists;
