import { useState, useEffect, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const UserBalance = ({ selectedEndpoints }) => {
  const [walletBalance, setWalletBalance] = useState("");
  const { connection } = useConnection();
  const wallet = useWallet();

  const fetchBalance = useCallback(async () => {
    if (wallet?.publicKey) {
      const balance = await connection.getBalance(wallet?.publicKey);
      setWalletBalance(balance / LAMPORTS_PER_SOL);
    }
  }, [wallet?.publicKey, selectedEndpoints]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance, wallet?.publicKey, selectedEndpoints]);

  return (
    <>
      {wallet?.publicKey && (
        <div>
          <h1 className="m-4 font-bold">SOL Balance:</h1>
          <div id="balance" className="text-2xl">{walletBalance}</div>
        </div>
      )}
    </>
  );
};

export default UserBalance;
