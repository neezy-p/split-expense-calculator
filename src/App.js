import { createRef, useState } from "react";
import { ActionBar } from "./components/ActionBar/ActionBar";
import { Header } from "./components/Header";
import { Splits } from "./components/Splits/Splits";
import { EQUALLY } from "./constants";
import generateUuid from "./utils/generateUuid";

import "./styles.scss";

const createNewSplit = () => ({
  id: generateUuid(),
  name: "",
  value: 0,
  nodeRef: createRef(null)
});

const initialSplits = [createNewSplit()];

function App() {
  const [selectedSplitType, setSelectedSplitType] = useState(EQUALLY);
  const [splits, setSplits] = useState(initialSplits);
  const [totalExpense, setTotalExpense] = useState("");

  const handleSplitTypeSelect = (type) => {
    setSelectedSplitType(type);

    if (type === EQUALLY) {
      const totalExpenseInCents = totalExpense * 100;
      const splitsWithExtraPennyCount = totalExpenseInCents % splits.length;
      const equalSplitAmount = +(totalExpense / splits.length).toFixed(2);

      const newSplits = splits.map((split, index) => {
        if (index + 1 <= splitsWithExtraPennyCount) {
          return { ...split, value: equalSplitAmount + 0.01 };
        }

        return { ...split, value: equalSplitAmount };
      });

      setSplits(newSplits);
    }
  };

  const handleAddSplit = () => {
    const newSplit = createNewSplit();
    setSplits([...splits, newSplit]);
  };

  const handleRemoveSplit = (id) => {
    const newSplits = splits.filter((item) => item.id !== id);
    setSplits(newSplits);
  };

  const handleTotalExpenseChange = (value) => {
    setTotalExpense(value);
  };

  return (
    <div className="app">
      <Header />
      <div className="body">
        <ActionBar
          selectedSplitType={selectedSplitType}
          onSplitTypeSelect={handleSplitTypeSelect}
          onAddSplit={handleAddSplit}
          totalExpense={totalExpense}
          onTotalExpenseChange={handleTotalExpenseChange}
        />
        <Splits
          selectedSplitType={selectedSplitType}
          splits={splits}
          onRemoveSplit={handleRemoveSplit}
          totalExpense={totalExpense}
        />
      </div>
    </div>
  );
}

export default App;
