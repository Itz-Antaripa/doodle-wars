import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopWord from "./components/TopWord.jsx";
import Board from "./components/Board.jsx";
import Menu from "./components/Menu.jsx";
import SubmitButton from "./components/SubmitButton.jsx";
import { setAction } from "./slices/appSlice";

const App = () => {
  const dispatch = useDispatch();

  const { word, action } = useSelector((state) => {
    return {
      word: state.app.word,
      action: state.app.action,
    };
  });

  const handlePenClick = () => dispatch(setAction("pen"));
  const handleUndoClick = () => dispatch(setAction("undo"));
  const handleRedoClick = () => dispatch(setAction("redo"));
  const handleSubmit = () => {
    // handle submit logic
  };

  return (
    <div className="flex flex-col items-center p-5">
      <TopWord word={word} />
      <div className="relative border-2 border-black p-2.5">
        <Board width={500} height={300} />
        <Menu
          onPenClick={handlePenClick}
          onUndoClick={handleUndoClick}
          onRedoClick={handleRedoClick}
        />
      </div>
      <SubmitButton onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
