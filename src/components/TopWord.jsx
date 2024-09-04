import React from "react";

const TopWord = ({ word }) => {
  return (
    <div className="border-2 border-black rounded-lg px-5 py-2 text-2xl mb-5 bg-white">
      {word}
    </div>
  );
};

export default TopWord;