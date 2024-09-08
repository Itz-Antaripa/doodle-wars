import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaUndo, FaRedo, FaHome } from "react-icons/fa";
import Board from "../components/Board.jsx";
import TopWord from "../components/TopWord.jsx";
import { menuItemClick } from "../slices/menuslice";
import { getRandomWord } from "../services/wordService.js";
import { MENU_ITEMS } from "../constants";
import SubmitButton from "../components/SubmitButton.jsx";

const Game = () => {
	const dispatch = useDispatch();
	const [timeLeft, setTimeLeft] = useState(60);
	const [score, setScore] = useState(null);

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

	const handleSubmit = async () => {
		// Implement your submit logic here
		// For example:
		// const result = await submitDrawing();
		// setScore(result.score);
		setScore(Math.floor(Math.random() * 101)); // Placeholder: random score
	};

	return (
		<div className="flex flex-col h-screen bg-yellow-300">
			<div className="p-2 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold hover:underline mr-2">
          <FaHome />
        </Link>
        <span className="text-lg font-bold">Drawing 1/6</span>
      </div>
				<div className="bg-white px-3 py-1 rounded-md text-lg font-bold">
					{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
				</div>
				<div className="flex space-x-1">
					<button onClick={() => handleAction(MENU_ITEMS.PENCIL)} className={`p-2 rounded-md shadow ${activeMenuItem === MENU_ITEMS.PENCIL ? 'bg-gray-400' : 'bg-gray-200'}`}>
						<FaPencilAlt />
					</button>
					<button onClick={() => handleAction(MENU_ITEMS.UNDO)} className="bg-gray-200 p-2 rounded-md shadow">
						<FaUndo />
					</button>
					<button onClick={() => handleAction(MENU_ITEMS.REDO)} className="bg-gray-200 p-2 rounded-md shadow">
						<FaRedo />
					</button>
				</div>
			</div>
			<div className="flex-grow flex flex-col items-center justify-center p-4">
				<TopWord word={word} isLoading={status === "loading"} />
				<Board width={Math.min(window.innerWidth - 40, 600)} height={Math.min(window.innerHeight - 300, 350)} />
				{score === null ? (
					<SubmitButton onClick={handleSubmit}/>
				) : (
					<div className="mt-4 text-xl font-bold bg-white px-4 py-2 rounded-lg shadow">
						Your Score: {score}/100
					</div>
				)}
			</div>
		</div>
	);
};

export default Game;
