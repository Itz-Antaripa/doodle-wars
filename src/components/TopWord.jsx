import React from "react";
import { ClipLoader } from "react-spinners";

const TopWord = ({ word, isLoading }) => {
  // Define a class to set the text size and use it to set the spinner size
  const textSize = "text-2xl"; // Tailwind text size class
  const spinnerSize = "2.5rem"; // Adjust based on text size class

  return (
    <div
      className={`border-2 border-black rounded-lg px-5 py-2 ${textSize} mb-5 bg-white flex items-center justify-center`}
    >
      {isLoading ? <ClipLoader size={spinnerSize} color={"#000"} /> : word}
    </div>
  );
};

export default TopWord;
