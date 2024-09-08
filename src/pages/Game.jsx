import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Board from "../components/Board.jsx";
import { menuItemClick } from "../slices/menuslice";
import { getRandomWord } from "../services/wordService.js";
import { MENU_ITEMS } from "../constants";

const Game = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer

  const { word, status, activeMenuItem } = useSelector((state) => ({
    word: state.app.word,
    status: state.app.status,
    activeMenuItem: state.menu.activeMenuItem,
  }));

  useEffect(() => {
    if (status === "idle") {
      dispatch(getRandomWord());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (actionType) => {
    dispatch(menuItemClick(actionType));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-yellow-300 p-2 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold hover:underline">Draw: {word}</Link>
        <div className="bg-white px-3 py-1 rounded-md text-lg font-bold">
          {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => handleAction(MENU_ITEMS.PENCIL)} 
            className={`p-2 rounded-md shadow ${activeMenuItem === MENU_ITEMS.PENCIL ? 'bg-gray-400' : 'bg-gray-200'}`}
          >
            ✏️
          </button>
          <button 
            onClick={() => handleAction(MENU_ITEMS.UNDO)} 
            className="bg-gray-200 p-2 rounded-md shadow"
          >
            ↩️
          </button>
          <button 
            onClick={() => handleAction(MENU_ITEMS.REDO)} 
            className="bg-gray-200 p-2 rounded-md shadow"
          >
            ↪️
          </button>
        </div>
      </div>
      <div className="flex-grow p-4">
        <Board width={window.innerWidth - 40} height={window.innerHeight - 120} />
      </div>
    </div>
  );
};

export default Game;
