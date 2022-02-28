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
      <p>Contraqtual is a yes / no betting interface built on smart contracts. We run on the Avalanche network, and bets are paid in AVAX</p>
      <p>You can buy votes on either 'Yes' or 'No' for each market. When a contract outcome is finalized, winners take all, and
        the share of votes you own on the winning side entitles you to that same share of all the cash on the losing side.</p>
    <p>For example, imagine you own 10 out of 100 votes on the yes side. On the no side, $1,000 total
      has been bet by others voting on no. If your 
      prediction is correct you will win $100 (10%, i.e. 10/100 votes, of $1,000) plus whatever money you 
      laid to purchase your votes. If you paid $10 / vote, your account would receive $200 at closing
       of the contract (your $100 wager, plus your share of the winnings)</p>
    <p> Contraqtual contracts are paid out instantly, directly to whatever account you purchased votes
      from. Every single thing you see here, aside from static text like this, is hosted on the AVAX
      blockchain. Check the 'Paid out' page for some recently resolved contracts </p>
    <p id="pbold"><u>IMPORTANT:</u></p>
    <p id="pbold">1) All contract <u>outcomes are determined by the administrator</u>. We do not currently use chainlink 
    or other oracle services.</p>
    <p id="pbold">2) A <u>fee of 5.0%</u> is charged on winning distrbutions</p>
    <p ><strong>3) Do not place bets after an outcome has occured in real life or your bet will be
    reverted. The <u>adminstrator reserves the right to revert and refund malicious bets </u></strong> Check out the 'revertyes' and
     'revertno' functions on our <a href="https://snowtrace.io/address/0xB068Bd570247Bd1FFBabbD566C4EC44345245Ad9">
       <strong>verified smart contract</strong></a>. These prevent malicious bettors from "flooding" the 
       contract to take a bigger ownership of the losing side when an outcome is already known.</p>

    </Block>
)

const Pricing  = () => (
    <Block>
      <h1>Votes, odds, and pricing</h1>
      <h4><u>Genesis pricing of votes</u></h4>
      <p>When a contract is first published, the combined price of one yes vote plus one no vote 
        is 0.02 AVAX (~$1.00 USD as of January 2022). This is known as the Genesis Price, and it 
        can only be set at contract creation based on the initial odds. Initial odds of 50/50 
        yes/no create a Genesis Price of 0.01 AVAX for yes and 0.01 AVAX for, and means the Genesis 
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
      <h4><u>Dynamic pricing of votes</u></h4>
      <p>The price per vote changes dynamically as votes are purchased. Live prices are listed 
        directly on the contract form. Every time votes are purchased, the price is reset to: 
        Price Per Vote = Genesis Price * Odds. 
      </p>
      <h4><u>Implied odds</u></h4>
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
    marketplace and will happily make markets for user-suggested contracts. Please reach out with
    questions, comments, bugs, and suggestions to: <strong>admin@contraqtual.com</strong>!
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
