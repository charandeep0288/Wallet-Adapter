import React, { useMemo } from "react";
function Dropdown({ selectedValue, setSelectedValue }) {
  const options = useMemo(() => [
    {
      value:
        "https://solana-mainnet.g.alchemy.com/v2/itzn16A7fCkYmzsflcNVz7dNB-Fn0_DA",
      label: "Mainnet",
    },
    {
      value:
        "https://solana-devnet.g.alchemy.com/v2/itzn16A7fCkYmzsflcNVz7dNB-Fn0_DA",
      label: "Devnet",
    },
  ]);

  const setSelectedDropdownValue = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <select
      className="p-4 mr-10 rounded-md focus-visible:outline-none font-bold"
      value={selectedValue}
      onChange={setSelectedDropdownValue}
    >
      {options.map((option) => (
        <option className="font-bold" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default Dropdown;
