import React, { useEffect, useState } from "react";

interface OTPInputProps {
  length?: number; // default 6
  onSubmit?: () => void;
  guessInput: (otp:string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onSubmit,guessInput }) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));

  const resetInput = () =>{
    setValues(Array(length).fill(""));
  }

  useEffect(()=>{
    resetInput();
  },[length])

  const handleChange = (
    val:string,
    index: number
  ) => {
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
    guessInput(newValues.join(""));
    if (val && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }

    if (e.key === "Enter") {
      GuessNumber();
    }
  };

  const GuessNumber = () =>{
    const combined = values.join("");
    if (onSubmit && combined.length === length){ 
        resetInput();
        onSubmit();
        const prevInput = document.getElementById(`otp-0`);
        prevInput?.focus();
    }
  }

  return (
    <div className="guess-row">
      {values.map((val, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(e.target.value.replace(/\D/g, ""), i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
      <button onClick={GuessNumber}>Guess</button>
    </div>
  );
};

export default OTPInput;
