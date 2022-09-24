import { forwardRef, useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlusMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EQUALLY, EXACT_AMOUNTS, PERCENTAGES, SHARES } from "../../constants";
import formatCurrency from "../../utils/formatCurrency";

import "./styles.scss";

export const SplitField = forwardRef((props, ref) => {
  const [input, setInput] = useState("");

  const withAdjustmentModifier =
    props.splitType === "Shares" ? "split-field--with-adjustment" : "";

  const handleRemoveClick = () => {
    props.onRemove();
  };

  return (
    <div className={`split-field ${withAdjustmentModifier}`} ref={ref}>
      <div className="split-field__index">{props.position}</div>

      <FormControl placeholder="Name" className="split-field__name" />

      {[EXACT_AMOUNTS, PERCENTAGES, SHARES].includes(props.splitType) && (
        <InputGroup className="split-field__input">
          {props.splitType === EXACT_AMOUNTS && (
            <InputGroup.Text>$</InputGroup.Text>
          )}

          <FormControl
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {props.splitType === PERCENTAGES && (
            <InputGroup.Text>%</InputGroup.Text>
          )}

          {props.splitType === SHARES && (
            <InputGroup.Text>share(s)</InputGroup.Text>
          )}
        </InputGroup>
      )}

      {props.splitType === SHARES && (
        <InputGroup className="split-field__adjustment">
          <InputGroup.Text className="split-field__adjustment-text">
            <FontAwesomeIcon icon={faPlusMinus} size="2xs" />$
          </InputGroup.Text>

          <FormControl placeholder="Adjustment" />
        </InputGroup>
      )}

      <Card className="split-field__amount">
        $
        {props.splitType === EQUALLY &&
          formatCurrency(props.totalExpense / props.splits.length)}
        {props.splitType === EXACT_AMOUNTS && input}
      </Card>

      <Button
        variant="link"
        className="split-field__remove"
        onClick={handleRemoveClick}>
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </div>
  );
});
