import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { selectQuantity } from "../main/mainSlice";
import BoxLogic from "./Box/BoxLogic";
import BoxCount from "./Box/BoxCount";
import BoxFees from "./Box/BoxFees";
import BoxCostPerUnit from "./Box/BoxCostPerUnit";
import NetUnitCostAD from "./NetUnitCostAD";


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

        <h6 className="result-head">Box Logic</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxLogic
              columnIndex={i}
              id={"box-logic-col-" + i}
              key={"box-logic-col-" + i}
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
        
        <h6 className="result-head">Box Cost PU</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxCostPerUnit
              columnIndex={i}
              id={"box-cost-pu-col-" + i}
              key={"box-cost-pu-col-" + i}
            />
          );
        })}

        <h6 className="result-head">Net-UC</h6>
        {columnsArr.map((column, i) => {
          return (
            <NetUnitCostAD
              columnIndex={i}
              id={"net-ucad-col-" + i}
              key={"net-ucad-col-" + i}
            />
          );
        })}

        {/* additional-data-container closer */}
      </div>
    </div>
  );
};

export default AdditionalData;
