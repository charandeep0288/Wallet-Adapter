import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Header = () => {
  const wallet = useWallet();
  return (
    <div>
      <div>
        <h1 className="text-yellow-500 font-bold">🌞💦 Solana Faucet 🌞💦</h1>
        <h2 className="m-4 text-3xl font-bold text-sky-400">
          Have a drink! The premium faucet for Solana Devnet and Testnet.
        </h2>
        <h2 className="m-4 text-xl text-red-500 font-bold">
          This tool does *NOT* give real $SOL or Solana tokens.
        </h2>

        <h2 className="mb-4 text-2xl font-bold text-gray-500">
          {wallet.connected
            ? "Connected to Wallet!!!"
            : "Please connect your Wallet!!!"}
        </h2>
      </div>

      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <WalletMultiButton style={{ marginRight: "40px" }} />
        <WalletDisconnectButton />
      </div>
    </div>
  );
};

export default Header;
