import React, { useState, useEffect } from "react";
import "./Users.css";

function Users(props) {
  const [users, setUsers] = useState([]);
  const socket = props.socket;

  useEffect(() => {
    if (socket != null) {
      socket.on("user-list", data => {
        setUsers(data);
        console.log(data);
      });
    }
  });

  var render_users = users.map(x => (
    <li className="user_key" key={x}>
      {x}
    </li>
  ));

  return (
    <div className="Users">
      <h3 className="title">User Currently Online</h3>
      <ul className="user-list">
        {users.length > 0 ? render_users : <span></span>}
      </ul>
    </div>
  );
}

export default Users;
