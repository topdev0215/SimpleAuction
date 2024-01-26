const ConvertLib = artifacts.require("ConvertLib");
const SimpleAuction = artifacts.require("SimpleAuction");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SimpleAuction);
  deployer.deploy(SimpleAuction);
};
