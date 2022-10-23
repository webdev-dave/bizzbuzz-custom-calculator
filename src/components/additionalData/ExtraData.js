import { useSelector } from "react-redux";
import { selectAdditionalData } from "../main/mainSlice";

const ExtraData = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);

  const initialUnitCost = additionalDataArr[columnIndex].unitCost;
  const unitCodeDiscountRate = Number(additionalDataArr[columnIndex].unitCodeDiscountRate * 100);
  const unitCodeDiscountSum = additionalDataArr[columnIndex].unitCodeDiscountSum;
  const unitCostPostCodeDiscount = additionalDataArr[columnIndex].unitCostPostCodeDiscount;
  const eqpDiscountRate = additionalDataArr[columnIndex].eqpDiscountRate;
  const eqpDiscountSum = additionalDataArr[columnIndex].eqpDiscountSum;
  const discountedUnitCostPostEqp = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const initialSetupFee = additionalDataArr[columnIndex].setupFee;
  const setupCodeDiscountRate = additionalDataArr[columnIndex].setupCodeDiscountRate;
  const setupFeeDiscountSum = additionalDataArr[columnIndex].setupFeeDiscountSum;
  const discountedSetupFee = additionalDataArr[columnIndex].discountedSetupFee;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const totalHandlingFees = additionalDataArr[columnIndex].totalHandlingFees;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;

  return (
    <div className="grid-child extra-data" id={id}>
      <div className="additional-data-text-container">

        <div className="extra-data-child">
            <p>initial unit cost</p>
            <p className="colored-text">{initialUnitCost.toFixed(2)}</p>
        </div>
        <div className="extra-data-child">
            <p>unit code dis rate</p>
            <p className="colored-text">{unitCodeDiscountRate}%</p>
        </div>
        <div className="extra-data-child">
            <p>unit code dis sum</p>
            <p className="colored-text">{unitCodeDiscountSum && unitCodeDiscountSum.toFixed(2)}</p>
        </div>
        <div className="extra-data-child">
            <p>unit cost post code dis</p>
            <p className="colored-text">{unitCostPostCodeDiscount && unitCostPostCodeDiscount.toFixed(2)}</p>
        </div>
        <div className="extra-data-child">
            <p>eqp dis rate</p>
            <p className="colored-text">{eqpDiscountRate}</p>
        </div>
        <div className="extra-data-child">
            <p>eqp dis sum</p>
            <p className="colored-text">{eqpDiscountSum && eqpDiscountSum}</p>
        </div>
        <div className="extra-data-child">
            <p>unit cost post eqp dis</p>
            <p className="colored-text">{discountedUnitCostPostEqp && discountedUnitCostPostEqp.toFixed(2)}</p>
        </div>
        <div className="extra-data-child">
            <p></p>
            <p className="colored-text"></p>
        </div>
        <div className="extra-data-child">
            <p></p>
            <p className="colored-text"></p>
        </div>
        <div className="extra-data-child">
            <p></p>
            <p className="colored-text"></p>
        </div>
        <div className="extra-data-child">
            <p></p>
            <p className="colored-text"></p>
        </div>
        <div className="extra-data-child">
            <p></p>
            <p className="colored-text"></p>
        </div>
        

 
        
            

      
      </div>
    </div>
  );
};

export default ExtraData;
