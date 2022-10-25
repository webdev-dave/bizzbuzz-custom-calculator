import { useSelector } from "react-redux";
import { columnsArr } from "../../assets/helpers/helperArrays";
import { selectQuantity } from "../main/mainSlice";
import BoxLogic from "./Box/BoxLogic";
import BoxCount from "./Box/BoxCount";
import BoxFees from "./Box/BoxFees";
import BoxCostPerUnit from "./Box/BoxCostPerUnit";
import NetUnitCostAD from "./NetUnitCostAD";
import UnitCodeDiscountRate from "./UnitCode/UnitCodeDiscountRate";
import UnitCodeDiscountSum from "./UnitCode/UnitCodeDiscountSum";
import EqpDiscountRate from "./EQP/EqpDiscountRate";
import EqpDiscountSum from "./EQP/EqpDiscountSum";
import InitialSetupFee from "./SetupFee/InitialSetupFee";
import SetupFeeDiscountSum from "./SetupFee/SetupFeeDiscountSum";
import SetupFeeDiscountRate from "./SetupFee/SetupFeeDiscountRate";
import SetupFeePostDiscount from "./SetupFee/SetupFeePostDiscount";
import SetupFeePerUnit from "./SetupFee/SetupFeePerUnit";



const AdditionalData = () => {
  const qtyInput = useSelector(selectQuantity);
  return (
    <div id="additional-data-container" className="additional-data">
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
 
        {/* -----------------------------------------------------------------------------------  Box */}
        <h5 className="sub-header">Box</h5>
        <h6 className="row-head">Box Logic</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxLogic
              columnIndex={i}
              id={"box-logic-col-" + i}
              key={"box-logic-col-" + i}
            />
          );
        })}
        <h6 className="row-head">Box Count</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxCount
              columnIndex={i}
              id={"box-count-col" + i}
              key={"box-count-col" + i}
            />
          );
        })}
        <h6 className="row-head">Box Fees</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxFees
              columnIndex={i}
              id={"box-fees-col-" + i}
              key={"box-fees-col-" + i}
            />
          );
        })}
        
        <h6 className="row-head">Box Cost PU</h6>
        {columnsArr.map((column, i) => {
          return (
            <BoxCostPerUnit
              columnIndex={i}
              id={"box-cost-pu-col-" + i}
              key={"box-cost-pu-col-" + i}
            />
          );
        })}
        {/* ---------------------------------------------------------------------------------  Unit Code */}
        <h5 className="sub-header">Unit Code</h5>
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
        <h6 className="row-head">dis rate</h6>

        {columnsArr.map((column, i) => {
          return (
            <EqpDiscountRate
              columnIndex={i}
              id={"eqp-discount-rate-col-" + i}
              key={"eqp-code-discount-rate-col-" + i}
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

        <h6 className="row-head">initial</h6>
        {columnsArr.map((column, i) => {
          return (
            <InitialSetupFee
              columnIndex={i}
              id={"-col-" + i}
              key={"-col-" + i}
            />
          );
        })}
        <h6 className="row-head">dis rate</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeeDiscountRate
              columnIndex={i}
              id={"-col-" + i}
              key={"-col-" + i}
            />
          );
        })}
        <h6 className="row-head">dis sum</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeeDiscountSum
              columnIndex={i}
              id={"-col-" + i}
              key={"-col-" + i}
            />
          );
        })}
        <h6 className="row-head">post dis</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeePostDiscount
              columnIndex={i}
              id={"-col-" + i}
              key={"-col-" + i}
            />
          );
        })}
        <h6 className="row-head">pu</h6>
        {columnsArr.map((column, i) => {
          return (
            <SetupFeePerUnit
              columnIndex={i}
              id={"-col-" + i}
              key={"-col-" + i}
            />
          );
        })}


        {/* ---------------------------------------------------------------------------------  Handling Fees */}
        <h5 className="sub-header">Handling Fees</h5>

        <h6 className="row-head">999</h6>
        {/* {columnsArr.map((column, i) => {
          return (
            <999
              columnIndex={i}
              id={"unit-code-discount-sum-col-" + i}
              key={"unit-code-discount-sum-col-" + i}
            />
          );
        })} */}

        <h6 className="row-head">999</h6>

        {/* {columnsArr.map((column, i) => {
          return (
            <999
              columnIndex={i}
              id={"unit-code-discount-sum-col-" + i}
              key={"unit-code-discount-sum-col-" + i}
            />
          );
        })} */}
        {/* ---------------------------------------------------------------------------------  Net Unit Cost */}
        <h5 className="sub-header">Net UC</h5>

        <h6 className="row-head">999</h6>
        {/* {columnsArr.map((column, i) => {
          return (
            <999
              columnIndex={i}
              id={"unit-code-discount-sum-col-" + i}
              key={"unit-code-discount-sum-col-" + i}
            />
          );
        })} */}

        <h6 className="row-head">999</h6>

        {/* {columnsArr.map((column, i) => {
          return (
            <999
              columnIndex={i}
              id={"unit-code-discount-sum-col-" + i}
              key={"unit-code-discount-sum-col-" + i}
            />
          );
        })} */}


        



        <h6 className="row-head">Net-UC</h6>
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
