const ConvertLib = artifacts.require("ConvertLib");
const SimpleAuction = artifacts.require("SimpleAuction");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, SimpleAuction);
  deployer.deploy(SimpleAuction, 10, '0xa6207Ee61d2089EB9459FF1cc76c412b69fad216', {gas:6721975});
};

