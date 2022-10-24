import { useSelector } from "react-redux";
import { selectAdditionalData } from "../main/mainSlice";

const ExtraData = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const orderQty = additionalDataArr[columnIndex].quantity;
  const initialUnitCost = additionalDataArr[columnIndex].unitCost;
  //unit code
  const unitCodeDiscountRate = Number(additionalDataArr[columnIndex].unitCodeDiscountRate * 100);
  const unitCodeDiscountSum = additionalDataArr[columnIndex].unitCodeDiscountSum;
  const unitCostPostCodeDiscount = additionalDataArr[columnIndex].unitCostPostCodeDiscount;
  //EQP
  const eqpDiscountRate = additionalDataArr[columnIndex].eqpDiscountRate;
  const eqpDiscountSum = additionalDataArr[columnIndex].eqpDiscountSum;
  const discountedUnitCostPostEqp = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  //setup fee
  const initialSetupFee = additionalDataArr[columnIndex].setupFee;
  const setupCodeDiscountRate = Number(additionalDataArr[columnIndex].setupCodeDiscountRate * 100);
  const setupFeeDiscountSum = additionalDataArr[columnIndex].setupFeeDiscountSum;
  const discountedSetupFee = additionalDataArr[columnIndex].discountedSetupFee;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && (discountedSetupFeePerUnit + discountedUnitCostPostEqp);
  //handling fees
  const totalHandlingFees = additionalDataArr[columnIndex].totalHandlingFees;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && (unitCostPostDiscountedSF + handlingFeesPerUnit);
  //box cost pu
  const totalBoxCost = additionalDataArr[columnIndex].totalBoxCostWithFees;
  const boxCostPerUnit = totalBoxCost && Number(totalBoxCost / orderQty);
  const unitCostPostBoxCost = (boxCostPerUnit >= 0) && Number(unitCostPostHF + boxCostPerUnit);

  return (
    <div className="grid-child extra-data" id={id}>
      <div className="additional-data-text-container">
        {/* unit code discount */}
        <div className="extra-data-child">
            <p>u-code dis rate</p>
            <p className="colored-text">{unitCodeDiscountRate}%</p>
            <p>u-code dis sum</p>
            <p className="colored-text">{unitCodeDiscountSum && unitCodeDiscountSum.toFixed(2)}</p>
        </div>
        {/* EQP discount */}
        <div className="extra-data-child">
            <p>eqp dis rate</p>
            <p className="colored-text">{eqpDiscountRate}</p>
            <p>eqp dis sum</p>
            <p className="colored-text">{eqpDiscountSum && eqpDiscountSum}</p>
        </div>
        {/* setup fee */}
        <div className="extra-data-child">
            <p>initial setup-f</p>
            <p className="colored-text">{initialSetupFee && initialSetupFee.toFixed(2)}</p>
            <p>setup-f dis rate</p>
            <p className="colored-text">{setupCodeDiscountRate}%</p>
            <p>setup-f dis sum</p>
            <p className="colored-text">{setupFeeDiscountSum && setupFeeDiscountSum.toFixed(2)}</p>
            <p>disc setup-f</p>
            <p className="colored-text">{discountedSetupFee && discountedSetupFee.toFixed(2)}</p>
            <p>disc setup-f pu</p>
            <p className="colored-text">{discountedSetupFeePerUnit && discountedSetupFeePerUnit.toFixed(2)}</p>
        </div>
        {/* handling fees */}
        <div className="extra-data-child">
            <p>h-fees total</p>
            <p className="colored-text">{totalHandlingFees && totalHandlingFees.toFixed(2)}</p>
            <p>h-fees pu</p>
            <p className="colored-text">{handlingFeesPerUnit && handlingFeesPerUnit.toFixed(4)}</p>
        </div>



        <div className="extra-data-child">
            <p>box cost pu</p>
            <p className="colored-text">{boxCostPerUnit && boxCostPerUnit.toFixed(2)}</p>
        </div>


        
        <div className="extra-data-child">
            <h5>Unit Cost</h5>
            <p>initial u-cost</p>
            <p className="colored-text">{initialUnitCost && initialUnitCost.toFixed(2)}</p>
            <p></p>
            <p>post code dis</p>
            <p className="colored-text">{unitCostPostCodeDiscount && unitCostPostCodeDiscount.toFixed(2)}</p>
            <p>post eqp dis</p>
            <p className="colored-text">{discountedUnitCostPostEqp && discountedUnitCostPostEqp.toFixed(2)}</p>
            <p>post setup-f</p>
            <p className="colored-text">{unitCostPostDiscountedSF && unitCostPostDiscountedSF.toFixed(2)}</p>
            <p>post h-fees</p>
            <p className="colored-text">{unitCostPostHF && unitCostPostHF.toFixed(2)}</p>
            <p>post box cost</p>
            <p className="colored-text">{unitCostPostBoxCost && unitCostPostBoxCost.toFixed(2)}</p>

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
