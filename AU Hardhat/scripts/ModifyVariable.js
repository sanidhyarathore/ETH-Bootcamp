async function main() {
    const ModifyVariable = await hrt.getContractFactory("ModifyVariable");
    const modifyvariable = await ModifyVariable.deploy();
    console.log(`Contract is deployed at ${modifyvariable.target}`)
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})