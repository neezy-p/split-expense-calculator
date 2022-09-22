import { createRef, useState } from 'react';
import { ActionBar } from './components/ActionBar/ActionBar';
import { Header } from './components/Header';
import { Splits } from './components/Splits/Splits';
import generateUuid from './utils/generateUuid';

import './styles.scss';

const createNewSplit = () => ({
  id: generateUuid(),
  name: '',
  nodeRef: createRef(null),
});

const initialSplits = [createNewSplit()];

function App() {
  const [selectedSplitType, setSelectedSplitType] = useState('Equally');
  const [splits, setSplits] = useState(initialSplits);

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
        />
        <Splits
          selectedSplitType={selectedSplitType}
          splits={splits}
          onAddSplit={handleAddSplit}
          onRemoveSplit={handleRemoveSplit}
        />
      </div>
    </div>
  );
}

export default App;
