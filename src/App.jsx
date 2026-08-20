import { useState } from "react"
import { Trophy, Siren } from "lucide-react"

function App() {
  const MIN = 1
  const MAX = 100

  const [guess, setGuess] = useState("")
  const [randomNumber, setRandomNumber] = useState(null)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [result, setResult] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const handleGenerate = () => {
    if (guess === "" || result === "success") return;
const newNumber = Math.floor(Math.random() * 50) + 1;

    const guessNum = Number(guess)

    setRandomNumber(newNumber);
    setHasGenerated(true);
    setAttempts((prev) => prev + 1);
    setResult(guessNum === newNumber ? "success" : "fail")
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate()
    }
  };

  const handleReset = () => {
    setGuess("");
    setRandomNumber(null)
    setHasGenerated(false)
    setResult(null)
    setAttempts(0)
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg p-8">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">
          Random Number
        </h1>

        <p className="text-slate-500 text-center text-sm mb-6">
          Guess a number between {MIN} and {MAX}
        </p>

        <input
          type="number"
          min={MIN}
          max={MAX}
          value={guess}
          disabled={result === "success"}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            result === "success"
              ? "You already won!"
              : "Enter your guess"
          }
          className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 text-slate-700 text-center disabled:bg-slate-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerate}
            disabled={guess === "" || result === "success"}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-95 transition text-white font-semibold px-5 py-2 rounded-lg shadow-sm"
          >
            Generate
          </button>
        </div>

        <div className="text-center mb-6">
          {hasGenerated ? (
            <span className="text-5xl font-extrabold text-blue-600">
              {randomNumber}
            </span>
          ) : (
            <span className="text-slate-400 italic">
              No number generated yet
            </span>
          )}
        </div>

        {result === "success" && (
          <div className="flex items-center justify-center gap-2 text-center bg-green-50 border border-green-200 text-green-700 rounded-lg py-2 px-3 text-sm font-medium mb-4">
            <Trophy size={18} />
            Congratulations! Your guess matched the number.
          </div>
        )}

        {result === "fail" && (
          <div className="flex items-center justify-center gap-2 text-center bg-red-50 border border-red-200 text-red-700 rounded-lg py-2 px-3 text-sm font-medium mb-4">
            <Siren size={18} />
            You guessed wrong. The number was {randomNumber}.
          </div>
        )}

        {hasGenerated && (
          <>
            <p className="text-center text-xs text-slate-400 mb-3">
              Attempts: {attempts}
            </p>

            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="text-slate-500 hover:text-slate-700 text-sm underline"
              >
                Try again
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App