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
    adminaddress = '0x12984A0D426F61318c24b180CA37F902410BBB34'; // revise to actual admin!
    let adminform;
    if(this.props.account == adminaddress) {
        adminform =  <form onSubmit={(event) => {
          event.preventDefault()
          const proposition = this.betproposition.value
          const odds = this.betodds.value
          const gasfees = this.gasfees.value
          const adminfees = this.adminfees.value
          const genesiscostY = this.genesiscostX.value * 10**18
          const genesiscost = genesiscostY.toString()
          this.props.createyesnobet(proposition, odds, gasfees, adminfees, genesiscost)
        }}>
        <div className="form-group mr-sm-2">
          <input
            id="betproposition"
            type="text"
            ref={(input) => { this.betproposition = input }}
            className="form-control"
            placeholder="Yes / no proposition..."
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="betodds"
            type="text"
            ref={(input) => { this.betodds = input }}
            className="form-control"
            placeholder= "Odds..."
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="gasfees"
            type="text"
            ref={(input) => { this.gasfees = input }}
            className="form-control"
            placeholder="Gas fees..."
            defaultValue={250}
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="adminfees"
            type="text"
            ref={(input) => { this.adminfees = input }}
            className="form-control"
            placeholder="Admin fees..."
            defaultValue={250}
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="genesiscost"
            type="text"
            ref={(input) => { this.genesiscostX = input }}
            className="form-control"
            placeholder={0.02}
            required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Create</button>
      </form>;
    }

    let resolvebutton;
    if(this.props.account == adminaddress) {
      resolvebutton =
      <button
      type="submit" 
      id="resolver" 
      className="btn btn-primary"
      > Resolve
    </button>
    }
  
  if(this.props.account == adminaddress) {
  
  return (
      <div className="container-fluid mt-5">
        <div className="row" id="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="proposition mr-auto ml-auto">
              <p>&nbsp;</p>
                {adminform}
              <p>&nbsp;</p>
              { this.props.bets.map((bet, key) => {
                let thisbalance
                let yesshare
                let noshare
                thisbalance = this.props.stats[bet._id]._betbalance / 10**18
                yesshare = (bet._yesvotes - bet._genesisvotes) / ((bet._yesvotes - bet._genesisvotes) + (bet._novotes - (100 - bet._genesisvotes)))
                noshare = (bet._novotes - (100 - bet._genesisvotes)) / ((bet._yesvotes - bet._genesisvotes) + (bet._novotes - (100 - bet._genesisvotes)))
                if(bet._resolver == false) {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
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
                        <p id="psub"> Balance on Yes: {(bet._yeswagers / 10 ** 18).toFixed(4)} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._yesodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Balance on No: {(bet._nowagers / 10 ** 18).toString()} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._noodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Implied odds on Yes: {(this.props.stats[bet._id]._yesodds / 100).toFixed(2) + "%"} </p>
                        <p id="psub"> Implied odds on No: {(this.props.stats[bet._id]._noodds / 100).toFixed(2) + "%"} </p>                        
                      </li>
                      {this.props.tests.map((test,key) => {
                        if(test._betindex.toNumber() == bet._id.toNumber()
                        && test._isyes == true)  {
                        return (
                        <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardyesheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playeryesvotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playeryesbalance / test._playeryesvotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Potential ROI:{" "}
                                    {(((test._playeryesvotes / (bet._yesvotes - (bet._genesisvotes)) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18) / (test._playeryesbalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Time:{" "}
                                    {test._time.toString()}
                                  </small>
                              </p>
                               {/* Revert buttons */}
                              <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                                event.preventDefault()
                                const betID = bet._id
                                const player = test._specificindex
                                this.props.revertyes(betID, player)
                                }}>
                                <button
                                type="submit" 
                                id="yesreverter" 
                                className="btn btn-primary"
                                > Revert </button>
                              </form>
                              </li>
                          </ul>
                        </div>
                        ) 
                      }
                    })
                    }
                    {this.props.tests.map((test,key) => {  
                      if(test._betindex.toNumber() == bet._id.toNumber()
                      && test._isno == true) {
                        return (
                          <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardnoheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playernovotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playernobalance / test._playernovotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential ROI:{" "}
                                    {(((test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18) / (test._playernobalance / 10**18) - 1) * 100 ).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Time:{" "}
                                    {test._time.toString()}
                                  </small>
                              </p>
                              {/* Revert buttons */}
                              <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                                event.preventDefault()
                                const betID = bet._id
                                const player = test._specificindex
                                this.props.revertno(betID, player)
                                }}>
                                <button
                                type="submit" 
                                id="noreverter" 
                                className="btn btn-primary"
                                > Revert </button>
                              </form>
                              </li>
                          </ul>
                        </div>
                          )
                      }
                    })
                    }
                      <li key={key} className="list-group-item" id="betinputform">
                        <form className="form-inline float-right text-muted" id="betinputform" onSubmit={(event) => {
                          event.preventDefault()
                          const betyesAmountY = bet.betyesAmountX.value * 10**18
                          const betyesAmount = betyesAmountY
                          const betIndex = bet._id
                          this.props.betyes(betIndex, betyesAmount)
                        }}>
                        <div id="betinputs">
                          Yes Votes: {(bet._yesvotes - bet._genesisvotes).toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betyesAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                            type="submit" 
                            id="submit" 
                            className="btn btn-primary"
                        > Bet yes </button>
                        </form>
                        <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betnoAmountY = bet.betnoAmountX.value * 10**18
                          const betnoAmount = betnoAmountY
                          const betIndex = bet._id
                          this.props.betno(betIndex, betnoAmount)
                        }}>
                        <div id="betinputs">
                          No Votes: {(bet._novotes - (100 - bet._genesisvotes)).toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betnoAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                              type="submit" 
                              id="submit" 
                              className="btn btn-primary"
                          > Bet no</button>
                        </form>
                      </li>
                      <li key={key} className="list-group-item" id="betinputform">
                      <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betoutcome = bet.outcome.value
                          const betIndex = bet._id
                          this.props.setoracle(betIndex, betoutcome)
                        }}>
                        <div id="betinputs">
                          Outcome: {this.outcomeswitch(bet._outcome.toNumber())}
                        </div>
                        <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="number"
                              ref={(input) => { bet.outcome = input }}
                              className="form-control"
                              placeholder="Outcome..."
                              required />
                        </div>
                        <button 
                              type="submit" 
                              id="submit" 
                              className="btn btn-primary"
                          > Oracle </button>
                        </form>
                        <div>
                        <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betoutcome = bet.outcome.value
                          const betIndex = bet._id
                          this.props.resolve(betIndex)
                        }}>
                          {resolvebutton}
                        </form>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              })}
              
            </div>
          </main>
        </div>
      </div>
    ); //admin
  }
  else {
    return (
      <div className="container-fluid mt-5">
        <div className="row" id="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="proposition mr-auto ml-auto">
              <p>&nbsp;</p>
                {adminform}
              <p>&nbsp;</p>
              { this.props.bets.map((bet, key) => {
                if(bet._resolver == false) {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
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
                        <p id="psub"> Balance on Yes: {(bet._yeswagers / 10 ** 18).toFixed(4)} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._yesodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Balance on No: {(bet._nowagers / 10 ** 18).toString()} </p>
                        <p id="psub"> Cost per: {((this.props.stats[bet._id]._genesiscost / 10**18) * this.props.stats[bet._id]._noodds / 10000).toFixed(4)} </p>
                        <p id="psub"> Implied odds on Yes: {(this.props.stats[bet._id]._yesodds / 100).toFixed(2) + "%"} </p>
                        <p id="psub"> Implied odds on No: {(this.props.stats[bet._id]._noodds / 100).toFixed(2) + "%"} </p>                        
                      </li>
                      
                      {this.props.tests.map((test,key) => {
                        if(test._player == this.props.account && test._betindex.toNumber() == bet._id.toNumber()
                        && test._isyes == true)  {
                        i++
                        return (
                        <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardyesheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          <small className="text-muted"> <strong> &nbsp; &nbsp; (you own this bet!) </strong></small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              Your yes votes on this contract:
                              <p id="psub">
                                  <small>Votes purchased: {test._playeryesvotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playeryesbalance / test._playeryesvotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Potential ROI:{" "}
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
                    {this.props.tests.map((test,key) => {  
                      if(test._player == this.props.account && test._betindex.toNumber() == bet._id.toNumber()
                      && test._isno == true) {
                        return (
                          <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardnoheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          <small className="text-muted"> <strong> &nbsp; &nbsp; (you own this bet!) </strong></small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playernovotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playernobalance / test._playernovotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential ROI:{" "}
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
                    {/* feed of recent votes */}
                    <li className="list-group-item">
                    Two most recent yes votes:
                    {this.props.tests.map((test,key) => {
                        if(test._betindex.toNumber() == bet._id.toNumber()
                        && test._isyes == true 
                        && test._specificindex.toNumber() >= bet._yesplayers.toNumber() - 2 )  {
                        return (
                        <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardyesheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playeryesvotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playeryesbalance / test._playeryesvotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playeryesvotes / (bet._yesvotes - bet._genesisvotes) * (bet._nowagers / 10 ** 18)
                                    + test._playeryesbalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small> Potential ROI:{" "}
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
                    Two most recent no votes  
                    {this.props.tests.map((test,key) => {  
                      if(test._betindex.toNumber() == bet._id.toNumber()
                      && test._isno == true && test._specificindex.toNumber() >= bet._noplayers.toNumber() - 2) {
                        return (
                          <div class="card m-1" height="20" >
                          <div className= "card-header d-flex align-items-center" id = "subcardnoheader">
                          <img
                            className='mr-1'
                            width='15'
                            height='15'
                            src={`data:image/png;base64,${new Identicon(test._player, 30).toString()}`}
                          />
                          <small className="text-muted">wager ID: {test._specificindex.toString()}</small>
                          </div>
                          <ul class="list-group list-group-flush"> 
                              <li class="list-group-item">
                              <p id="psub">
                                  <small>Votes purchased: {test._playernovotes.toString()}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Wagered: {(test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Price per vote: {(test._playernobalance / test._playernovotes / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Share of winnings:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * 100).toFixed(2) + "%"}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential return:{" "}
                                    {(test._playernovotes / (bet._novotes - (100 - bet._genesisvotes)) * (bet._yeswagers / 10 ** 18)
                                    + test._playernobalance / 10**18).toFixed(4)}
                                  </small>
                              </p>
                              <p id="psub">
                                  <small>Potential ROI:{" "}
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
                      <li key={key} className="list-group-item" id="betinputform">
                        <form className="form-inline float-right text-muted" id="betinputform" onSubmit={(event) => {
                          event.preventDefault()
                          const betyesAmountY = bet.betyesAmountX.value * 10**18
                          const betyesAmount = betyesAmountY
                          const betIndex = bet._id
                          this.props.betyes(betIndex, betyesAmount)
                        }}>
                        <div id="betinputs">
                          Yes Votes: {(bet._yesvotes).toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betyesAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                            type="submit" 
                            id="submit" 
                            className="btn btn-primary"
                        > Bet yes </button>
                        </form>
                        <form className="form-inline float-right mt-0 text-muted" onSubmit={(event) => {
                          event.preventDefault()
                          const betnoAmountY = bet.betnoAmountX.value * 10**18
                          const betnoAmount = betnoAmountY
                          const betIndex = bet._id
                          this.props.betno(betIndex, betnoAmount)
                        }}>
                        <div id="betinputs">
                          No Votes: {bet._novotes.toString()}
                        </div>
                          <div className="form-group mr-sm-2">
                            <input
                              id="betinputs"
                              type="text"
                              ref={(input) => { bet.betnoAmountX = input }}
                              className="form-control"
                              placeholder="amt..."
                              required />
                          </div>
                        <button 
                              type="submit" 
                              id="submit" 
                              className="btn btn-primary"
                          > Bet no</button>
                        </form>
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
}

export default Main;
