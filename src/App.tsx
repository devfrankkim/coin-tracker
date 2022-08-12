import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";

import ResetGlobalStyle from "./ResetGlobalStyle";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

function App() {
  const isDarkMode = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <ResetGlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
