import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { injectColumnQuantityHeaders } from "../../assets/helpers/helperFunctions";
import { selectQuantity } from "../main/mainSlice";
import BoxLogic from "./Box/BoxLogic";
import BoxFees from "./Box/BoxFees";
import UnitCodeDiscountRate from "./UnitCode/UnitCodeDiscountRate";
import UnitCodeDiscountSum from "./UnitCode/UnitCodeDiscountSum";
import EqpDiscountRate from "./EQP/EqpDiscountRate";
import EqpDiscountSum from "./EQP/EqpDiscountSum";
import InitialSetupFee from "./SetupFee/InitialSetupFee";
import SetupFeeDiscountSum from "./SetupFee/SetupFeeDiscountSum";
import SetupFeeDiscountRate from "./SetupFee/SetupFeeDiscountRate";
import SetupFeePostDiscount from "./SetupFee/SetupFeePostDiscount";
import SetupFeePerUnit from "./SetupFee/SetupFeePerUnit";
import HandlingFeesTotal from "./HandlingFees/HandlingFeesTotal";
import HandlingFeesPerUnit from "./HandlingFees/HandlingFeesPerUnit";
import InitialNUC from "./NetUnitCost/InitialNUC";
import CodeDiscountNUC from "./NetUnitCost/CodeDiscountNUC";
import EqpDiscountNUC from "./NetUnitCost/EqpDiscountNUC";
import SetupFeeNUC from "./NetUnitCost/SetupFeeNUC";
import HandlingFeesNUC from "./NetUnitCost/HandlingFeesNUC";
import BoxNUC from "./NetUnitCost/BoxNUC";
import TotalNUC from "./NetUnitCost/TotalNUC";
import BoxTotalPerUnit from "./Box/BoxTotalPerUnit";
import BoxCost from "./Box/BoxCost";
import TotalBoxCount from "./Box/TotalBoxCount";


const AdditionalData = () => {
  const quantitiesArr = useSelector(selectQuantity);

  return (
    <div id="additional-data-container" className="additional-data">
      <h2>Additional Data</h2>
      <div id="additional-data-grid">

        {/* -----------------------------------------------------------------------------------  Box */}
        <h5 className="sub-header box">Box</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}
        <h6 className="row-head">logic</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxLogic
              columnIndex={i}
              id={"box-logic-col-" + i}
              key={"box-logic-col-" + i}
            />
          );
        })}

        <h6 className="row-head">ttl count</h6>
        {columnsArr.map((column, i) => {
          return (
            <TotalBoxCount
              columnIndex={i}
              id={"box-count-col" + i}
              key={"box-count-col" + i}
            />
          );
        })}
        <h6 className="row-head">cost</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxCost
              columnIndex={i}
              id={"box-fees-col-" + i}
              key={"box-fees-col-" + i}
            />
          );
        })}
        <h6 className="row-head">fees</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxFees
              columnIndex={i}
              id={"box-fees-col-" + i}
              key={"box-fees-col-" + i}
            />
          );
        })}
        
        <h6 className="row-head">total pu</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxTotalPerUnit
              columnIndex={i}
              id={"box-total-pu-col-" + i}
              key={"box-total-pu-col-" + i}
            />
          );
        })}
        {/* ---------------------------------------------------------------------------------  Unit Code */}
        <h5 className="sub-header">Unit Code</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}
        <h6 className="row-head">dis rate</h6>
        {columnsArr.map((column, i) => {
          return (
            <UnitCodeDiscountRate
              columnIndex={i}
              id={"unit-code-discount-rate-col-" + i}
              key={"unit-code-discount-rate-col-" + i}
            />
          );
        })}
        <h6 className="row-head">dis sum</h6>
        {columnsArr.map((column, i) => {
          return (
            <UnitCodeDiscountSum
              columnIndex={i}
              id={"unit-code-discount-sum-col-" + i}
              key={"unit-code-discount-sum-col-" + i}
            />
          );
        })}



        {/* ---------------------------------------------------------------------------------  EQP */}
        <h5 className="sub-header">EQP</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}

        <h6 className="row-head">dis rate</h6>
        {columnsArr.map((column, i) => {
          return (
            <EqpDiscountRate
              columnIndex={i}
              id={"eqp-discount-rate-col-" + i}
              key={"eqp-discount-rate-col-" + i}
            />
          );
        })}

        <h6 className="row-head">dis sum</h6>
        {columnsArr.map((column, i) => {
          return (
            <EqpDiscountSum
              columnIndex={i}
              id={"eqp-discount-sum-col-" + i}
              key={"eqp-discount-sum-col-" + i}
            />
          );
        })}
        {/* ---------------------------------------------------------------------------------  Setup Fee */}
        <h5 className="sub-header">Setup Fee</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}


        <h6 className="row-head">initial</h6>
        {columnsArr.map((column, i) => {
          return (
            <InitialSetupFee
              columnIndex={i}
              id={"initial-setup-fee-col-" + i}
              key={"initial-setup-fee-col-" + i}
            />
          );
        })}
        <h6 className="row-head">dis rate</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeeDiscountRate
              columnIndex={i}
              id={"setup-fee-discount-rate-col-" + i}
              key={"setup-fee-discount-rate-col-" + i}
            />
          );
        })}
        <h6 className="row-head">dis sum</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeeDiscountSum
              columnIndex={i}
              id={"setup-fee-discount-sum-col-" + i}
              key={"setup-fee-discount-sum-col-" + i}
            />
          );
        })}
        <h6 className="row-head">plus dis</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeePostDiscount
              columnIndex={i}
              id={"setup-fee-plus-discount-col-" + i}
              key={"setup-fee-plus-discount-col-" + i}
            />
          );
        })}
        <h6 className="row-head">pu</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeePerUnit
              columnIndex={i}
              id={"setup-fee-pu-col-" + i}
              key={"setup-fee-pu-col-" + i}
            />
          );
        })}
        {/* ---------------------------------------------------------------------------------  Handling Fees */}
        <h5 className="sub-header">Handling Fees</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}

        <h6 className="row-head">total</h6>
        {columnsArr.map((column, i) => {
          return (
            <HandlingFeesTotal
              columnIndex={i}
              id={"total-handling-fees-col-" + i}
              key={"total-handling-fees-col-" + i}
            />
          );
        })}

        <h6 className="row-head">pu</h6>

        {columnsArr.map((column, i) => {
          return (
            <HandlingFeesPerUnit
              columnIndex={i}
              id={"handling-fees-pu-col-" + i}
              key={"handling-fees-pu-col-" + i}
            />
          );
        })}




        {/* ---------------------------------------------------------------------------------  Net Unit Cost */}
        <h5 className="sub-header">Net UC</h5>
        <div className="blank-head-column-div"></div>
        {injectColumnQuantityHeaders(columnsArr, quantitiesArr)}

        <h6 className="row-head">initial</h6>
        {columnsArr.map((column, i) => {
          return (
            <InitialNUC
              columnIndex={i}
              id={"initial-nuc-col-" + i}
              key={"initial-nuc-col-" + i}
            />
          );
        })}

        <h6 className="row-head">+ code dis</h6>

        {columnsArr.map((column, i) => {
          return (
            <CodeDiscountNUC
              columnIndex={i}
              id={"nuc-plus-code-discount-col-" + i}
              key={"nuc-plus-code-discount-col-" + i}
            />
          );
        })}

        <h6 className="row-head">+ eqp dis</h6>

        {columnsArr.map((column, i) => {
          return (
            <EqpDiscountNUC
              columnIndex={i}
              id={"nuc-plus-eqp-discount-col-" + i}
              key={"nuc-plus-eqp-discount-col-" + i}
            />
          );
        })}

        <h6 className="row-head">+ setup-f</h6>

        {columnsArr.map((column, i) => {
          return (
            <SetupFeeNUC
              columnIndex={i}
              id={"nuc-plus-setup-fee-col-" + i}
              key={"nuc-plus-setup-fee-col-" + i}
            />
          );
        })}
        
        <h6 className="row-head">+ h-fees</h6>

        {columnsArr.map((column, i) => {
          return (
            <HandlingFeesNUC
              columnIndex={i}
              id={"nuc-plus-handling-fees-col-" + i}
              key={"nuc-plus-handling-fees-col-" + i}
            />
          );
        })}

        <h6 className="row-head">+ box</h6>

        {columnsArr.map((column, i) => {
          return (
            <BoxNUC
              columnIndex={i}
              id={"nuc-plus-box-col-" + i}
              key={"nuc-plus-box-col-" + i}
            />
          );
        })}

        <h6 className="row-head">total</h6>

        {columnsArr.map((column, i) => {
          return (
            <TotalNUC
              columnIndex={i}
              id={"nuc-total-col-" + i}
              key={"nuc-total-col-" + i}
            />
          );
        })}



        {/* additional-data-container closer */}
      </div>
    </div>
  );
};

export default AdditionalData;
