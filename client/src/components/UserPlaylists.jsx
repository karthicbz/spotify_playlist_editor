import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { spotifyContent } from "./Router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteOption from "./DeleteOption";
import Spinner from "./Spinner";

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
    animation-name: card-opening;
    animation-duration: 0.5s;
    animation-direction: normal;
    animation-iteration-count: 1;
    position: relative;
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

  & > div > div {
    position: absolute;
    left: 0;
    padding: 4px;
  }

  @keyframes card-opening {
    from {
      transform: scale(0);
    }
    50% {
      transform: scale(1.03);
    }
    to {
      transform: scale(1);
    }
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
  const [loading, setLoading] = useState(false);
  // const [playlistName, setPlaylistName] = useState("");

  let myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);

  async function getPlayList() {
    setLoading(true);
    myHeader.append("Content-Type", "application/json");
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      mode: "cors",
      headers: myHeader,
    });
    const data = await response.json();
    setPlaylistDetails(data.items);
    setLoading(false);
  }

  async function createNewPlaylist(playlistName) {
    myHeader.append("Content-Type", "application/json");
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

  async function deletePlaylist(e) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${e.target.id}/followers`,
        {
          mode: "cors",
          method: "DELETE",
          headers: myHeader,
        }
      );
      getPlayList();
    } catch (err) {
      console.log("Something wrong", err);
    }
  }

  return loading ? (
    <Spinner loading={loading} label="Getting playlist" />
  ) : (
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
              <DeleteOption id={detail.id} deleteItem={deletePlaylist} />
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
