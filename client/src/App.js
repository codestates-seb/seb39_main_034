import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Gnb from "./components/Gnb/Gnb";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Gnb />
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
