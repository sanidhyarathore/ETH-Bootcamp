import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      // Derive Public Key from Private Key
      const derivedPublicKey = toHex(secp.getPublicKey(privateKey));

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: derivedPublicKey, // Send the public key instead of address
        amount: parseInt(sendAmount),
        recipient,
      });

      setBalance(balance);
    } catch (ex) {
      alert(ex.response?.data?.message || "Transaction failed");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Private Key
        <input
          placeholder="Enter your private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        />
      </label>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        />
      </label>

      <label>
        Recipient
        <input
          placeholder="Public Key of recipient"
          value={recipient}
          onChange={setValue(setRecipient)}
        />
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
