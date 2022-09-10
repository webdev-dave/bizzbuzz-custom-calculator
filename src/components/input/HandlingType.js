import { useState } from "react";

const HandlingType = ({defaultType}) => {
  const types = ["box", "rush", "misc"];
  const [type, setType] = useState(types[defaultType]);
  return (
    <select
      className="handling-fees-selector"
      value={type}
      onChange={(e) => setType(e.target.value)}
    >
      {types.map((type) => {
        return (
          <option value={type} key={type}>
            {type}
          </option>
        );
      })}
    </select>
  );
};

export default HandlingType;
