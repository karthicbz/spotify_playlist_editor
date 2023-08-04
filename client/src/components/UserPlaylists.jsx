import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { spotifyContent } from "./Router";
import styled from "styled-components";

const GridDiv = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 8px;

  & > div > h2 {
    font-family: "Fira Sans", sans-serif;
  }
`;

const UserPlaylists = () => {
  const { tokenDetails } = useContext(spotifyContent);
  const [playlistDetails, setPlaylistDetails] = useState([]);
  let myHeader = new Headers();
  myHeader.append("Authorization", `Bearer ${tokenDetails.access_token}`);

  async function getPlayList() {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      mode: "cors",
      headers: myHeader,
    });
    const data = await response.json();
    setPlaylistDetails(data.items);
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
              <img src={detail.images[0].url} style={{ maxWidth: "250px" }} />
              <h2>{detail.name}</h2>
            </div>
          );
        })
      ) : (
        <p>Login to see your playlists</p>
      )}
    </GridDiv>
  );
};

export default UserPlaylists;
