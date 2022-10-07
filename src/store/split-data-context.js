import React from "react";

const SplitDataContext = React.createContext({
  splitType: "",
  splits: [],
  totalAmount: null,
  totalAmountRemaining: "",
  splitsPerPerson: "",
  splitsTotalAmount: "0",
  handleTotalEntered: (amount) => {},
  handleSplitTypeSelect: (type) => {},
  handleAddSplit: () => {},
  handleRemoveSplit: () => {},
});

export default SplitDataContext;
