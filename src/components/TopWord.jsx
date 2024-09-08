import React from "react";
import { ClipLoader } from "react-spinners";

const TopWord = ({ word, isLoading }) => {
  // Define a class to set the text size and use it to set the spinner size
  const textSize = "text-2xl"; // Tailwind text size class
  const spinnerSize = "2.5rem"; // Adjust based on text size class

  return (
    <div
      className={`bg-gradient-to-r from-yellow-200 to-yellow-400 text-gray-800 ${textSize} mb-5 py-2 px-4 rounded-lg shadow-inner flex items-center justify-center font-serif`}
    >
      {isLoading ? <ClipLoader size={spinnerSize} color={"#4a5568"} /> : word}
    </div>
  );
};

export default TopWord;
