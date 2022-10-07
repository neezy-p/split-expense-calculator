import { useContext } from "react";
import { ActionBar } from "./components/ActionBar/ActionBar";
import { Header } from "./components/Header";
import { Splits } from "./components/Splits/Splits";

import "./styles.scss";
import SplitDataContext from "./store/split-data-context";

function App() {
  const splitState = useContext(SplitDataContext);

  return (
    <div className="app">
      <Header />
      <div className="body">
        <ActionBar onTotalEntered={splitState.handleTotalEntered} />
        <Splits onTotalEntered={splitState.handleTotalEntered} />
      </div>
    </div>
  );
}

export default App;
