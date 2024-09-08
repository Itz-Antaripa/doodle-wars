import React from "react";
import { MENU_ITEMS } from "../constants";

const SubmitButton = ({ onSubmit, onClick }) => {
  return (
    <button
      className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      onClick={() => {
        onClick();
        onSubmit(MENU_ITEMS.SUBMIT);
      }}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
