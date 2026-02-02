import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

type CardSectionProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>{children}</div>
  );
};

const Header = ({ children }: CardSectionProps) => {
  return (
    <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{children}</div>
  );
};

const Body = ({ children }: CardSectionProps) => {
  return <div style={{ marginBottom: "8px" }}>{children}</div>;
};

const Footer = ({ children }: CardSectionProps) => {
  return (
    <div style={{ borderTop: "1px solid #eee", paddingTop: "8px" }}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
