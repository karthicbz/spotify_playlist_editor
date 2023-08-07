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
`;

const PlaylistSongs = () => {
  const { id } = useParams();
  const { tokenDetails } = useContext(spotifyContent);
  const [songs, setSongs] = useState([]);

  const myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);

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
