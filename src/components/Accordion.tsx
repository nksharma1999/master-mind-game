import {
  useState,
  useContext,
  createContext,
  type ReactNode,
} from "react";

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

type AccordionContextType = {
  openIndex: number | null;
  toggle: (index: number | null) => void;
};

type AccordionProps = {
  children: ReactNode;
};
type AccordionItemsProps = {
  index: number | null;
  children: ReactNode;
};

export const Accordion = ({ children }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number | null) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div
        style={{
          border: "1px solid teal",
          borderRadius: "10px",
          padding: "5px",
        }}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Context not found!");
  return context;
};

Accordion.Item = function Item({ children }: AccordionItemsProps) {
  return (
    <div
      style={{
        border: "1px solid teal",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "5px",
      }}
    >
      {children}
    </div>
  );
};

Accordion.Header = function Header({ index, children }: AccordionItemsProps) {
  const { openIndex, toggle } = useAccordion();
  const showBorder: boolean = openIndex === index && openIndex != null;

  return (
    <div
      onClick={() => toggle(index)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        fontWeight: "bold",
        paddingBottom: "5px",
        borderBottom: showBorder ? "1px solid gray" : "0px",
      }}
    >
      <div>{children}</div>
      <div>{openIndex === index ? "▲" : "▼"}</div>
    </div>
  );
};

Accordion.Body = function Body({ index, children }: AccordionItemsProps) {
  const { openIndex } = useAccordion();
  return openIndex === index ? <div>{children}</div> : null;
};
