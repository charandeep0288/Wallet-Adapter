// components in react, are very similar to creating your own HTML tag
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState, useMemo, useEffect } from "react";
import Dropdown from "./Dropdown";

function Airdrop({ selectedValue, setSelectedValue }) {
  // The useWallet `Hook` `provides` the wallet variable inside the airdrop 'Component', because I wrapped the Airdrop component inside the WalletProvider in the parent element of this component
  const wallet = useWallet(); // will give access to the wallet
  const { connection } = useConnection();
  const [airdropAmount, setAirdropAmount] = useState("");
  const [disableSendSol, setDisableSendSol] = useState(true);
  // const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (wallet?.publicKey) {
      setDisableSendSol(false);
    } else if (!wallet.publicKey) {
      setAirdropAmount("");
      setDisableSendSol(true);
    }
  }, [wallet?.publicKey]);

  // define the function inside the component(Airdrop) body
  const sendAirdropToUser = async () => {
    if (!wallet.publicKey) {
      alert("Please connect your Wallet!!");
      return;
    }

    // const airdropAmount = document.querySelector("airdrop-amount").value;
    try {
      await connection.requestAirdrop(
        wallet.publicKey,
        parseInt(airdropAmount)
      ); // 2nd argument is in lamports amount we want to send to the provided - public key
      alert("Air Droped Successfull !!!");
    } catch (e) {
      alert("Got an Unexpected error!!!");
    }
    setAirdropAmount("");
  };

  const onChangeAirDropAount = (e) => {
    setAirdropAmount(e.currentTarget.value);
  };

  return (
    <div>
      {wallet?.publicKey && (
        <p className="m-5 text-2xl font-bold ">
          Hi, this is your public key{" "}
          <span className="text-green-600">
            {wallet?.publicKey?.toString()}
          </span>
        </p>
      )}
      <div className="m-8">
        <span className="m-6 text-3xl font-bold text-sky-400">Airdrop</span>
        <input
          min="0"
          className="p-3 text-xl font-bold rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-blue-800"
          id="airdrop-amount"
          type="number"
          placeholder="Amount"
          value={airdropAmount}
          onChange={onChangeAirDropAount}
        />
        <span className="m-6 text-3xl font-bold text-sky-400">
          SOL (in lamports) to
        </span>

        <Dropdown
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </div>
      <button
        className={`mb-4 ${
          disableSendSol || !airdropAmount
            ? "cursor-not-allowed bg-[#404144] text-[#999]"
            : "bg-[#512ea5] hover:bg-[#1a1f2e;]"
        }`}
        onClick={sendAirdropToUser}
      >
        AIRDROP SOL
      </button>
    </div>
  );
}

export default Airdrop;
