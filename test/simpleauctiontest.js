const SimpleAuction = artifacts.require("SimpleAuction");
const { time } = require("@openzeppelin/test-helpers");

contract("SimpleAuction", (accounts) => {
  it("simple auction", async () => {
    const SimpleAuctionInstance = await SimpleAuction.deployed();
    try {
      await SimpleAuctionInstance.bid({
        from: accounts[2],
        value: web3.utils.toWei("1", "ether"),
      });
    } catch (error) {
      assert.equal(
        error.message,
        "AuctionAlreadyEnded",
        "Expected AuctionAlreadyEnded error"
      );
    }
    try {
      await SimpleAuctionInstance.bid({
        from: accounts[3],
        value: web3.utils.toWei("2", "ether"),
      });
    } catch (error) {
      assert.equal(
        error.message,
        "AuctionAlreadyEnded",
        "Expected AuctionAlreadyEnded error"
      );
    }
    try {
      await SimpleAuctionInstance.bid({
        from: accounts[4],
        value: web3.utils.toWei("3", "ether"),
      });
    } catch (error) {
      assert.equal(
        error.message,
        "AuctionAlreadyEnded",
        "Expected AuctionAlreadyEnded error"
      );
    }

    const highestBidder = await SimpleAuctionInstance.highestBidder();
    assert.equal(
      highestBidder,
      accounts[4],
      "Highest bidder should be accounts[3]"
    );

    // Assert that the highest bid is 40
    const highestBid = await SimpleAuctionInstance.highestBid();
    assert.equal(
      highestBid,
      web3.utils.toWei("3", "ether"),
      "Highest bid should be 3"
    );

    await time.increase(time.duration.seconds(20));
    const BidEnd = await SimpleAuctionInstance.auctionEnd();
    console.log(BidEnd.logs[0]);
  });

  it("eth withdraw", async () => {
    // const SimpleAuctionInstance = await SimpleAuction.deployed();
    const SimpleAuctionInstance = await SimpleAuction.deployed();
    // await SimpleAuctionInstance.withdraw({from: accounts[0]});
    
    const withdrawStatus0 = await SimpleAuctionInstance.withdraw({
      from: accounts[0],
    });
    if (withdrawStatus0) {
      console.log("withdrow success from account0");
    } else console.log("withdrow failed from account0");
    
    const withdrawStatus1 = await SimpleAuctionInstance.withdraw({
      from: accounts[1],
    });
    if (withdrawStatus1) {
      console.log("withdrow success from account1");
    } else console.log("withdrow failed from account1");
    
    const withdrawStatus2 = await SimpleAuctionInstance.withdraw({
      from: accounts[2],
    });
    if (withdrawStatus2) {
      console.log("withdrow success from account2");
    } else console.log("withdrow failed from account2");
    
    const withdrawStatus3 = await SimpleAuctionInstance.withdraw({
      from: accounts[3],
    });
    if (withdrawStatus3) {
      console.log("withdrow success from account3");
    } else console.log("withdrow failed from account3");
    
    const withdrawStatus4 = await SimpleAuctionInstance.withdraw({
      from: accounts[4],
    });
    if (withdrawStatus4) {
      console.log("withdrow success from account4");
    } else console.log("withdrow failed from account4");
  });
});
