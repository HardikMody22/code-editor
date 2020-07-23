import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Users from "./components/Users";
import socketIOClient from "socket.io-client";
import "./App.css";

const ENDPOINT = "localhost:9000";
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

  return (
    <div className="App">
      <Editor socket={socket} />
      <textarea
        placeholder="Output goes here"
        value={res}
        resiza
        disabled
      ></textarea>
      <Users socket={socket} />
    </div>
  );
}

export default App;
