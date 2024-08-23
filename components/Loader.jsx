import React from "react";
import Image from "next/image";

const Loader = ({ width = 800, height = 800 }) => {
  return (
    <div className="w-full h-full flex flex-col p-2 items-center justify-center bg-brand-secondary">
      <Image
        src="/loading_state.gif"
        alt="Loading..."
        width={width}
        height={height}
      />
      <h2 className="text-brand-primary text-4xl mt-[-40px]">Loading . . .</h2>
    </div>
  );
};

export default Loader;
