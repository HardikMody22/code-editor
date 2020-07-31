import React from "react";
import DrawableCanvas from "react-drawable-canvas";

export default class Whiteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: "#0a0a0a",
      lineWidth: 2,
      canvasStyle: {
        backgroundColor: "#ffffff"
      },
      clear: false
    };

    this.handleOnClickChangeColorRed = this.handleOnClickChangeColorRed.bind(
      this
    );
    this.handleOnClickChangeColorYellow = this.handleOnClickChangeColorYellow.bind(
      this
    );

    this.handleOnClickChangeColorBlack = this.handleOnClickChangeColorBlack.bind(
      this
    );

    this.handleOnClickClear = this.handleOnClickClear.bind(this);
  }

  handleOnClickClear() {
    this.setState({
      clear: true
    });
  }

  handleOnClickChangeColorYellow() {
    this.setState({
      brushColor: "#ffff00",
      clear: false
    });
  }

  handleOnClickChangeColorRed() {
    this.setState({
      brushColor: "#800909",
      clear: false
    });
  }

  handleOnClickChangeColorBlack() {
    this.setState({
      brushColor: "#0a0a0a",
      clear: false
    });
  }

  render() {
    return (
      <div className="whiteboard" style={{ height: "500px" }}>
        <button onClick={this.handleOnClickClear}>Clear all</button>
        <button onClick={this.handleOnClickChangeColorYellow}>
          Set color to Yellow
        </button>
        <button onClick={this.handleOnClickChangeColorRed}>
          Set color to Red
        </button>
        <button onClick={(this, this.handleOnClickChangeColorBlack)}>
          Set color to Black
        </button>
        <DrawableCanvas {...this.state} />
      </div>
    );
  }
}
