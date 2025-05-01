const { ethers, network } = require("hardhat");
const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";
    const thresholdBN = BigInt(threshold.toLowerCase());

    let winningWallet;
    let i = 0;

    while (true) {
      const wallet = ethers.Wallet.createRandom();
      const addrBN = BigInt(wallet.address.toLowerCase());

      if (addrBN < thresholdBN) {
        winningWallet = wallet;
        console.log("Found winning wallet:", wallet.address);
        break;
      }
      if (++i % 1000 === 0) console.log("Tried", i, "wallets...");
    }

    // Fund the wallet with ETH
    const [funder] = await ethers.getSigners();
    const tx = await funder.sendTransaction({
      to: winningWallet.address,
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    // Connect winning wallet to provider
    const connectedWinningWallet = winningWallet.connect(ethers.provider);

    // Call win()
    const gameWithWinningWallet = game.connect(connectedWinningWallet);
    const winTx = await gameWithWinningWallet.win();
    await winTx.wait();

    assert(await game.isWon(), "You did not win the game");
  });
});
