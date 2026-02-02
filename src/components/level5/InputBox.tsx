// import { useRef } from "react";

// interface InputBoxProps {
//   text: string;
//   updateText: (text: string) => void;
// }

// export const InputBox: React.FC<InputBoxProps> = ({updateText }) => {
//   const textRef = useRef<HTMLInputElement | null>(null);
//   const submit = () =>{
//     updateText(textRef.current?.value);
//   }
//   return (
//     <>
//       <input
//         ref={textRef}
//       />
//       <button onClick={() => submit()}>Submit</button>
//     </>
//   );
// };
