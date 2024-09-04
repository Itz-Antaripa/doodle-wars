import React from "react";

const Menu = ({ onPenClick, onUndoClick, onRedoClick }) => {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {/* <button
        className="bg-white border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200"
        onClick={onPenClick}
      >
        ✏️
      </button> */}
      {/* <button
        className="bg-white border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200"
        onClick={onUndoClick}
      >
        ↩️
      </button>
      <button
        className="bg-white border-2 border-black rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200"
        onClick={onRedoClick}
      >
        ↪️
      </button> */}
    </div>
  );
};

export default Menu;
