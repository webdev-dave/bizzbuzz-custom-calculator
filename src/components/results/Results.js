import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { selectQuantity } from "../main/mainSlice";
import NetUnitCost from "./nNetUnitCost";
import ProfitMargin from "./ProfitMargin";
import ProfitPu from "./ProfitPu";
import RetailPricePu from "./RetailPricePu";
import RetailTotal from "./RetailTotal";
import TotalProfit from "./TotalProfit";

const Results = () => {
  const qtyInput = useSelector(selectQuantity);
  return (
    <div id="results-container">
      <h2>Results</h2>
      <div id="results-grid">
        {/* blank div is here in order to assist with the grid placement of "pcs-head" */}
        <div id="blank-div"></div>
        {columnsArr.map((column, i) => {
          return (
            <h5 className="pcs-head" id={"pcs-head-" + i} key={"pcs-head-" + i}>
              {qtyInput[i] + " pcs"}
            </h5>
          );
        })}

        <h6 className="result-head">Net Unit Cost</h6>
        {columnsArr.map((column, i) => {
          return (
            <NetUnitCost
              columnIndex={i}
              id={"net-unit-cost-" + i}
              key={"net-unit-cost-" + i}
            />
          );
        })}

        <h6 className="result-head">Retail Price PU</h6>
        {columnsArr.map((column, i) => {
          return (
            <RetailPricePu
              columnIndex={i}
              id={"retail-price-pu-" + i}
              key={"retail-price-pu-" + i}
            />
          );
        })}

        <h6 className="result-head">Retail Total</h6>
        {columnsArr.map((column, i) => {
          return (
            <RetailTotal
              columnIndex={i}
              id={"retail-total-" + i}
              key={"retail-total-" + i}
            />
          );
        })}

        <h6 className="result-head">Profit Margin</h6>
        {columnsArr.map((column, i) => {
          return (
            <ProfitMargin
              columnIndex={i}
              id={"profit-margin-" + i}
              key={"profit-margin-" + i}
            />
          );
        })}

        <h6 className="result-head">Profit PU:</h6>

        {columnsArr.map((column, i) => {
          return (
            <ProfitPu
              columnIndex={i}
              id={"profit-pu-" + i}
              key={"profit-pu-" + i}
            />
          );
        })}

        <h6 className="result-head">Total Profit</h6>
        {columnsArr.map((column, i) => {
          return (
            <TotalProfit
              columnIndex={i}
              id={"total-profit-" + i}
              key={"total-profit-" + i}
            />
          );
        })}

        {/* output-grid closer */}
      </div>
      {/* output-container closer */}
    </div>
  );
};

export default Results;
