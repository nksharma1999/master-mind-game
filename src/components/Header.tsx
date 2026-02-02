import { useThemeContext } from "../ThemeContext";
export const Header: React.FC = () => {
    const {updateTheme} = useThemeContext();
  return (
    <div style={{ height: "100px", background: "blue" }}>
      <button onClick={updateTheme}>Toggle</button>
    </div>
  );
};
