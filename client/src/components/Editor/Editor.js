import React, { useState, useEffect } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./Editor.css";
import "../Whiteboard/Whiteboard";
import "../LanguageSelect/LanguageSelect";
import DropdownExampleSelection from "../LanguageSelect/LanguageSelect";
import Whiteboard from "../Whiteboard/Whiteboard";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/mode/clike/clike.js");
require("codemirror/mode/javascript/javascript.js");

function Editor(props) {
  const [clientCode, setClientCode] = useState("");
  const [serverCode, setServerCode] = useState("");
  const [line, setLine] = useState(1);
  const socket = props.socket;
  const [ch, setCh] = useState(0);
  const [displayWhiteboard, setDisplayWhiteboard] = useState(false);

  function compile() {
    socket.emit("compile");
  }

  function toggleWhiteboard() {
    setDisplayWhiteboard(!displayWhiteboard);
    console.log("Changed to " + displayWhiteboard);
  }

  useEffect(() => {
    if (socket != null) {
      socket.on("receive-msg", data => {
        setServerCode(data);
        setClientCode(data);
      });
    }
  });

  let title = "< MergeCode />";

  return (
    <div className="Editor">
      <nav>
        <h3>{title}</h3>
        <button
          onClick={toggleWhiteboard}
          className="btn btn-default btn-info compile"
        >
          Whiteboard
        </button>
        <DropdownExampleSelection className="dropdown" socket={socket} />
        <button
          onClick={compile}
          className="btn btn-default btn-danger compile"
        >
          Compile
        </button>
      </nav>
      {displayWhiteboard ? <Whiteboard /> : <span></span>}
      <CodeMirror
        value={clientCode}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true
        }}
        onChange={(editor, data, value) => {
          setLine(editor.getCursor().line);
          setCh(editor.getCursor().ch);
          if (value === "") {
            setClientCode("");
            socket.emit("change-code", "");
          } else {
            setClientCode(value);
            if (serverCode !== clientCode) {
              socket.emit("change-code", clientCode);
            }
          }
          editor.setCursor({ line: line, ch: ch });
        }}
      />
    </div>
  );
}

export default Editor;
