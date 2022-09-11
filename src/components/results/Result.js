import { columnsArr } from "../../assets/helpers/helperArrays";
import ProfitMargin from "./ProfitMargin";

const Results = () => {
  //the qtyInput array needs to be changed to auto update state based on qty-input 
  const qtyInput = [50,100,250,500,1000,2500,5000];
  return (
    <div id="results-container">
      <h2>Results</h2>
      <div id="results-grid">
        {/* blank div is here in order to assist with the grid placement of "pcs-head" */}
        <div id="blank-div"></div>
        {
          columnsArr.map((column, i) => {
            return <h5 className="pcs-head" id={"pcs-head-"+(i+1)} key={"pcs-head-"+(i+1)}>{qtyInput[i]+ " pcs"}</h5>
          })
        }
        <h6 className="result-head">Net Cost PU:</h6>

        {columnsArr.map((column, i) => {
          return (
            <div
              className="result-data net-cost-pu"
              id={"net-cost-pu-" + (i + 1)}
              key={"net-cost-pu-" + (i + 1)}
            >
              <p>data</p>
            </div>
          );
        })}

        <h6 className="result-head">Retail Price PU</h6>
        {columnsArr.map((column, i) => {
          return (
            <div
              className="result-data retail-price-pu"
              id={"retail-price-pu-" + (i + 1)}
              key={"retail-price-pu-" + (i + 1)}
            >
              <p>data</p>
            </div>
          );
        })}

        <h6 className="result-head">Retail Total</h6>
        {columnsArr.map((column, i) => {
          return (
            <div
              className="result-data retail-total"
              id={"retail-total-" + (i + 1)}
              key={"retail-total-" + (i + 1)}
            >
              <p>data</p>
            </div>
          );
        })}

        <h6 className="result-head">Total Profit</h6>
        {columnsArr.map((column, i) => {
          return (
            <div
              className="result-data total-profit"
              id={"total-profit-" + (i + 1)}
              key={"total-profit-" + (i + 1)}
            >
              <p>data</p>
            </div>
          );
        })}

        <h6 className="result-head">Profit Margin %</h6>
        {columnsArr.map((column, i) => {
          return <ProfitMargin id={"profit-margin-" + (i + 1)} key={"profit-margin-" + (i + 1)} />;
        })}

        {/* output-grid closer */}
      </div>
      {/* output-container closer */}
    </div>
  );
};

export default Results;
