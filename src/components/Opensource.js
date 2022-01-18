import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
class Opensource extends Component {

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
const Opensource = () => (
    <Block>
    <h1>Every line of code is open sourced and available for your viewing!</h1>
      <p>Our entire front and backend is published and available for viewing and commentary: </p>
      <p><a href="https://github.com/JeanGalt1957/contraqtualmarkets">check us out on <strong>github</strong>!</a></p>
      <p>We are open to suggestions on every aspect of the site and look forward to hearing from you.
          As noted on our <a href="/verified">verified contract</a> page, you can view the published
          contract on snowtrace, or as source code direct from github.
      </p>
      <p>We're also reachable at <strong>admin@contraqtual.com</strong> for any questions!</p>
    </Block>
)



    return (
    <Wrap>
    <Primary>        
      <Opensource/>
    </Primary>
    </Wrap>   
    );
  }
}
export default Opensource;
