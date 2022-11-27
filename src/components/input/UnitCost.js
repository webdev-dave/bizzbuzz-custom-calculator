import { useSelector, useDispatch } from "react-redux";
import { handleFocus, removeUnnecessaryZeros } from "../../utils/helpers/helperFunctions";
import { selectIsEQP, selectUnitCost, updateNetUnitCost, updateUnitCost } from "../main/mainSlice";

const UnitCost = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const unitCostArr = useSelector(selectUnitCost);
  const isEQP = useSelector(selectIsEQP);
  const unitCost = unitCostArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateUnitCost({ columnIndex: columnIndex, value: e.target.value, isEQP: isEQP })
    );
    //update netUnitCost based on the new Unit Cost Value 
    dispatch(updateNetUnitCost({}));
  };
  return (
    <div className={`unit-cost ${isEQP ? "max-span" : ""}`} id={id}>
      <label htmlFor="unit-cost-1"></label>
      <input
        type="number"
        id="unit-cost-1"
        className="input-data"
        value={removeUnnecessaryZeros(unitCost)}
        onChange={handleChange}
        onFocus={handleFocus}
        onWheel={(e) => e.target.blur()}
        tabIndex="9"
      />
    </div>
  );
};

export default UnitCost;
