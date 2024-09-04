import React from "react";
import { MENU_ITEMS } from "../constants";

const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      className="border-2 border-black rounded-lg px-5 py-2 text-lg bg-white cursor-pointer hover:bg-gray-200"
      onClick={() => onSubmit(MENU_ITEMS.SUBMIT)}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
