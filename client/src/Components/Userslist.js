import React from "react";

function Userslist(props) {
  return (
    <li>
      {props.value.username}
      <button id={props.id} onClick={() => props.deleteItem(props.value.id)}>
        Delete
      </button>
      <button id={props.id} onClick={() => props.editItem(props.value.id)}>
        Edit
      </button>
    </li>
  );
}

export default Userslist;
