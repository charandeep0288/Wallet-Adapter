// https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md
import React, { FC, useMemo, useState } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletModalContext,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import Airdrop from "./components/Airdrop";
import Header from "./components/Header";
import UserBalance from "./components/UserBalance";
import Loader from "./components/Loader";
import SignMessage from "./components/SignMessage";
import SendSonala from './components/SendSolana';

function App() {
  const [selectedEndpoints, setSelectedEndpoints] = useState(
    "https://solana-mainnet.g.alchemy.com/v2/itzn16A7fCkYmzsflcNVz7dNB-Fn0_DA"
  );
  const [airDropHappend, setAirDropHappend] = useState(false);
  const [refetchUserBalance, setRefechUserBalance] = useState(false);

  // const mainNetwork = WalletAdapterNetwork.Mainnet;
  // const devNetwork = WalletAdapterNetwork.Devnet;
  // const testNetwork = WalletAdapterNetwork.Testnet;

  // const mainEndpoint = useMemo(() => clusterApiUrl(mainNetwork), [mainNetwork]);
  // const devEndpoint = useMemo(() => clusterApiUrl(devNetwork), [devNetwork]);
  // const testEndpoint = useMemo(() => clusterApiUrl(testNetwork), [testNetwork]);

  return (
    /** Wrap HTML using Providers
     *
     *
     * Context APIs -> ConnectionProvider, WalletProvider, WalletModalContext
     *
     * ConnectionProvider -> this would provide connection to the blockchain on the specified endpoint.
     * WalletProvider -> this provides me with the wallet object
     * WalletModalContext -> (Guess only) model that pop's up to show all the wallets I have
     *
     * Earlier, do we remember? we created own version of RPC URL(using alchemy)
     * endpoint -> RPC Endpoint ( we can use alchemy URL also here)
     *
     */

    <ConnectionProvider endpoint={selectedEndpoints}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Header />

          <UserBalance
            selectedEndpoints={selectedEndpoints}
            refetchUserBalance={refetchUserBalance}
          />

          {/* Custom Component */}
          <Airdrop
            selectedValue={selectedEndpoints}
            setSelectedValue={setSelectedEndpoints}
            refetchUserBalance={refetchUserBalance}
            setRefechUserBalance={setRefechUserBalance}
          />

          <SignMessage />
          
          <SendSonala 
            refetchUserBalance={refetchUserBalance}
            setRefechUserBalance={setRefechUserBalance}
          />

          <Loader />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
