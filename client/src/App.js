import React, { useState, useEffect } from "react";
import Editor from "./components/Editor/Editor";
import Users from "./components/Users/Users";
import socketIOClient from "socket.io-client";
import Login from "./components/Login/Login";
import "./App.css";

const ENDPOINT = "http://52.15.58.91:9000";
//const ENDPOINT = "localhost:9000";
const socket = socketIOClient(ENDPOINT);
function App() {
  const [res, setRes] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("compile-rec", msg => {
      setRes(msg);
      console.log(msg);
    });
  });

  function handleNameChange(name) {
    setUserName(name);
    socket.emit("join", name);
  }

  return userName !== "" ? (
    <div className="App">
      <Editor socket={socket} userName={userName} />
      {console.log(userName)}
      <textarea placeholder="Output goes here" value={res} disabled></textarea>

      <Users socket={socket} userName={userName} />
    </div>
  ) : (
    <div className="App">
      <Login handler={handleNameChange} />
    </div>
  );
}

export default App;
