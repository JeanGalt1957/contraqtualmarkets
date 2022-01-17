import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
class Verified extends Component {

  render() {
    const Wrap=styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 5em;
`
 
const Primary=styled.div`
    max-width: 650px;
    margin: 0 auto;
    font-family: 'Sen', sans-serif;
`

const Block = styled.div`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid darkgray;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-bottom: 3vh;
  margin-top: 1vh;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: darkgray;
    color: white;
  }
`;
const Verified = () => (
    <Block>
    <h1>Master contract</h1>
      <p>Our contract is verified on Snowtrace!</p>
      <p><a href="https://snowtrace.io/address/0xB068Bd570247Bd1FFBabbD566C4EC44345245Ad9">view on snowtrace</a></p>
    </Block>
)



    return (
    <Wrap>
    <Primary>        
      <Verified/>
    </Primary>
    </Wrap>   
    );
  }
}
export default Verified;
