import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GuessNumberRange = () => {
  // const [secretNumber, setSecretNumber] = useState(generateNumber());
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [guess, setGuess] = useState("");
  const [number,setNumber] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [guessMsg, setGuessMsg] = useState(
    "Please guess a number, enter it, and press Guess:",
  );
  const checkGuess = () => {

  if (number === Number(guess)) {
    setGuessMsg("✅ Your guess is correct!");
    return;
  }

  if (number > Number(guess)) {
    setGuessMsg("My number is greater than your guess.");
  } else {
    setGuessMsg("My number is less than your guess.");
  }
};

  const getRandomNumber = (minValue:number, maxvalue:number) => { 
    return Math.floor(Math.random() * (maxvalue - minValue + 1)) + minValue;
  }
  const newTarget = () => {
    if(min>max){ 
        toast("Please Enter Valid Range");
        return;
    }
    setNumber(getRandomNumber(min,max));
    toast("New Target Set!");
  };

  useEffect(()=>{
    setNumber(getRandomNumber(min,max));
  },[]);

  return (
      <div className="card">
        <h1 className="title">Guess My Number</h1>
        <p className="subtitle">Guess a random number</p>
        <div className="guess-row">
          <input
            className="inputRange"
            placeholder={"Min"}
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            className="inputRange"
            placeholder={"Max"}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <button className="newTarget" style={{width:'120px',background:'teal'}} onClick={newTarget}>
            New Target
          </button>
        </div>
        <p style={{ textAlign: "center" }}>{guessMsg}</p>
        <div className="guess-row">
          <input
            ref={focus}
            type="text"
            placeholder={`Enter number`}
            value={guess}
            onChange={(e) => setGuess(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkGuess();
              }
            }}
          />
          <button onClick={checkGuess}>Guess</button>
        </div>
      </div>
  );
};
