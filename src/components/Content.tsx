import { useThemeContext } from "../ThemeContext";

export const Content: React.FC = () => {
  const { theme } = useThemeContext();
  return (
    <div style={{ background: theme ?"Black":"White", height: "500px" }}>
      <p style={{color:'red'}}>{theme?"Dark":"Light"}</p>
    </div>
  );
};
