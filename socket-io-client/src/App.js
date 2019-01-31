import React, { Component, Fragment } from "react";
import "./App.css";
import socketClient from "socket.io-client";
import Loader from "react-loader-spinner";
import Pulse from "react-reveal/Pulse";
import Fade from "react-reveal/Fade";
import "semantic-ui-css/semantic.min.css";

const topcorner = {
  position: "absolute",
  top: 10,
  right: 30
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: false,
      endpoint: "http://127.0.0.1:4001",
      currentTime: "",
      isChanged: 0
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketClient(endpoint);
    socket.on("FromAPI", data => this.setState({ data }));
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.isChanged === this.state.isChanged) {
      this.setState({ isChanged: this.state.isChanged + 1 });
    }
  }

  convertTemp = temp => {
    let x = ((temp - 32) * 5) / 9;

    return Math.round(x);
  };

  onChangeHandle = () => {
    console.log("isChanged ", this.state.isChanged);

    this.setState({
      isChanged: prevState => ({
        isChanged: prevState.isChanged + 1
      })
    });
  };

  render() {
    const { data, isChanged } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {data ? (
            <Fragment>
              <Fade>
              <img
                src={`https://darksky.net/images/weather-icons/${data.icon}.png`} alt ='test'
              />

              <h1 style={topcorner}>
                Updated time:{" "}
                <div style={{ color: "red" }}>
                  <Pulse spy={isChanged}>{data.currentTime} </Pulse>
                </div>
              </h1>
              <div className="ui black mini message">
                <p>
                  {" "}
                  The temperature in Kraków is:{" "}
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {data.temperature} °F{" "}
                  </div>{" "}
                </p>
                <p>
                  {" "}
                  The temperature in Kraków is:{" "}
                  <div style={{ color: "red" }}>
                    {this.convertTemp(data.temperature)} °C{" "}
                  </div>
                </p>
                <p>
                  The summary is:{" "}
                  <div style={{ color: "red" }}>{data.summary} </div>
                </p>

                {this.setDataToFalse}
              </div>
              </Fade>
            </Fragment>
          ) : (
            <p>
              <Loader type="Puff" color="#00BFFF" height="100" width="100" />
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default App;
