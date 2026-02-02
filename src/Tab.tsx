type TabProps = {
  label: string;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const Tab = ({ label, isActive, onClick }: TabProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        border: "none",
        cursor: "pointer",
        background: isActive ? "#1976d2" : "#e0e0e0",
        color: isActive ? "#fff" : "#000",
        marginRight: "4px",
        borderRadius:'5px'
      }}
    >
      {label}
    </button>
  );
};
