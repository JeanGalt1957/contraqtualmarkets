
const ConsoleLog = artifacts.require("./Console.sol");
const CreateBet = artifacts.require("./CreateBet.sol");

contract('CreateBet', (accounts) => {
    var adminAddress = accounts[0];
    var UNUSED = accounts[1];
    var yesBettorA = accounts[2];
    var yesBettorB = accounts[3];
    var yesBettorC = accounts[4];
    var noBettorA = accounts[5];
    var noBettorB = accounts[6];
    var malicious = accounts[7];
    /* create named accounts for contract roles */
    
    it("...should be able to create a bet", async function () {
        const Bet = await CreateBet.deployed();
        const input_prop = "Will NYC lock down";
        const input_odds = 50;
        
        const Create = await Bet.createyesnobet(input_prop, input_odds, {from: adminAddress});
        // bets placed
        const YesA = await Bet.betyes(0, { from: yesBettorA, value: web3.utils.toWei('1', 'ether')});
        const NoA = await Bet.betno(0, { from: noBettorA, value: web3.utils.toWei('1', 'ether')});
        const YesB = await Bet.betyes(0, { from: yesBettorB, value: web3.utils.toWei('1', 'ether')});
        const YesC = await Bet.betyes(0, { from: yesBettorC, value: web3.utils.toWei('1', 'ether')});
        const NoB = await Bet.betno(0, { from: noBettorB, value: web3.utils.toWei('50', 'ether')});
        const SetOracle = await Bet.setoracle(0, 2, { from: adminAddress });
        const RevertYes = await Bet.revertyes(0, 2, { from: adminAddress });
        const RevertNo = await Bet.revertno(0, 1, { from: adminAddress });
        const YesAPre = await web3.eth.getBalance(yesBettorA)
        const YesBPre = await web3.eth.getBalance(yesBettorB)
        const YesCPre = await web3.eth.getBalance(yesBettorC)
        const NoAPre = await web3.eth.getBalance(noBettorA)
        const NoBPre = await web3.eth.getBalance(noBettorB)
        const ContractBalance = await Bet.contractbalance.call(0)
        const adminPre = await web3.eth.getBalance(adminAddress)
        const Pay = await Bet.resolve(0, { from: adminAddress });
        const adminPost = await web3.eth.getBalance(adminAddress)
        const YesAPost = await web3.eth.getBalance(yesBettorA)
        const YesBPost = await web3.eth.getBalance(yesBettorB)
        const YesCPost = await web3.eth.getBalance(yesBettorC)
        const NoAPost = await web3.eth.getBalance(noBettorA)
        const NoBPost = await web3.eth.getBalance(noBettorB)
        const Paidtoadmin = adminPost - adminPre
        const PaidtoYesA = YesAPost - YesAPre
        const PaidtoYesB = YesBPost - YesBPre
        const PaidtoYesC = YesCPost - YesCPre
        const PaidtoNoA = NoAPost - NoAPre
        const PaidtoNoB = NoBPost - NoBPre
        const YesAShare = PaidtoYesA / (ContractBalance - Paidtoadmin)
        const YesBShare = PaidtoYesB / (ContractBalance - Paidtoadmin)
        const YesCShare = PaidtoYesC / (ContractBalance - Paidtoadmin)
        const NoAShare = PaidtoNoA / (ContractBalance - Paidtoadmin)
        const NoBShare = PaidtoNoB / (ContractBalance - Paidtoadmin)
            
        console.log("admin fees", Paidtoadmin)
        console.log("Yes A paid", PaidtoYesA)
        console.log("Yes A net share", YesAShare)
        console.log("Yes B paid", PaidtoYesB)
        console.log("Yes B net share", YesBShare)
        console.log("Yes C paid", PaidtoYesC)
        console.log("Yes C net share", YesCShare)
        console.log("No A paid", PaidtoNoA)
        console.log("No A net share", NoAShare)
        console.log("No B paid", PaidtoNoB)
        console.log("No B net share", NoBShare)
    }) 
})