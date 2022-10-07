import React, { createRef, useReducer } from "react";
import SplitDataContext from "./split-data-context";
import generateUuid from "../utils/generateUuid";
import { EQUALLY, EXACT_AMOUNTS, PERCENTAGES, SHARES } from "../constants";

const createNewSplit = () => ({
  id: generateUuid(),
  name: "",
  nodeRef: createRef(null),
  value: "",
});

const initialSplits = [createNewSplit()];

const defaultSplitDataState = {
  splitType: EQUALLY,
  splits: initialSplits,
  totalAmount: null,
  totalAmountRemaining: "",
  splitsPerPerson: "",
  splitsTotalAmount: "0",
};

const getSplitsTotal = (splits) => {
  const total = splits
    .map((split) => Number(split.value))
    .reduce((acc, cur) => (cur += acc), 0);

  return total;
};

const splitReducer = (state, action) => {
  const newSplit = createNewSplit();

  if (action.type === "SELECT_TYPE") {
    let dummyObj;
    const updatedSplitType = action.splitType;
    console.log(action.splitType);

    if (action.splitType === EQUALLY) {
      dummyObj = {
        ...state,
        splitType: updatedSplitType,
      };
    }
    if (action.splitType === EXACT_AMOUNTS) {
      dummyObj = {
        ...state,
        splitType: updatedSplitType,
        // totalAmountRemaining: console.log("you got here222222222"),
      };
    }
    if (action.splitType === PERCENTAGES) {
      dummyObj = {
        ...state,
        splitType: updatedSplitType,
      };
    }
    if (action.splitType === SHARES) {
      dummyObj = {
        ...state,
        splitType: updatedSplitType,
      };
    }
    return dummyObj;
  }

  if (action.type === "AMOUNT_ENTERED") {
    const updatedAmount = action.amount;
    console.log(updatedAmount);

    return {
      ...state,
      totalAmount: updatedAmount,
      splitsPerPerson:
        state.splits.length < 1
          ? "$0"
          : (updatedAmount / state.splits.length).toFixed(2),
      splitsTotalAmount: state.splitType === EQUALLY ? action.amount : 0,
    };
  }

  if (action.type === "EXACT_INPUT") {
    let dummyObj;
    const inputAmt = action.amount;
    const newSplitsWithValues = state.splits.map((split, i) => {
      return {
        ...split,
        value: action.splitId === split.id ? inputAmt : split.value,
      };
    });
    console.log(newSplitsWithValues);

    return {
      ...state,
      splits: newSplitsWithValues,
      splitsTotalAmount: getSplitsTotal(newSplitsWithValues),
    };
  }

  if (action.type === "ADD") {
    let dummyObj; // is undefined === console.log(dummyObj);

    const updatedSplits = state.splits.concat(newSplit);
    const updatedAmtOfPeople = updatedSplits.length;

    if (action.splitType === EQUALLY) {
      const updatedSplitsPerPerson = (
        state.totalAmount / updatedAmtOfPeople
      ).toFixed(2);

      dummyObj = {
        ...state,
        splits: updatedSplits,
        amtOfPeople: updatedAmtOfPeople,
        splitsPerPerson: updatedSplitsPerPerson,
      };

      return dummyObj === undefined
        ? { ...state, splits: updatedSplits }
        : dummyObj;
    }
  }

  if (action.type === "REMOVE") {
    let dummyObj;
    console.log(dummyObj);
    const updatedSplits = state.splits.filter(
      (split) => split.id !== action.id
    );
    const updatedAmtOfPeople = updatedSplits.length;
    const updatedSplitsPerPerson = (
      state.totalAmount / updatedSplits.length
    ).toFixed(2);
    console.log(action.splitType);

    if (action.splitType === EQUALLY) {
      const updatedSplitsPerPerson = (
        state.totalAmount / updatedAmtOfPeople
      ).toFixed(2);
      console.log("you made it to remove");

      dummyObj = {
        ...state,
        splits: updatedSplits,
        amtOfPeople: updatedAmtOfPeople,
        splitsPerPerson: updatedSplitsPerPerson,
      };
    }

    return dummyObj === undefined
      ? {
          ...state,
          splits: updatedSplits,
          amtOfPeople: updatedAmtOfPeople,
        }
      : dummyObj;
  }

  return defaultSplitDataState;
};

const SplitDataProvider = (props) => {
  const [splitState, dispatchSplitAction] = useReducer(
    splitReducer,
    defaultSplitDataState
  );

  const handleTotalEntered = (amount) => {
    const total = Number(amount).toFixed(2);

    dispatchSplitAction({ type: "AMOUNT_ENTERED", amount: total });
  };

  const handleSplitTypeSelect = (splitType) => {
    dispatchSplitAction({ type: "SELECT_TYPE", splitType });
  };

  const handleAddSplit = (splitType) => {
    dispatchSplitAction({ type: "ADD", splitType });
  };

  const handleRemoveSplit = (id, splitType) => {
    console.log(splitType);
    dispatchSplitAction({ type: "REMOVE", id, splitType });
  };

  const handleSplitFieldInputChange = (amount, splitId) => {
    dispatchSplitAction({ type: "EXACT_INPUT", amount, splitId });
    console.log(amount, splitId);
  };

  const splitDataContext = {
    splitType: splitState.splitType,
    splits: splitState.splits,
    totalAmount: splitState.totalAmount,
    totalAmountRemaining: splitState.totalAmountRemaining,
    splitsPerPerson: splitState.splitsPerPerson,
    splitsTotalAmount: splitState.splitsTotalAmount,
    handleTotalEntered,
    handleSplitTypeSelect,
    handleAddSplit,
    handleRemoveSplit,
    handleSplitFieldInputChange,
  };
  return (
    <SplitDataContext.Provider value={splitDataContext}>
      {props.children}
    </SplitDataContext.Provider>
  );
};

export default SplitDataProvider;
