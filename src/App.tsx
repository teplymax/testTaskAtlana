//------------------Basic imports---------------------------
import React from "react";

//------------------Router---------------------------
import MainRouter from "./route";

//------------------Components-----------------------
import { CustomAlert } from "./components";

const App: React.FC=()=> {
  return (
    <>
      <CustomAlert />
      <MainRouter />
    </>
  );
}

export default App;
