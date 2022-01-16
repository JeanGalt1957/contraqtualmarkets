const CreateBet = artifacts.require("CreateBet");

module.exports = function(deployer) {
  deployer.deploy(CreateBet);
};
