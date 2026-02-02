// import { createContext, useContext, useState, type ReactNode } from "react";

// const ModelContext = createContext<ModelContextType | undefined>(undefined);

// type ModelProps = {
//   children: ReactNode;
// };

// type ModelContextType = {
//   isOpen: boolean;
//   updateState: () => void;
// };

// export const Model = ({ children }: ModelProps) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const updateState = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <ModelContext.Provider value={{ isOpen, updateState }}>
//       {children}
//     </ModelContext.Provider>
//   );
// };

// Model.Toggle = function Toggle({ children }) {
//   const { updateState } = useContext(ModelContext);
//   return <button onClick={updateState}>{children}</button>;
// };

// Model.Content = function Content({ children }) {
//   const { isOpen, updateState } = useContext(ModelContext);
//   return isOpen ? (
//     <div>
//       {children} <button onClick={updateState}>Close</button>
//     </div>
//   ) : (
//     <></>
//   );
// };
