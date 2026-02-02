import { useRef, useState } from "react";

interface result {
  guess: string;
  correctDigits: number;
  correctPositions: number;
}

function GuessNumberGame() {
  const [numberLength, setNumberLength] = useState(4);
  const [secretNumber, setSecretNumber] = useState(generateNumber(4));
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<result[]>([]);
  const [attempts, setAttempts] = useState(0);
  const focus = useRef<HTMLInputElement|null>(null);
  function generateNumber(length: number) {
    let num = "";
    for (let i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10); // random digit 0-9
    }
    return num;
  }

  function handleLengthChange(e: any) {
    const len = parseInt(e.target.value);
    setNumberLength(len);
    setSecretNumber(generateNumber(len));
    setFeedback([]);
    setAttempts(0);
    setGuess("");
  }

  function checkGuess() {
    const maxAttempts = 15;
    if (attempts >= maxAttempts) {
      alert("😂 Please give up! You've tried too many times!");
      return;
    }

    if (guess.length !== numberLength) {
      alert(`Please enter a ${numberLength}-digit number`);
      return;
    }

    let correctDigits = 0;
    let correctPositions = 0;

    // Convert to arrays for easier manipulation
    const secretArr = secretNumber.split("");
    const guessArr = guess.split("");
    // Track matched positions
    const secretUsed = Array(numberLength).fill(false);
    const guessUsed = Array(numberLength).fill(false);
    // First pass: check correct positions
    for (let i = 0; i < numberLength; i++) {
      if (secretArr[i] === guessArr[i]) {
        correctPositions++;
        correctDigits++;
        secretUsed[i] = true;
        guessUsed[i] = true;
      }
    }
    // Second pass: check correct digits in wrong positions
    for (let i = 0; i < numberLength; i++) {
      if (!guessUsed[i]) {
        for (let j = 0; j < numberLength; j++) {
          if (!secretUsed[j] && guessArr[i] === secretArr[j]) {
            correctDigits++;
            secretUsed[j] = true;
            guessUsed[i] = true;
            break;
          }
        }
      }
    }

    const newFeedback:result = {
      guess,
      correctDigits,
      correctPositions,
    };

    setFeedback([newFeedback, ...feedback]);
    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      alert(
        `🎉 You guessed the number ${secretNumber} in ${attempts + 1} tries!`,
      );
    }

    setGuess("");
    focus?.current?.focus();
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Guess the Number</h1>
        <p className="subtitle">Can you crack the code?</p>

        {/* Difficulty */}
        <div className="difficulty-box">
          <span>Difficulty</span>
          <select value={numberLength} onChange={handleLengthChange}>
            <option value={1}>1 Digits</option>
            <option value={2}>2 Digits</option>
            <option value={3}>3 Digits</option>
            <option value={4}>4 Digits</option>
            <option value={5}>5 Digits</option>
            <option value={6}>6 Digits</option>
            <option value={7}>7 Digits</option>
            <option value={8}>8 Digits</option>
            <option value={9}>9 Digits</option>
          </select>
        </div>

        {/* Input + Button */}
        <div className="guess-row">
          <input
            ref={focus}
            type="text"
            placeholder={`Enter ${numberLength}-digit number`}
            value={guess}
            maxLength={numberLength}
            onChange={(e) => setGuess(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkGuess();
              }
            }}
          />
          <button onClick={checkGuess}>Guess</button>
        </div>

        {/* Attempts */}
        <div className="attempts">
          <span># Attempts: {attempts}</span>
        </div>

        <hr />

        {/* Recent Guesses */}
        <div>
          <div style={{ height: "200px", overflowY: "scroll" }}>
            {feedback.length === 0 ? (
              <p className="no-guesses">No guesses yet. Start playing!</p>
            ) : (
              <div style={{ textAlign: "center" }}>
                {feedback.map((item, index) => (
                  <p key={index}>
                    Guess: {item.guess} → {item.correctDigits} correct digits,{" "}
                    {item.correctPositions} in correct position
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuessNumberGame;
