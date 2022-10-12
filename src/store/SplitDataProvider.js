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
const newSplitsforEqually = (totalAmount, splits) => {
  const totalAmountInCents = totalAmount * 100;
  const splitsWithExtraPenny = totalAmountInCents % splits.length;
  const equalSplitAmount = +(totalAmount / splits.length).toFixed(2);

  const newSplits = splits.map((split, i) => {
    if (i + 1 <= splitsWithExtraPenny)
      return {
        ...split,
        value: +(equalSplitAmount + 0.01).toFixed(2),
      };

    return { ...split, value: equalSplitAmount };
  });
  return newSplits;
};

const splitReducer = (state, action) => {
  const newSplit = createNewSplit();
  /*-----------------------------------------------------*/
  ////////// SELECT TYPE ///////////////////
  /*-----------------------------------------------------*/
  if (action.type === "SELECT_TYPE") {
    const updatedSplitType = action.splitType;
    console.log(action.splitType);
    console.log(state);

    if (action.splitType === EQUALLY) {
      if (state.totalAmount === null)
        return { ...state, splitType: action.splitType };

      const newSplits = newSplitsforEqually(state.totalAmount, state.splits);

      return {
        ...state,
        splitType: updatedSplitType,
        splits: newSplits,
        splitsTotalAmount: getSplitsTotal(newSplits),
      };
    }
    return {
      ...state,
      splitType: action.splitType,
    };
  }
  /*-----------------------------------------------------*/
  ////////// AMOUNT ENTERED //////////////
  /*-----------------------------------------------------*/
  if (action.type === "AMOUNT_ENTERED") {
    if (action.splitType === EQUALLY) {
      if (state.splits < 1) {
        return {
          ...state,
          totalAmount: action.amount,
          splitsTotalAmount: action.amount,
        };
      }
      if (state.splits.length === 1) {
        console.log(state.splits);
        // the app rerenders a new entire split and does not save the previous name
        const newSplit =
          state.splits[0].value !== action.amount
            ? state.splits
            : [...initialSplits];
        newSplit[0].value = action.amount;
        newSplit[0].name = state.splits[0].name;
        console.log("new split:", newSplit[0].name);
        console.log("state name:", state.splits[0].name);

        return {
          ...state,
          totalAmount: action.amount,
          splits: newSplit,
          splitsTotalAmount: getSplitsTotal(newSplit),
        };
      } else {
        const newSplits = newSplitsforEqually(action.amount, state.splits);

        return {
          ...state,
          splits: newSplits,
          totalAmount: action.amount,
          splitsTotalAmount: getSplitsTotal(newSplits),
        };
      }
    }
    return {
      ...state,
      totalAmount: action.amount,
    };
  }
  /*-----------------------------------------------------*/
  ////////// EXACT INPUT ///////////////////
  /*-----------------------------------------------------*/
  if (action.type === "EXACT_INPUT") {
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
  if (action.type === "NAME_CHANGE") {
    const inputName = action.name;
    const newSplitsWithNames = state.splits.map((split, i) => {
      return {
        ...split,
        name: action.splitId === split.id ? inputName : split.name,
      };
    });

    return {
      ...state,
      splits: newSplitsWithNames,
    };
  }
  /*-----------------------------------------------------*/
  ////////// ADD +++++++++ ///////////////////
  /*-----------------------------------------------------*/
  if (action.type === "ADD") {
    const updatedSplits = state.splits.concat(newSplit);

    if (action.splitType === EQUALLY) {
      if (state.totalAmount === null)
        return { ...state, splits: updatedSplits };

      if (state.totalAmount != null) {
        const newSplits = newSplitsforEqually(state.totalAmount, updatedSplits);

        return {
          ...state,
          splits: newSplits,
        };
      }
      return {
        ...state,
        splits: updatedSplits,
      };
    }
  }
  /*-----------------------------------------------------*/
  ////////// REMOVE ------------- ///////////////////
  /*-----------------------------------------------------*/
  if (action.type === "REMOVE") {
    const updatedSplits = state.splits.filter(
      (split) => split.id !== action.id
    );

    if (action.splitType === EQUALLY) {
      if (state.totalAmount === null)
        return { ...state, splits: updatedSplits };

      if (state.totalAmount != null) {
        const newSplits = newSplitsforEqually(state.totalAmount, updatedSplits);

        return {
          ...state,
          splits: newSplits,
          splitsTotalAmount: getSplitsTotal(newSplits),
        };
      }
    }

    return {
      ...state,
      splits: updatedSplits,
    };
  }

  return defaultSplitDataState;
};

const SplitDataProvider = (props) => {
  const [splitState, dispatchSplitAction] = useReducer(
    splitReducer,
    defaultSplitDataState
  );

  const handleTotalEntered = (amount, splitType) => {
    const total = Number(amount).toFixed(2);

    dispatchSplitAction({ type: "AMOUNT_ENTERED", amount: total, splitType });
  };

  const handleSplitTypeSelect = (splitType) => {
    dispatchSplitAction({ type: "SELECT_TYPE", splitType });
  };

  const handleAddSplit = (splitType) => {
    dispatchSplitAction({ type: "ADD", splitType });
  };

  const handleRemoveSplit = (id, splitType) => {
    dispatchSplitAction({ type: "REMOVE", id, splitType });
  };

  const handleSplitFieldInputChange = (amount, splitId) => {
    dispatchSplitAction({ type: "EXACT_INPUT", amount, splitId });
  };

  const handleNameChange = (name, splitId) => {
    dispatchSplitAction({ type: "NAME_CHANGE", name, splitId });
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
    handleNameChange,
  };
  return (
    <SplitDataContext.Provider value={splitDataContext}>
      {props.children}
    </SplitDataContext.Provider>
  );
};

export default SplitDataProvider;
