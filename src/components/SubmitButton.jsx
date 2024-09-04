import React from "react";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      className="border-2 border-black rounded-lg px-5 py-2 text-lg bg-white cursor-pointer hover:bg-gray-200"
      onClick={onSubmit}
    >
      Submit
    </button>
  );
};

export default SubmitButton;