import { EQUALLY, EXACT_AMOUNTS, PERCENTAGES, SHARES } from "../../constants";
import "./styles.scss";
import { useSplitDataContext } from "../../store/split-data-context";

const splitTypes = [EQUALLY, EXACT_AMOUNTS, PERCENTAGES, SHARES];

export const SplitTypeField = (props) => {
  const splitState = useSplitDataContext();

  const getSelectedModifier = (type) => {
    return type === splitState.splitType ? "split-type__option--selected" : "";
  };

  const handleClickFor = (type) => () => {
    splitState.handleSplitTypeSelect(type);
  };

  return (
    <div className={`split-type ${props.className}`}>
      <label className="split-type__label">Split by</label>
      <div className="split-type__options">
        {splitTypes.map((type) => (
          <button
            key={type}
            className={`split-type__option ${getSelectedModifier(type)}`}
            onClick={handleClickFor(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
