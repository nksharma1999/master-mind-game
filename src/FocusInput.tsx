import { useEffect, useRef, useState } from "react";

export const FocusInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const renderCount = useRef(0);
  renderCount.current++;
  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} value={input} onChange={updateInput} />
      <p>Render Count {renderCount.current}</p>
    </div>
  );
};
