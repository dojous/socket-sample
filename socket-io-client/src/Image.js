import React, { Component ,lazy} from "react";
import wobble from "react-animations/lib/wobble";
import slideInUp from "react-animations/lib/slideInUp";
import styled, { keyframes } from "styled-components";







class Image extends Component {
  componentDidMount() {
    console.log("image did mount");
   
    
  }

  render() {
let animation;
console.log('TEST',this.props.animation)

if(this.props.animation==='wobble') {
    var Wobble = styled.div`
    animation: 2s ${keyframes`${wobble}`};
  `;
}else{
    var  Wobble = styled.div`
    animation: 2s ${keyframes`${slideInUp}`};
  `;
}
    

    return (
      <Wobble>
        <img
          src={`https://darksky.net/images/weather-icons/${this.props.img}.png`}
          alt="test"
        />
      </Wobble>
    );
  }
}

export default Image;
