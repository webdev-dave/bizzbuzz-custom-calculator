import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { selectQuantity } from "../main/mainSlice";
import BoxConfiguration from "./Box/BoxConfiguration";
import BoxCount from "./Box/BoxCount";
import BoxFees from "./Box/BoxFees";
import TotalBoxCost from "./Box/TotalBoxCost";
import ExtraData from "./ExtraData";

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
              id={"total-box-cost-col-" + i}
              key={"total-box-cost-col" + i}
            />
          );
        })}

        <h6 className="result-head">Box cnfg</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxConfiguration
              columnIndex={i}
              id={"box-configuration-col-" + i}
              key={"box-configuration-col-" + i}
            />
          );
        })}
        <h6 className="result-head">Box Count</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxCount
              columnIndex={i}
              id={"box-count-col" + i}
              key={"box-count-col" + i}
            />
          );
        })}
        <h6 className="result-head">Box Fees</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxFees
              columnIndex={i}
              id={"box-fees-col-" + i}
              key={"box-fees-col-" + i}
            />
          );
        })}

        <h6 className="result-head">Extra Data (PU)</h6>
        {columnsArr.map((column, i) => {
          return (
            <ExtraData
              columnIndex={i}
              id={"extra-data-col-" + i}
              key={"extra-data-col-" + i}
            />
          );
        })}

        {/* additional-data-container closer */}
      </div>
    </div>
  );
};

export default AdditionalData;
