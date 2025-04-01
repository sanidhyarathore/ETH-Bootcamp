const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c2b5a3431f09c30c065f3e107655021382bf857b82789fd678e97b3a6de1d9853d3cd5fb3ea8096c0c8d02701356bf4589c9612244b6b34537b67296cc620ff1": 100,
  "0428f23f395988d43aaae4f5da049a14c605cd6a309dd727119c7b28a0f91006ce269e053b26f9b19a5be2ffae3acabd9a08e8f60f798410171eb71b24e3be4b7a": 50,
  "043285eb4e3bb91e4e865201a4defdc0f5e0e9e4fc121e10d7d806b01073d10378c04a7e4f9c520edbe061a1176d2fc742df14200672301d9a2f7581f29f54535e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
