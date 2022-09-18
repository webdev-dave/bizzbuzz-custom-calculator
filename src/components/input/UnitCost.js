import { useSelector, useDispatch } from "react-redux";
import { selectIsEQP, selectUnitCost, updateUnitCost } from "../main/mainSlice";

const UnitCost = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const unitCostArr = useSelector(selectUnitCost);
  const isEQP = useSelector(selectIsEQP);

  const unitCost = unitCostArr[columnIndex];

  const handleChange = (e) => {
    dispatch(
      updateUnitCost({ columnIndex: columnIndex, value: e.target.value, isEQP: isEQP })
    );
  };
  return (
    <div className={`unit-cost ${isEQP ? "max-span" : ""}`} id={id}>
      <label htmlFor="unit-cost-1"></label>
      <input
        type="number"
        id="unit-cost-1"
        value={unitCost}
        onChange={handleChange}
      />
    </div>
  );
};

export default UnitCost;
