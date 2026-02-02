// import { useState } from "react";

// export const GuessNumberRange = () => {
//   // const [secretNumber, setSecretNumber] = useState(generateNumber());
//   const [min, setMin] = useState<number>(0);
//   const [max, setMax] = useState<number>(100);
//   const [guess, setGuess] = useState("");
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [guessMsg, setGuessMsg] = useState(
//     "Please guess a number, enter it, and press Guess:",
//   );
//   // function generateNumber() {
//   //   let num = "";
//   //   for (let i = 0; i < length; i++) {
//   //     num += Math.floor(Math.random() * 10); // random digit 0-9
//   //   }
//   //   return num;
//   // }
//   const checkGuess = () => {
//     // if()
//   };
//   const newTarget = () => {};
//   return (
//     <div className="page">
//       <div className="card">
//         <h1 className="title">Guess My Number</h1>
//         <p className="subtitle">Guess a random number</p>
//         <div>
//           <input
//             className="inputRange"
//             value={min}
//             onChange={(e) => setMin(e.target.value)}
//           />
//           <input
//             className="inputRange"
//             value={max}
//             onChange={(e) => setMax(e.target.value)}
//           />
//           <button className="newTarget" onClick={newTarget}>
//             New Target
//           </button>
//         </div>
//         <p style={{ textAlign: "center" }}>{guessMsg}</p>
//         <div className="guess-row">
//           <input
//             ref={focus}
//             type="text"
//             // placeholder={`Enter ${numberLength}-digit number`}
//             value={guess}
//             onChange={(e) => setGuess(e.target.value.replace(/\D/g, ""))}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 checkGuess();
//               }
//             }}
//           />
//           <button onClick={checkGuess}>Guess</button>
//         </div>
//       </div>
//     </div>
//   );
// };
