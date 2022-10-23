import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { selectQuantity } from "../main/mainSlice";
import BoxData from "./BoxData";
import TotalBoxCost from "./TotalBoxCost";

const AdditionalData = () => {
  const qtyInput = useSelector(selectQuantity);
  return (
    <div id="additional-data-container">
      <h2>Additional Data</h2>
      <div id="additional-data-grid">
        {/* blank div is here in order to assist with the grid placement of "pcs-head" */}
        <div id="blank-div"></div>
        {columnsArr.map((column, i) => {
          return (
            <h5 className="pcs-head" id={"pcs-head-" + i} key={"pcs-head-" + i}>
              {qtyInput[i] + " pcs"}
            </h5>
          );
        })}

        <h6 className="result-head">Total Box Cost</h6>
        {columnsArr.map((column, i) => {
          return (
            <TotalBoxCost
              columnIndex={i}
              id={"total-box-cost-" + i}
              key={"total-box-cost-" + i}
            />
          );
        })}

<h6 className="result-head">Box Data</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxData
              columnIndex={i}
              id={"box-data-" + i}
              key={"box-data-" + i}
            />
          );
        })}

        {/* output-container closer */}
      </div>
    </div>
  );
};

export default AdditionalData;
