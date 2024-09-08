import React from "react";
import { FaQuestionCircle, FaUsers, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };
  return (
    <div className="min-h-screen bg-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12">
        <div>
          <button className="bg-pink-200 p-2 rounded-lg shadow-md hover:bg-pink-300 transition-colors">
            <FaQuestionCircle className="text-pink-600" />
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-200 p-2 rounded-lg shadow-md hover:bg-blue-300 transition-colors">
            <FaUsers className="text-blue-600" />
          </button>
          <button className="bg-yellow-200 p-2 rounded-lg shadow-md hover:bg-yellow-300 transition-colors">
            <FaTrophy className="text-yellow-600" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-8 relative">
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full border-4 border-black rotate-[-5deg]">
            DOODLE WARS!
          </span>
        </h1>
        <div className="mb-8">
          {/* You would replace this with an actual SVG or image of doodle wars concept */}
          <div className="w-64 h-64 mx-auto bg-yellow-200 rounded-full flex items-center justify-center text-4xl">
            🖍️⚔️🎨
          </div>
        </div>
        <p className="text-xl mb-4">
          Can you out-doodle your opponents in this epic battle of creativity?
        </p>
        <p className="text-lg mb-8">
          Join the{" "}
          <span className="text-yellow-500 font-bold">
            world's most exciting doodling competition
          </span>
          , where your artistic skills meet cutting-edge AI scoring!
        </p>
        <button className="bg-yellow-400 text-black text-xl font-bold py-3 px-12 rounded-full shadow-lg hover:bg-yellow-500 transition-colors transform hover:scale-105"
        onClick={handleStartGame}
        >
          Start Battle!
        </button>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Doodle Wars: Where Creativity Meets Competition</p>
        <p>Created by awesome developers</p>
      </footer>
    </div>
  );
}
