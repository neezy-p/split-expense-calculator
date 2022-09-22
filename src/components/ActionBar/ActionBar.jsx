import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { SplitTypeField } from '../SplitTypeField';

import './styles.scss';

export const ActionBar = (props) => {
  const handleAddClick = () => {
    props.onAddSplit();
  }

  return (
    <Card className="action-bar">
      <div className="total-expense">
        <label className="total-expense__label">Total expense</label>
        <InputGroup className="total-expense__input">
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl />
        </InputGroup>
      </div>

      <div className="action-bar__divider" />

      <SplitTypeField
        className="action-bar__split-type-field"
        selectedSplitType={props.selectedSplitType}
        onSelect={props.onSplitTypeSelect}
      />

      <div className="action-bar__divider" />

      <div className="action-bar__add-split">
        <Button onClick={handleAddClick}>Add split</Button>
      </div>
    </Card>
  );
};
