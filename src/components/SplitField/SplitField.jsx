import { forwardRef } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

export const SplitField = forwardRef((props, ref) => {
  const withAdjustmentModifier =
    props.splitType === 'Shares' ? 'split-field--with-adjustment' : '';

  const handleRemoveClick = () => {
    props.onRemove();
  };

  return (
    <div className={`split-field ${withAdjustmentModifier}`} ref={ref}>
      <div className="split-field__index">{props.position}</div>

      <FormControl placeholder="Name" className="split-field__name" />

      {['Exact amounts', 'Percentages', 'Shares'].includes(props.splitType) && (
        <InputGroup className="split-field__input">
          {['Equally', 'Exact amounts'].includes(props.splitType) && (
            <InputGroup.Text>$</InputGroup.Text>
          )}

          <FormControl />

          {props.splitType === 'Percentages' && (
            <InputGroup.Text>%</InputGroup.Text>
          )}

          {props.splitType === 'Shares' && (
            <InputGroup.Text>share(s)</InputGroup.Text>
          )}
        </InputGroup>
      )}

      {props.splitType === 'Shares' && (
        <InputGroup className="split-field__adjustment">
          <InputGroup.Text className="split-field__adjustment-text">
            <FontAwesomeIcon icon={faPlusMinus} size="2xs" />$
          </InputGroup.Text>

          <FormControl placeholder="Adjustment" />
        </InputGroup>
      )}

      <Card className="split-field__amount">$0</Card>

      <Button
        variant="link"
        className="split-field__remove"
        onClick={handleRemoveClick}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </div>
  );
});
