import { useRef, useState } from "react";

interface result {
  guess: string;
  correctDigits: number;
  correctPositions: number;
}
const winMessages = [
  "Boom! You cracked the code — {n}-digit brain, {t} tries. Legendary!",
  "Mission complete! You bullied that number into submission in just {t} tries.",
  "Your brain just unlocked God Mode — guessed {n} in {t} tries!",
  "Are you psychic or just showing off? {n} digits, {t} tries. Respect.",
  "Number defeated. Ego boosted. {t} tries. Clean victory.",
  "Game over… for the number 😎 Took you only {t} tries!",
  "NASA called. They want that calculation speed back 🚀",
  "That guess was smoother than WiFi at 3AM 📶",
];
const loseMessages = [
  "That number lived rent-free in your head and still won 🏠😂",
  "Bhai tu rehne de, tere se na ho payega 😂",
  "Even the number is confused how you missed that 🤔💀",
  "Give up karde bhai, kitna try karega 💀",
  "Bhai give up karde, Kyu mera server ka paisa barbad kar rha",
  "Instagram Open kar or reels dekh 💀, tere se nhi ho payega",
  "Your guesses had confidence. Accuracy? Not invited 😎🚫",
  "Bhai ye game tere confidence pe chal raha hai, skill pe nahi 😭",
  "That number dodged you like responsibilities 🏃‍♂️💨",
  "Lagta hai number ne tujhe block kar diya 📵",
  "Bhai, Arjun Kapoor tere se accha khelta hai!",
  "Bhai, Arjun Kapoor tere se accha khelta hai!",
  "Bhai, Arjun Kapoor tere se accha khelta hai!",
  "Bhai, Arjun Kapoor tere se accha khelta hai!",
  "You didn’t lose… you just *strategically failed* 📉😌",
  "Bhai give up karde, Kyu mera server ka paisa barbad kar rha",
  "Bhai tu guess nahi kar raha, attendance laga raha hai 📝",
  "Plot twist: The number was never scared of you 🎭😬",
  "Bhai give up karde, Kyu mera server ka paisa barbad kar rha",
  "Ye number nahi milega, ye government job hai 😭",
  "You guessed so wrong the number felt safe 🛡️😂",
  "Bhai tu itna close bhi nahi tha jitna tu soch raha hai 🤡",
  "Bhai give up karde, Kyu mera server ka paisa barbad kar rha",
  "That wasn’t guessing. That was creative writing ✍️🤣",
  "Ye guessing nahi, andhadhun teer chalana hai 🎯🙈",
  "Achievement unlocked: Professional Overthinker 🧠🔓",
  "Number tujhe dekh ke has raha hai 😂",
  "The number hid in plain sight and you still walked past it 👀🚶‍♂️",
  "Bhai calculator bhi bol raha ‘main nahi help karunga’ 🧮🚫",
  "That guess had confidence of 100, accuracy of 2 💯➡️2",
  "Tu number dhoond raha, number tujhe ignore kar raha 😶",
  "You didn’t miss. You *missed dramatically* 🎬💥",
  "Itna galat guess toh exam me bhi nahi hota 📉🤣",
  "Breaking News: Player loses to random number 📰💔",
  "Bhai tu try kar raha hai ya warm-up? 🏃‍♂️",
  "The number blinked… you missed 👁️❌",
  "Ek din problem reh jayega, aur tu history bann jayega!",
  "Lagta hai tu vibe pe guess kar raha hai, logic pe nahi ✨🧠",
  "You guessed like WiFi in a basement 📶⬇️",
  "Bhai tera aim aur stormtrooper ka aim same hai 🎯❌",
  "You didn’t lose the game. You fed the number’s ego 🍽️😤",
  "Ye game tujhe nahi, tu game ko disappoint kar raha hai 😔",
  "The number didn’t move. You still couldn’t find it 🧍‍♂️🔍",
  "Bhai tu haar nahi raha, tu history bana raha hai 📚💀",
  "The number wants a rematch. It’s still bored 😒🔁",
  "Number ne bola ‘bhai main yahi hoon’, tu phir bhi miss kiya 😭",
  "Respect the effort. Fear the results 🫡📉",
  "Bhai tu guess nahi, random button mash kar raha hai 🎮😂",
  "You played well… said no one 🫢🙃",
  "Ye number nahi mila toh tu motivation video dekhne jayega 📹💔",
  "The number survived. Barely entertained 🎪😐",
  "Bhai tera luck bhi bol raha ‘main chalta hoon’ 🚶‍♂️🍀",
  "You gave effort. The number gave disappointment 🎁😩",
  "Tu aur sahi guess — kabhi mile hi nahi 🤝❌",
  "Even autocorrect can guess better sometimes 📱😶",
  "Bhai tu rehne de, chai pee le ☕😂",
  "Your brain went on airplane mode mid-game ✈️😴",
  "The number wasn’t hard. You just made it emotional 😭🔢",
  "Number: ‘bhai please serious ho ja’ 😭",
  "The number called. It said ‘try again buddy’ ☎️😏"
];

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

function GuessNumberGame() {
  const [numberLength, setNumberLength] = useState(4);
  const [secretNumber, setSecretNumber] = useState(generateNumber(4));
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<result[]>([]);
  const [attempts, setAttempts] = useState(0);
  const focus = useRef<HTMLInputElement | null>(null);
  const [giveUpmsg, setGiveUp] = useState<number>(2);
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
  }

  function checkGuess() {
    const maxAttempts = 6;
    

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

    const newFeedback: result = {
      guess,
      correctDigits,
      correctPositions,
    };

    setFeedback([newFeedback, ...feedback]);
    setAttempts(attempts + 1);

    if (guess === secretNumber) {
      alert(`🎉 ${getRandomWinMessage(secretNumber, attempts + 1,numberLength)} 🏆`);
      return;
    }
    if (attempts >= maxAttempts) {
      if(giveUpmsg==2){
        setGiveUp(0);
        alert(`💀 ${getRandomLoseMessage(attempts)}`);
      }else{
        setGiveUp(pre => pre+1);
      }
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
            inputMode="numeric"
            pattern="[0-9]*"
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
    </div>
  );
}

export default GuessNumberGame;
