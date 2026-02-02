import { useMemo, useState } from "react";

const slowSum = (num:number)=>{
    // console.log("calulating...");
    let total =0;
    for(let i=0;i<1e7;i++){
        total+=num;
    }
    return total;
}

export const UserList: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
//   const result = slowSum(count);
const result = useMemo(()=> slowSum(count),[count]);
  return (
    <>
      <h3>Result: {result} {text}</h3>
      <button onClick={() => setCount(count + 1)} >Add</button>
      <input onChange={(e) => setText(e.target.value)} />
    </>
  );
};
