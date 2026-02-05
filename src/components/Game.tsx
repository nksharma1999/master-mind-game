import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { loseMessages, winMessages } from "./Message";
import OTPInput from "./OTPInput";

interface result {
  guess: string;
  correctDigits: number;
  correctPositions: number;
}

const getRandomLoseMessage = (guessCount:number) => {
  if(guessCount == 6){
    return "Himmat ae madaa, toh maddade khuda!!"
  }
  return loseMessages[Math.floor(Math.random() * loseMessages.length)];
};

const getRandomWinMessage = (number: string, tries: number, numberSize:number) => {
  if (tries > 10+numberSize && numberSize<=6)
    return "Boom! You cracked the code — {n}-digit brain, {t} tries."
      .replace("{n}", number)
      .replace("{t}", tries.toString());
  const randomMsg = winMessages[Math.floor(Math.random() * winMessages.length)];

  return randomMsg.replace("{n}", number).replace("{t}", tries.toString());
};

// Save JSON data to localStorage
const storeData = (key:string, data:any[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Retrieve JSON data from localStorage
const getInfo = (key:string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

const updateData = (key:string, newData:any) => { 
  const existingData = getInfo(key); 
  if (existingData) { 
    const updatedData = [newData, ...existingData ]; 
    storeData(key, updatedData); 
  } else { 
    storeData(key, [newData]); // if no existing data, just store new 
  } 
};

const GuessNumberGame:React.FC = () => {
  const [options] = useState(Array(10).fill(10));
  const [numberLength, setNumberLength] = useState(4);
  const [secretNumber, setSecretNumber] = useState(generateNumber(4));
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<result[]>([]);
  const [attempts, setAttempts] = useState(0);
  const focus = useRef<HTMLInputElement | null>(null);
  const [giveUpmsg, setGiveUp] = useState<number>(2);
  const [win ,setWin] = useState<boolean>(false);

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
    setGiveUp(2);
    setWin(false);
  }

  const guessInput = (val:string) =>{
    setGuess(val);
  }

  function checkGuess() {
    const maxAttempts = 6;
    let correctDigits = 0;
    let correctPositions = 0;
  
    if (guess.length !== numberLength) {
      toast(`Please enter a ${numberLength}-digit number`);
      return;
    }
    
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
    const newFeedback: result = {
      guess,
      correctDigits,
      correctPositions,
    };
    setFeedback([newFeedback, ...feedback]);
    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      // updateData("UserHistory",{
      //   number:guess,
      //   attempts:attempts+1,
      //   guessHistory: feedback
      // })
      setWin(true);
      toast(`🎉 ${getRandomWinMessage(secretNumber, attempts + 1,numberLength)} 🏆`);
      return;
    }
    if (attempts >= maxAttempts) {
      if(giveUpmsg==2){
        setGiveUp(0);
        toast(`💀 ${getRandomLoseMessage(attempts)}`)
      }else{
        setGiveUp(pre => pre+1);
      }
    }
    setGuess("");
    focus?.current?.focus();
  }

  useEffect(()=>{
    if(win){
      setTimeout(()=>{
        setSecretNumber(generateNumber(numberLength));
        setFeedback([]);
        setAttempts(0);
        setGuess("");
        setGiveUp(2);
        setWin(false);
      },5000);
    }
  },[win]);

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Guess the Number</h1>
        <p className="subtitle">Can you crack the code?</p>

        {/* Difficulty */}
        <div className="difficulty-box">
          <span>Difficulty</span>
          <select value={numberLength} onChange={handleLengthChange}>
            {options.map((_,index) =>{
              return <option value={index+1}>{index+1} Digits</option>;
            })}
          </select>
        </div>
        <OTPInput length={numberLength} onSubmit={checkGuess} guessInput={guessInput} />
        {/* Attempts */}
        <div className="attempts">
          <span># Attempts: {attempts}</span>
          {win && <span style={{background:'green',color:'white'}}>Completed</span>}
          {win && <span>Resetting...</span>}
        </div>

        <hr />

        {/* Recent Guesses */}
        <div>
          <div style={{ height: "200px", overflowY: "scroll" }}>
            {feedback.length === 0 ? (
              <p className="no-guesses">No guesses yet. Start playing!</p>
            ) : (
              <div style={{ textAlign: "start" }}>
                {feedback.map((item, index) => (
                  <p key={index} style={{ fontSize: "15px" }}>
                    Guess: {item.guess} → {item.correctDigits} correct digit
                    {item.correctDigits !== 1 ? "s" : ""},{" "}
                    {item.correctPositions} in the correct position
                    {item.correctPositions > 1 ? "s" : ""}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position={"top-center"} />
    </div>
  );
}

export default GuessNumberGame;
