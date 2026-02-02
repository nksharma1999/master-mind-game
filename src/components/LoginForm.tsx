// import { createContext, useContext, useState, type ReactNode } from "react";

// const FormContext = createContext<FormContextType|undefined>(undefined);

// type FormContextType = {
//     values: any;
//     setValue: (name:string,value:string)=> void;
// }

// type LoginFormProps = {
//   submit: (data: any) => void;
//   children: ReactNode;
// };

// type FormInputProps = {
//     name: string;
//     label: string;
//     type?: string;
// }

// export const LoginForm = ({ submit, children }: LoginFormProps) => {
//   const [values, setValues] = useState({});

//   const setValue = (name: string, value: string) => {
//     setValues((pre) => ({ ...pre, [name]: value }));
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     submit(values);
//   };
//   return (
//     <FormContext.Provider value={{ values, setValue }}>
//       <form onSubmit={handleSubmit}>{children}</form>
//     </FormContext.Provider>
//   );
// };

// LoginForm.Input = function Input({ name, label, type = "text" }:FormInputProps) {
//   const { values, setValue } = useContext(FormContext);
//   return (
//     <div>
//       <label>
//         {" "}
//         {label}
//         <input
//           type={type}
//           value={values[name] || ""}
//           onChange={(e) => setValue(name, e.target.value)}
//         />
//       </label>
//     </div>
//   );
// };

// LoginForm.Submit = function Submit({children}){
//     return <button type="submit">{children}</button>
// }