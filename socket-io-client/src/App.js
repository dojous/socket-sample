import React, { Component, Fragment, lazy,Suspense } from "react";
import "./App.css";
import socketClient from "socket.io-client";
import Loader from "react-loader-spinner";
import Pulse from "react-reveal/Pulse";
import ThemeContext, {themeConfig} from './context/ThemeContext'
import "semantic-ui-css/semantic.min.css";

import Modal from './Modal'



 const Image = lazy( () => {
  return new Promise(resolve => setTimeout(resolve, 2000)).then(
    // () =>  Math.floor(Math.random() ) >= 4  ? import("./Image")   : import("./Image")
    (resolve) =>   import("./Image")
  );

});


const topcorner = {
  position: "absolute",
  top: 10,
  right: 30
};

const topleftcorner = {
   position: "absolute",
  top: 40,
  left: 30
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      data: false,
      endpoint: "http://127.0.0.1:4001",
      currentTime: "",
      isChanged: 0,
      theme: 'dark',
      showModal: false
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

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === "dark" ? "light" : "dark"
    });
  };

  onClose=()=>{
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    const { data, isChanged , theme: layout, showModal} = this.state;
    const styles = layout === 'light' ?  {backgroundColor: themeConfig[layout].bodybg,  color: themeConfig[layout].color}:  {  color: themeConfig[layout].color}

    const modal = this.state.showModal ? (
      <Modal>
      <div className="modal">
        <div>
          With a portal, we can render content into a different
          part of the DOM, as if it were any other React child.
        </div>
        This is being rendered inside the #modal-container div.
        <button onClick={this.onClose}>Hide modal</button>
        <div className="massive ui toggle checkbox">
        <input type="checkbox" checked={layout.type === 'light'} onChange={ this.toggleTheme} />
  <label style={{color: themeConfig[layout].color}}>Theme: {layout}</label>
</div>
      </div>
    </Modal>
    ) : null;





    return (

      <ThemeContext.Provider  value={{
        type: this.state.theme,
        config: themeConfig[this.state.theme]
      }}>
          <ThemeContext.Consumer>
        {
          theme => (

      <div className="App">
 
 

        <header style={{ backgroundColor: theme.config.bodybg, color: theme.config.color}} className="App-header">
        {modal}
        <div style={topleftcorner}>
      
<div className="massive ui toggle checkbox">
        <input type="checkbox" checked={theme.type === 'light'} onChange={ this.toggleTheme} />
  <label style={{color: theme.config.color}}>Theme: {layout}</label>
</div>
              </div>



          {data ? (
            <Fragment>
            {modal}

            



            
             <button className={theme.config.btn} onClick={this.onClose}>

       

        
<label style={{color: theme.config.color}}>Click for Modal view</label>
</button>

          <Suspense fallback= {<Loader type="Watch" color="red" height="150" width="150" />}> 
                <Image img={data.icon} animation={theme.config.animation}/>
                </Suspense>
              {/* <img
                src={`https://darksky.net/images/weather-icons/${data.icon}.png`} alt ='test'
              /> */}

              <h1 style={topcorner}>
                Updated time:{" "}
                <div style={{ color: "red" }}>
                  <Pulse spy={isChanged}>{data.currentTime} </Pulse>
                </div>
              </h1>
            
              <div className="ui black mini message" style={styles}>
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
                  <p style={{ color: "red" }}>{data.summary} </p>
                </p>

                {this.setDataToFalse}
              </div>
            
            </Fragment>
          ) : (
            <p>
              <Loader type="Rings" color="#00BFFF" height="100" width="100" />
            </p>
          )}
        </header>
      </div>
       )
      }
    </ThemeContext.Consumer>
      </ThemeContext.Provider>
    );
  }
}

export default App;
