import { useState, useEffect } from "react";
import '../styles/globals.css'

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  const [difficulty, setDifficulty] = useState("easy");
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((r, rIndex) =>
        r.map((cell, cIndex) => (rIndex === row && cIndex === col ? value : cell))
      );
      setBoard(newBoard);
    }
  };

  const handleSolve = async () => {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ board }),
    });

    const data = await response.json();
    if (data.solved) {
      setBoard(data.board);
      setIsRunning(false);
    } else {
      alert("No solution found!");
    }
  };

  const handleNewGame = async () => {
    setIsRunning(false); // Stop the timer while generating a new game
    const newGameButton = document.getElementById('btnNewGame');
    btnSolve.disabled = true; // Disable the button
    newGameButton.textContent = "Generating..."; // Change the button text
    newGameButton.disabled = true; // Disable the button
    newGameButton.style.className ="btn-disabled";
    //newGameButton.style.backgroundColor = "gray"; // Gray out the button
    //newGameButton.hidden = true; // Hide the button
    const response = await fetch(`/api/generate?difficulty=${difficulty}`);
    const data = await response.json();
    const newBoard = data.board.map(row => row.map(cell => cell === 0 ? "" : cell));
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Add a 5-second delay
    setBoard(newBoard);
    setTimer(0);
    setIsRunning(true); // Restart the timer for the new game
    //newGameButton.hidden = false; // Hide the button
    newGameButton.style.className="btn-enabled";
    newGameButton.textContent = "New Game"; // Change the button text
    newGameButton.disabled = false; // Enable the button
    btnSolve.disabled = false; // Disable the button

  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center text-red-500">Sudoku Solver red</h1>
      <h1 className="text-4xl text-center text-blue-500">Sudoku Solver blue</h1>
      <h1 className="text-4xl text-center ">Sudoku Solver 105</h1>

      <div className="mb-4">
        <label className="mr-2">Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border p-2">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <p className="mb-4 text-lg font-semibold">Time: {timer}s</p>

      <div className="grid grid-cols-9 gap-1 border-4 border-black bg-white p-2 rounded-lg shadow-md">
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <input
              key={`${rIndex}-${cIndex}`}
              type="text"
              maxLength="1"
              value={cell}
              onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
              className="w-10 h-10 text-center border text-lg font-semibold focus:outline-none rounded-md transition-all bg-gray-100 hover:bg-gray-200"
            />
          ))
        )}
      </div>

      <div className="mt-4 flex gap-4">
        <button id="btnSolve" onClick={handleSolve} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 active:scale-95 transition-all">
          Solve 11
        </button>

        <button id="btnNewGame" onClick={handleNewGame} className="btn">
          New Game
        </button>
      </div>
    </div>
  );
}