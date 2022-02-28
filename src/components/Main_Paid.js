import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3';
class Main extends Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  outcomeswitch(param) {
    switch(param) {
      case 0:
        return 'No';
      case 1:
        return 'Yes';
      case 2:
        return 'Push';
      case 3:
        return 'TBD';
    }
  }

  render () {    
    const web3 = window.web3
    const accounts = web3.eth.getAccounts()
    var i = 0;
    let adminaddress;
    adminaddress = '0x496764D595FBFC752FB73416759406e296b68851'; // revise to actual admin!
    let adminform;

    return (
      <div className="container-fluid mt-5">
        <div className="row" id="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="proposition mr-auto ml-auto">
              <p>&nbsp;</p>
                {adminform}
              <p>&nbsp;</p>
              { this.props.bets.map((bet, key) => {
                if(bet._resolver == true && bet._outcome != 2 ) {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header"
                    height="55">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(bet._betaddress, 30).toString()}`}
                        />
                        <small className="text-muted">{web3.utils.toChecksumAddress(bet._betaddress)}</small>
                    </div>
                    <ul id="betList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p id="pbold">{bet._proposition}</p>
                      </li>
                      <li className="list-group-item">
                        <p id="psub"> Pre-fee pay out: {(bet._yeswagers / 10 ** 18 + bet._nowagers / 10 ** 18).toFixed(4)} </p>
                      </li>
                    <li className="list-group-item">
                    Winning "Yes" votes!
                    {this.props.tests.map((test,key) => {
                        if(test._betindex.toNumber() == bet._id.toNumber()
                        && test._isyes == true 
                        && bet._outcome == 1)  {
                        return (
                        <div className="card m-1" height="20" key={key}>
                          <div className= "card-header d-flex align-items-center" id = "subcardyesheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                        <small className="text-muted"><small>Player: {test._player.toString()}</small></small>
                                                 
                          </div>
                          <ul className="list-group list-group-flush"> 
                              <li className="list-group-item">
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Pre-Fee ROI:{" "}
                                    {(((test._playeryesvotes / (bet._yesvotes - (bet._genesisvotes)) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18) / (test._playeryesbalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              </li>
                          </ul>
                        </div>
                        ) 
                      }
                    })
                    }
                    </li>  
                    <li className="list-group-item">
                    Winning "No" votes!
                    {this.props.tests.map((test,key) => {  
                      if(test._betindex.toNumber() == bet._id.toNumber()
                      && test._isno == true && bet._outcome == 0) {
                        return (
                          <div className="card m-1" height="20" key={key}>
                          <div className= "card-header d-flex align-items-center" id = "subcardnoheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted"><small>Player: {test._player.toString()}</small></small>
                          </div>
                          <ul className="list-group list-group-flush"> 
                              <li className="list-group-item">
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Pre-Fee ROI:{" "}
                                    {(((test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18) / (test._playernobalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              </li>
                          </ul>
                        </div>
                          )
                      }
                    })
                    } 
                    </li>
                      <li className="list-group-item">
                        <p>Outcome: {this.outcomeswitch(bet._outcome.toNumber())}</p>
                      </li>
                    </ul>
                  </div>
                )}
              })}           
            </div>
          </main>
        </div>
      </div>
    ); //non-admin
  }
}

export default Main;
