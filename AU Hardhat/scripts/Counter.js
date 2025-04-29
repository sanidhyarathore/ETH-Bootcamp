async function main() {
  const Counter = await hre.ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();

  //await counter.deployed();
  console.log(`Counter deployed to ${counter.target}`)
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
