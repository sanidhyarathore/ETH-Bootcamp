const { expect, assert } = require("chai");

describe("TestModifyVariable", function () {
  it("should change x to 1337", async function () {
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");
    const contract = await ModifyVariable.deploy(10);
    await contract.modifyToLeet();
    const newX = await contract.x();
    assert.equal(newX.toString(), "1337");
  });
});