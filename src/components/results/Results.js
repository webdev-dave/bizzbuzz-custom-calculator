import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { injectColumnQuantityHeaders } from "../../assets/helpers/helperFunctions";
import { selectQuantity } from "../main/mainSlice";
import NetUnitCost from "./NetUnitCost";
import ProfitMargin from "./ProfitMargin";
import ProfitPu from "./ProfitPu";
import RetailPricePu from "./RetailPricePu";
import RetailTotal from "./RetailTotal";
import TotalProfit from "./TotalProfit";

const Results = () => {
  const quantitiesArr = useSelector(selectQuantity);
  return (
    <div id="results-container">
      <h2>Results</h2>
      <div id="results-grid">
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}

        <h6 className="row-head">Net Unit Cost</h6>
        {columnsArr.map((column, i) => {
          return (
            <NetUnitCost
              columnIndex={i}
              id={"net-unit-cost-" + i}
              key={"net-unit-cost-" + i}
            />
          );
        })}

        <h6 className="row-head">Retail Price PU</h6>
        {columnsArr.map((column, i) => {
          return (
            <RetailPricePu
              columnIndex={i}
              id={"retail-price-pu-" + i}
              key={"retail-price-pu-" + i}
            />
          );
        })}

        <h6 className="row-head">Retail Total</h6>
        {columnsArr.map((column, i) => {
          return (
            <RetailTotal
              columnIndex={i}
              id={"retail-total-" + i}
              key={"retail-total-" + i}
            />
          );
        })}

        <h6 className="row-head">Profit Margin</h6>
        {columnsArr.map((column, i) => {
          return (
            <ProfitMargin
              columnIndex={i}
              id={"profit-margin-" + i}
              key={"profit-margin-" + i}
            />
          );
        })}

        <h6 className="row-head">Profit PU:</h6>

        {columnsArr.map((column, i) => {
          return (
            <ProfitPu
              columnIndex={i}
              id={"profit-pu-" + i}
              key={"profit-pu-" + i}
            />
          );
        })}

        <h6 className="row-head">Total Profit</h6>
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
