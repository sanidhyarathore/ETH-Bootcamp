async function main() {
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    console.log(`Contract Faucet is deployed at ${faucet.target}`);
}


main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})
//Contract Faucet is deployed at 0x01c42738F4a26363c7911B55FD946bE5f8114eeE on sepolia