import React from "react";
import styled from "styled-components";

const DeleteOption = ({ id, deleteItem }) => {
  return (
    <div>
      <span
        className="material-symbols-outlined"
        onClick={(e) =>
          e.target.parentNode.childNodes[1].classList.toggle("showDelete")
        }
        style={{
          color: "#97ee0b",
          fontSize: "1.2rem",
          background: "green",
          borderRadius: "50%",
          boxShadow: "1px 1px 4px gray",
        }}
      >
        more_vert
      </span>
      <div
        id={id}
        className="deleteButton"
        style={{
          maxWidth: "max-content",
          color: "white",
          padding: "4px",
          margin: "3px",
          borderRadius: "4px",
        }}
        onClick={deleteItem}
      >
        delete
      </div>
    </div>
  );
};

export default DeleteOption;
