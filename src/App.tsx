import { useState } from "react";
import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";

import ResetGlobalStyle from "./ResetGlobalStyle";
import { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

function App() {
  // const [isDark, setIsDark] = useState(false);
  const isDark = useRecoilValue(isDarkAtom);
  // const toggleDark = () => setIsDark((current) => !current);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <ResetGlobalStyle />
        {/* <button onClick={toggleDark}>Toggle Mode</button> */}
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
