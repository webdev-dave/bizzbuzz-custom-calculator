import { useState } from "react";

const SetupFee = () => {
  const [currentValue, setCurrentValue] = useState('');
  return (
    <input
      className="setup-fee"
      type="number"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
};

export default SetupFee;
