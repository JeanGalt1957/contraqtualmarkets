import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
class About extends Component {

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
const About = () => (
    <Block>
    <h1>About Contraqtual</h1>
      <p>Contraqtual is yes / no smart contract interface built on the AVAX blockchain network.</p>
      <p>Users can buy votes on either 'yes' or 'no'. When to contract outcome is finalized, the 
        amount of votes owned as a percentage of the total votes on a given side entitles the owner 
        to their proportional share of all wagers on the losing side.</p>
    <p>For example, imagine you own 10 out of 100 votes on the yes side. On the no side, $1,000 total
      has been spent by various other players betting on no (i.e., purchasing no votes). If your 
      prediction is correct you will win $100 (10%, i.e. 10/100, of $1,000) plus whatever money you 
      laid to purchase your votes. If you paid $10 / vote, your account would receive $200 at closing
       of the contract (your $100 wager, plus your share of the winnings)</p>
    <p> Contraqtual contracts are paid out instantly, directly to whatever account you purchased votes
      from. Every single thing you see here, aside from static text like this, is hosted on the AVAX
      blockchain. </p>

    </Block>
)

const Pricing  = () => (
    <Block>
      <h1>Votes, odds, and pricing</h1>
      <h4>Genesis pricing of votes</h4>
      <p>When a contract is first published, the combined price of one yes vote plus one no vote 
        is 0.02 AVAX (~$1.00 USD as of January 2022). This is known as the Genesis Price, and it 
        can only be set at contract creation based on the initial odds. Initial odds of 50/50 
        yes/no create a Genesis Price of 0.01 AVAX for yes and 0.01 AVAX for no means the Genesis 
        Odds were 50/50 yes/no. If the initial odds were 66/33 yes/no, the Genesis Prices would 
        be 0.0133 AVAX for yes and 0.0066 for no.
      <p></p>
      <p id="pbold"> *Your potential winnings = the number of votes you own as a percentage of
      that side's total votes, multipliedby the amount of money wagered on the losing side*</p>

      <p>Every vote you make is recorded and available for you to view - it will tell you exactly
        how much of the winnings you are entitled to, and this will change dynamically as funds 
        flow into the contract until resolution.
      </p>

      </p>
      <h4>Dynamic pricing of votes</h4>
      <p>The price per vote changes dynamically as votes are purchased. Live prices are listed 
        directly on the contract form. Every time votes are purchased, the price is reset to: 
        Price Per Vote = Genesis Price * Odds. 
      </p>
      <h4>Implied odds</h4>
      <p>Odds on a contract are simply the percentage of yes and no votes out of the total votes 
        outstanding on either side. E.g., if there are 120 yes votes and 80 no votes, the implied 
        odds are 60% yes and 40% no</p>
      <p id="pbold"> *Odds have nothing to do with your potential winnings*</p>
      <p > They are simply the calculation of the amount of votes on either side as a percentage
        of all votes cast. They are a representation of the way money and votes have accumulated
        in the contract. As one side accumulates more votes (and therefore money), the other side
        stands to win more if they are correct. Similarly, as one side accumulates more votes, the
        price per vote on the other side decreases, incentivizing new bettors to consider an
        opposing view and 
      </p>


    </Block>
)
const Future  = () => (
  <Block>
    <h1>Future</h1>
  <p>This site will continue to add new contracts, features, and UX. We look forward to an exicting
    marketplace and will happyily make markets for user-suggested contracts. Please reach out with
    questions, comments, bugs, and suggestions to: 
  </p>
  </Block>
)

    return (
    <Wrap>
    <Primary>        
      <About/>
      <Pricing/>
      <Future/>
    </Primary>
    </Wrap>   
    );
  }
}
export default About;
