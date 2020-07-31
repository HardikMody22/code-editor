import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const languageOptions = [
  {
    key: "c",
    text: "C",
    value: "c"
  },
  {
    key: "cpp",
    text: "C++",
    value: "cpp"
  },
  {
    key: "js",
    text: "JavaScript",
    value: "js"
  },
  {
    key: "py",
    text: "Python",
    value: "py"
  }
];

function DropdownExampleSelection(props) {
  const [lang, setLang] = useState("cpp");
  useEffect(() => {
    if (props.socket != null) {
      props.socket.on("change-lang", lang => {
        console.log("changed to " + lang);
        setLang(lang);
      });
    }
  });

  function handleLanguageChange(event, data) {
    setLang(data.value);
    console.log("Changed to " + data.value);
    if (props.socket != null) props.socket.emit("change-lang", data.value);
  }

  return (
    <Dropdown
      value={lang}
      fluid
      selection
      options={languageOptions}
      onChange={handleLanguageChange}
    />
  );
}

export default DropdownExampleSelection;
