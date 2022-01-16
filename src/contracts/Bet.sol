pragma solidity ^0.6.0;

import "./CreateBet.sol"; 

contract yesnobet is Ownable {

    //yesnobet bet = new yesnobet(this, _createproposition, _genesisweight, _genesisodds);

    string public proposition;
    uint256 public genesisweight;
    uint256 public genesisodds;
    uint256 public genesiscost; //241*(10**14);
    uint256 public gasfee;
    uint256 public adminfee;
    address public betaddress;
    address public admin;

    CreateBet parentInstance;

    constructor(CreateBet _parentInstance, string memory _proposition, uint256 _genesisodds, uint256 _gasfee, uint256 _adminfee, uint256 _genesiscost) public payable {
        proposition = _proposition;
        genesisodds = _genesisodds;
        gasfee = _gasfee;
        adminfee = _adminfee;
        genesiscost = _genesiscost;
        betaddress = address(this);
        parentInstance = CreateBet(address(_parentInstance));
    }

    function payout(address payable _to, uint256 _amount) public onlyOwner {
        require(parentInstance.validatemaster() == tx.origin, "only the admin can resolve contracts");
        _to.transfer(_amount);
    }

    fallback () external payable {
        
    }

}