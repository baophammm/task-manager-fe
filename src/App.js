import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme/index";

export const AppContext = createContext();

function App() {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        paletteMode: mode,
      }),
    [mode]
  );

  return (
    <AuthProvider>
      <AppContext.Provider value={{ mode, setMode, toggleMode }}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default App;
