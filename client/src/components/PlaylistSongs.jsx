import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { spotifyContent } from "./Router";
import { GridDiv } from "./UserPlaylists";
import styled from "styled-components";

const Div = styled.div`
  display: ${(props) => (props.songs.length > 0 ? "grid" : "flex")};
  justify-content: ${(props) => (props.length > 0 ? "unset" : "center")};
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  padding: 5px 10px 10px 10px;
  & > .track-image {
    position: relative;
    cursor: pointer;
    transition: box-shadow ease-in-out 0.3s;
    animation-name: card-opening;
    animation-duration: 1s;
    animation-direction: normal;
    animation-iteration-count: 1;
  }
  & > .track-image:hover {
    box-shadow: 3px 2px 9px 0px #bdb7b7;
  }
  & > .track-image > p {
    font-size: 1.3rem;
    font-weight: 700;
    position: absolute;
    bottom: 0;
    padding: 4px;
    /* filter: invert(1); */
    color: #78c945;
    text-shadow: 2px 2px darkgreen;
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

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  gap: 10px;
  & > input {
    width: 320px;
    font-size: 1.2rem;
    padding: 4px;
  }
`;

const PlaylistSongs = () => {
  const { id } = useParams();
  const { tokenDetails } = useContext(spotifyContent);
  const [songs, setSongs] = useState([]);
  const [songInput, setSongInput] = useState("");
  const [searchedSongs, setSearchedSongs] = useState([]);

  const myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);

  function handleSongInput(e) {
    setSongInput(e.target.value);
  }

  async function fetchSongs() {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${songInput}&type=track`,
      {
        mode: "cors",
        headers: myHeader,
      }
    );
    const data = await response.json();
    setSearchedSongs(data.tracks.items);
  }

  async function addSelectedSong() {
    try {
      const s = searchedSongs.filter((song) => song.name === songInput);
      // console.log(s);
      // let raw = `{"uris":["spotify:track:${s[0].id}"]}`;
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?uris=${s[0].uri}`,
        { mode: "cors", method: "POST", headers: myHeader }
      );
      getPlaylistItems();
      setSongInput("");
    } catch (err) {
      console.log("something went wrong", err);
    }
  }

  useEffect(() => {
    if (songInput !== "") {
      fetchSongs();
    }
  }, [songInput]);

  async function getPlaylistItems() {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          mode: "cors",
          headers: myHeader,
        }
      );
      const data = await response.json();
      setSongs(data.items);
    } catch (err) {
      console.log("something went wrong", err);
    }
  }

  useEffect(() => {
    getPlaylistItems();
  }, []);

  async function deleteSong(e) {
    try {
      const raw = `{"tracks":[{"uri":"${e.target.id}"}]}`;
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          mode: "cors",
          method: "DELETE",
          headers: myHeader,
          body: raw,
        }
      );
      getPlaylistItems();
    } catch (err) {
      console.log("Something wrong", err);
    }
  }

  return (
    <div>
      <p
        style={{
          fontSize: "2rem",
          padding: "10px",
          color: "#78c945",
        }}
      >
        Tracks
      </p>
      <SearchBar>
        <input
          list="songs"
          name="songs"
          placeholder="add new song"
          onChange={handleSongInput}
          value={songInput}
        />
        <datalist id="songs">
          {searchedSongs.map((song) => (
            <option value={song.name} />
          ))}
        </datalist>
        <button onClick={addSelectedSong}>Add</button>
      </SearchBar>
      <Div songs={songs} className="track-grid">
        {songs.length > 0 ? (
          songs.map((song) => {
            return (
              <div
                className="track-image"
                key={song.track.id}
                style={{
                  background: `url(${song.track.album.images[0].url})`,
                  maxWidth: "300px",
                  minHeight: "300px",
                }}
              >
                <p>{song.track.name}</p>
                <div>
                  <span
                    class="material-symbols-outlined"
                    onClick={(e) =>
                      e.target.parentNode.childNodes[1].classList.toggle(
                        "showDelete"
                      )
                    }
                    style={{
                      color: "#97ee0b",
                      fontSize: "1.2rem",
                      background: "green",
                      borderRadius: "50%",
                    }}
                  >
                    more_vert
                  </span>
                  <div
                    id={song.track.uri}
                    className="deleteButton"
                    style={{
                      maxWidth: "max-content",
                      color: "white",
                      padding: "4px",
                      margin: "3px",
                      borderRadius: "4px",
                    }}
                    onClick={deleteSong}
                  >
                    delete
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>Empty Playlist ( ˘︹˘ )</p>
          </div>
        )}
      </Div>
    </div>
  );
};

export default PlaylistSongs;
