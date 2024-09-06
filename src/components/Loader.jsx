import { useState } from "react";
const Loader = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="absolute top-0 left-0 loader h-screen w-screen bg-white opacity-50 z-50"></div>
      )}
    </>
  );
};

export default Loader;
