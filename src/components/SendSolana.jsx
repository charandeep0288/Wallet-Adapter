import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const SendSolana = ({ refetchUserBalance, setRefechUserBalance }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [toAddress, setToAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);

  const sendTokens = async () => {
    if (!wallet?.publicKey) {
      alert("Please connect your Wallet!!");
      return;
    }

    try {
      const SOLAmount = parseFloat(sendAmount);
      const transaction = new Transaction();

      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: SOLAmount * LAMPORTS_PER_SOL,
        })
      );

      const sign = await wallet.sendTransaction(transaction, connection);

      alert("Sent" + sendAmount + " SOL to " + toAddress);
    } catch (e) {
      alert("Transaction Failed !!!");
    }

    setRefechUserBalance(refetchUserBalance ? false : true);
    setSendAmount(0);
    setToAddress("");
  };

  const onChangeToAddress = (e) => {
    setToAddress(e.currentTarget.value);
  };

  const onChangeSendAmount = (e) => {
    setSendAmount(e.currentTarget.value);
  };

  return (
    <div className="m-14 border-t border-blue-500">
      <h1 className="m-8 font-medium">Send Solana to Someone</h1>
      <input
        className="mr-5 p-3 text-xl font-bold rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-blue-800"
        id="to"
        type="text"
        placeholder="To"
        value={toAddress}
        onChange={onChangeToAddress}
      />
      <input
        min="0"
        className=" mr-5 p-3 text-xl font-bold rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-blue-800"
        id="amount"
        type="number"
        placeholder="Amount"
        value={sendAmount}
        onChange={onChangeSendAmount}
      />

      <button
        disabled={!toAddress || !sendAmount || !wallet?.publicKey}
        className={`mb-4 ${
          !toAddress || !sendAmount || !wallet?.publicKey
            ? "cursor-not-allowed bg-[#404144] text-[#999]"
            : "bg-[#512ea5] hover:bg-[#1a1f2e;]"
        }`}
        onClick={sendTokens}
      >
        Send Sol
      </button>
    </div>
  );
};

export default SendSolana;
