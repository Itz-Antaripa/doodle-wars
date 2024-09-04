import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopWord from "./components/TopWord.jsx";
import Board from "./components/Board.jsx";
import Menu from "./components/Menu.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import { setAction } from "./slices/appSlice";
import { menuItemClick } from "./slices/menuslice.js";
import { getRandomWord } from "./services/wordService.js";

const App = () => {
  const dispatch = useDispatch();

  const { word, action, status } = useSelector((state) => {
    return {
      word: state.app.word,
      action: state.app.action,
      status: state.app.status,
    };
  });
  const { activeMenuItem } = useSelector((state) => {
    return {
      activeMenuItem: state?.menu?.activeMenuItem,
    };
  });

  const { canvasUrl } = useSelector((state) => {
    return {
      canvasUrl: state?.canvas?.canvasUrl,
    };
  });

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  useEffect(() => {
    if (status === "idle") {
      console.log(status, word, "status");
      dispatch(getRandomWord());
    }
  }, [dispatch, status, word]);

  const handlePenClick = () => dispatch(setAction("pen"));
  const handleUndoClick = () => dispatch(setAction("undo"));
  const handleRedoClick = () => dispatch(setAction("redo"));
  const handleSubmit = () => {
    // handle submit logic
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      {canvasUrl && (
        <div className="text-center mx-auto w-full max-w-[600px] max-h-[30px] break-words">
          {canvasUrl.slice(0, 50)}
        </div>
      )}
      <TopWord word={word} isLoading={status==="loading"} />
      <div className="relative border-2 border-black p-2.5">
        <Board width={500} height={300} />
        <Menu
          onPenClick={handlePenClick}
          onUndoClick={handleUndoClick}
          onRedoClick={handleRedoClick}
        />
      </div>
      <SubmitButton onSubmit={handleMenuClick} />
    </div>
  );
};

export default App;
