interface PreviewBoxProps {
  text: string;
}

export const PreviewBox: React.FC<PreviewBoxProps> = ({ text }) => {
  return (
    <div style={{ height: "300px", background: "gray" }}>
      <p>{text}</p>
    </div>
  );
};
