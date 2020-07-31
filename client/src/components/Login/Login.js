import React, { useState } from "react";
import "./Login.css";

function Login(props) {
  const [name, setName] = useState("");

  function handleSubmit() {
    props.handler(name);
  }

  return (
    <div className="Login">
      <div className="login-window">
        <p className="title">Real Time Code Collaborator</p>
        <input
          className="input-usr"
          placeholder="Enter you name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <button className="join-btn" onClick={handleSubmit}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Login;
