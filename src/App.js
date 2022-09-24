import { createRef, useState } from 'react';
import { ActionBar } from './components/ActionBar/ActionBar';
import { Header } from './components/Header';
import { Splits } from './components/Splits/Splits';
import { EQUALLY } from './constants';
import generateUuid from './utils/generateUuid';

import './styles.scss';

const createNewSplit = () => ({
  id: generateUuid(),
  name: '',
  nodeRef: createRef(null),
});

const initialSplits = [createNewSplit()];

function App() {
  const [selectedSplitType, setSelectedSplitType] = useState(EQUALLY);
  const [splits, setSplits] = useState(initialSplits);
  const [totalExpense, setTotalExpense] = useState("");

  const handleSplitTypeSelect = (type) => {
    setSelectedSplitType(type);
  };

  const handleAddSplit = () => {
    const newSplit = createNewSplit();
    setSplits([...splits, newSplit]);
  };

  const handleRemoveSplit = (id) => {
    const newSplits = splits.filter((item) => item.id !== id);
    setSplits(newSplits);
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
          setTotalExpense={setTotalExpense}
        />
        <Splits
          selectedSplitType={selectedSplitType}
          splits={splits}
          onAddSplit={handleAddSplit}
          onRemoveSplit={handleRemoveSplit}
          totalExpense={totalExpense}
        />
      </div>
    </div>
  );
}

export default App;
