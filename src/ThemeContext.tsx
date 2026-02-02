import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemeContextType = {
  theme: boolean;
  updateTheme: () => void;
};
const themeContext = createContext<ThemeContextType | undefined>(undefined);
type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<boolean>(true);

  const updateTheme = () => {
    setTheme(!theme);
  };

  const value = useMemo(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    () => ({
      theme,
      updateTheme,
    }),
    [theme]
  );

  return (
    <themeContext.Provider value={value}>
      {children}
    </themeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
