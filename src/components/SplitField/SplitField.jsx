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

  const [exactAmtInput, setExactAmtInput] = useState("");

  const withAdjustmentModifier =
    props.splitType === "Shares" ? "split-field--with-adjustment" : "";

  const handleRemoveClick = () => {
    props.onRemove();
  };

  const handleChange = (e) => {
    const inputId = props.id;
    console.log(inputId);
    splitState.handleSplitFieldInputChange(e.target.value, inputId);
  };

  const handleNameChange = (e) => {
    const inputId = props.id;
    splitState.handleNameChange(e.target.value, inputId);
  };

  return (
    <div className={`split-field ${withAdjustmentModifier}`} ref={ref}>
      <div className="split-field__index">{props.position}</div>

      <FormControl
        placeholder="Name"
        className="split-field__name"
        onChange={handleNameChange}
        value={props.name}
      />

      {[EXACT_AMOUNTS, PERCENTAGES, SHARES].includes(props.splitType) && (
        <InputGroup className="split-field__input">
          {splitState.splitType === EXACT_AMOUNTS && (
            <InputGroup.Text>$</InputGroup.Text>
          )}

          <FormControl
            onChange={handleChange}
            value={props.value}
            key={props.key}
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
          (splitState.totalAmount === null ? "0" : props.value)}
        {splitState.splitType === EXACT_AMOUNTS && props.value}
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
