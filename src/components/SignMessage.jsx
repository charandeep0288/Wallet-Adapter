import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import base58 from "bs58";
import { useState } from "react";

const SignMessage = () => {
  const wallet = useWallet();
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  const signUserMessage = async () => {
    if (!wallet?.publicKey) {
      alert("Please connect your Wallet!!");
      return;
    }

    if (!message) alert("Please enter the message!!");

    if (!publicKey) {
      throw new Error("Wallet not connected!");
    }
    if (!signMessage) {
      throw new Error("Wallet does not support message signing!");
    }

    const encodedMessage = new TextEncoder().encode(message);

    const signature = await signMessage(encodedMessage);
    setMessage("");
    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");

    alert("success", `Message signature: ${base58.encode(signature)}`);
  };

  const onChangeMessage = (e) => {
    setMessage(e.currentTarget.value);
  };

  return (
    <div className="mt-14 border-t border-blue-500">
      <h1 className="m-5 font-medium">Sign Message</h1>

      <input
        className="mx-10 my-5 p-3 text-xl font-bold rounded-md focus-visible:outline-none focus-visible:border-2 focus-visible:border-blue-800"
        id="message-to-sign"
        type="text"
        placeholder="Please Enter the Message...."
        value={message}
        onChange={onChangeMessage}
      />
      <button
        disabled={!message || !wallet?.publicKey}
        className={`mb-4 ${
          !message || !wallet?.publicKey
            ? "cursor-not-allowed bg-[#404144] text-[#999]"
            : "bg-[#512ea5] hover:bg-[#1a1f2e;]"
        }`}
        onClick={signUserMessage}
      >
        Sign Message
      </button>
    </div>
  );
};

export default SignMessage;
