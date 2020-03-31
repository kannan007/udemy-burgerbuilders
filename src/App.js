import React from "react";
import "./App.css";
import Validation from "./Components/Validation";
import Char from "./Components/Char";

class App extends React.Component {
  state = {
    textValue: ""
  };

  onChange = event => {
    this.setState({ textValue: event.target.value });
  };

  removeChar = (event, index) => {
    let currentText = this.state.textValue;
    currentText = currentText.split("");
    currentText.splice(index, 1);
    currentText = currentText.join("");
    this.setState({ textValue: currentText });
  };

  render() {
    const chars =
      this.state.textValue && this.state.textValue.length
        ? this.state.textValue.split("")
        : null;
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.textValue}
          onChange={this.onChange}
        ></input>
        <Validation textValue={this.state.textValue}></Validation>
        {chars
          ? chars.map((char, index) => (
              <Char
                key={index}
                char={char}
                index={index}
                changed={this.removeChar}
              ></Char>
            ))
          : null}
      </div>
    );
  }
}

export default App;
