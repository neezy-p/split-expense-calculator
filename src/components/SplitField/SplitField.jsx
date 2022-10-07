import { forwardRef, useState, useContext } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EQUALLY, EXACT_AMOUNTS, PERCENTAGES, SHARES } from "../../constants";
import SplitDataContext from "../../store/split-data-context";

import "./styles.scss";

export const SplitField = forwardRef((props, ref) => {
  const splitState = useContext(SplitDataContext);
  const [exactAmtInput, setExactAmtInput] = useState([""]);

  const withAdjustmentModifier =
    props.splitType === "Shares" ? "split-field--with-adjustment" : "";

  const handleRemoveClick = () => {
    props.onRemove();
  };

  const handleSplitFieldChange = (e) => {
    props.onSplitFieldChange(e.target.value);
  };

  return (
    <div className={`split-field ${withAdjustmentModifier}`} ref={ref}>
      <div className="split-field__index">{props.position}</div>

      <FormControl placeholder="Name" className="split-field__name" />

      {[EXACT_AMOUNTS, PERCENTAGES, SHARES].includes(props.splitType) && (
        <InputGroup className="split-field__input">
          {splitState.splitType === EXACT_AMOUNTS && (
            <InputGroup.Text>$</InputGroup.Text>
          )}

          <FormControl
            onChange={handleSplitFieldChange}
            value={exactAmtInput}
          />

          {splitState.splitType === PERCENTAGES && (
            <InputGroup.Text>%</InputGroup.Text>
          )}

          {splitState.splitType === SHARES && (
            <InputGroup.Text>share(s)</InputGroup.Text>
          )}
        </InputGroup>
      )}

      {splitState.splitType === SHARES && (
        <InputGroup className="split-field__adjustment">
          <InputGroup.Text className="split-field__adjustment-text">
            <FontAwesomeIcon icon={faPlusMinus} size="2xs" />$
          </InputGroup.Text>

          <FormControl placeholder="Adjustment" />
        </InputGroup>
      )}

      <Card className="split-field__amount">
        $
        {splitState.splitType === EQUALLY &&
          (splitState.totalAmount === null ? "0" : splitState.splitsPerPerson)}
        {splitState.splitType === EXACT_AMOUNTS && exactAmtInput}
      </Card>

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
