import { useSelector } from "react-redux";
import { selectAdditionalData } from "../main/mainSlice";

const NetUnitCostAD = ({ id, columnIndex }) => {
  const additionalDataArr = useSelector(selectAdditionalData);
  const orderQty = additionalDataArr[columnIndex].quantity;
  //unit code
  const unitCodeDiscountRate = Number(additionalDataArr[columnIndex].unitCodeDiscountRate * 100);
  const unitCodeDiscountSum = additionalDataArr[columnIndex].unitCodeDiscountSum;
  //EQP
  const eqpDiscountRate = additionalDataArr[columnIndex].eqpDiscountRate;
  const eqpDiscountSum = additionalDataArr[columnIndex].eqpDiscountSum;
  //setup fee
  const initialSetupFee = additionalDataArr[columnIndex].setupFee;
  const setupCodeDiscountRate = Number(additionalDataArr[columnIndex].setupCodeDiscountRate * 100);
  const setupFeeDiscountSum = additionalDataArr[columnIndex].setupFeeDiscountSum;
  const discountedSetupFee = additionalDataArr[columnIndex].discountedSetupFee;
  const discountedSetupFeePerUnit = additionalDataArr[columnIndex].discountedSetupFeePerUnit;
  //handling fees
  const totalHandlingFees = additionalDataArr[columnIndex].totalHandlingFees;
  const handlingFeesPerUnit = additionalDataArr[columnIndex].handlingFeesPerUnit;
  //box cost pu
  const totalBoxCost = additionalDataArr[columnIndex].totalBoxCostWithFees;
  const boxCostPerUnit = totalBoxCost && Number(totalBoxCost / orderQty);
  //unit cost
  const initialUnitCost = additionalDataArr[columnIndex].unitCost;
  const unitCostPostCodeDiscount = additionalDataArr[columnIndex].unitCostPostCodeDiscount;
  const unitCostPostEqpDiscount = additionalDataArr[columnIndex].discountedUnitCostPostEqp;
  const unitCostPostDiscountedSF = (discountedSetupFeePerUnit >= 0) && (discountedSetupFeePerUnit + unitCostPostEqpDiscount);
  const unitCostPostHF = (handlingFeesPerUnit >= 0) && (unitCostPostDiscountedSF + handlingFeesPerUnit);
  const unitCostPostBoxCost = (boxCostPerUnit >= 0) && Number(unitCostPostHF + boxCostPerUnit);
  

  return (
    <div className="grid-child extra-data" id={id}>
      <div className="additional-data-text-container">
        {/* unit code discount */}
        <div className="net-ucad-child">
            <h6>Unit Code</h6>
            <p>u-code dis rate</p>
            <p className="colored-text">{unitCodeDiscountRate}%</p>
            <p>u-code dis sum</p>
            <p className="colored-text">{unitCodeDiscountSum && unitCodeDiscountSum.toFixed(2)}</p>
        </div>
        {/* EQP discount */}
        <div className="net-ucad-child">
            <h6>EQP</h6>
            <p>eqp dis rate</p>
            <p className="colored-text">{eqpDiscountRate}</p>
            <p>eqp dis sum</p>
            <p className="colored-text">{eqpDiscountSum && eqpDiscountSum}</p>
        </div>
        {/* setup fee */}
        <div className="net-ucad-child">
            <h6>Setup Fee</h6>
            <p>initial</p>
            <p className="colored-text">{initialSetupFee && initialSetupFee.toFixed(2)}</p>
            <p>dis rate</p>
            <p className="colored-text">{setupCodeDiscountRate}%</p>
            <p>dis sum</p>
            <p className="colored-text">{setupFeeDiscountSum && setupFeeDiscountSum.toFixed(2)}</p>
            <p>post dis</p>
            <p className="colored-text">{discountedSetupFee && discountedSetupFee.toFixed(2)}</p>
            <p>pu</p>
            <p className="colored-text">{discountedSetupFeePerUnit && discountedSetupFeePerUnit.toFixed(2)}</p>
        </div>
        {/* handling fees */}
        <div className="net-ucad-child">
            <h6>Handling Fees</h6>
            <p>h-fees total</p>
            <p className="colored-text">{totalHandlingFees && totalHandlingFees.toFixed(2)}</p>
            <p>h-fees pu</p>
            <p className="colored-text">{handlingFeesPerUnit && handlingFeesPerUnit.toFixed(4)}</p>
        </div>



        <div className="net-ucad-child">
            <h6>Box Cost</h6>
            <p>PU</p>
            <p className="colored-text">{boxCostPerUnit && boxCostPerUnit.toFixed(2)}</p>
        </div>


        {/* unit cost */}
        <div className="net-ucad-child">
            <h6>Unit Cost</h6>
            <p>initial</p>
            <p className="colored-text">{initialUnitCost && initialUnitCost.toFixed(2)}</p>
            <p></p>
            <p>post code dis</p>
            <p className="colored-text">{unitCostPostCodeDiscount && unitCostPostCodeDiscount.toFixed(2)}</p>
            <p>post eqp dis</p>
            <p className="colored-text">{unitCostPostEqpDiscount && unitCostPostEqpDiscount.toFixed(2)}</p>
            <p>post setup-f</p>
            <p className="colored-text">{unitCostPostDiscountedSF && unitCostPostDiscountedSF.toFixed(2)}</p>
            <p>post h-fees</p>
            <p className="colored-text">{unitCostPostHF && unitCostPostHF.toFixed(2)}</p>
            <p>post box cost</p>
            <p className="colored-text">{unitCostPostBoxCost && unitCostPostBoxCost.toFixed(2)}</p>

            <p></p>
            <p className="colored-text"></p>
        </div>


        <div className="net-ucad-child">
            <p></p>
            <p className="colored-text"></p>
        </div>

        

 
        
            

      
      </div>
    </div>
  );
};

export default NetUnitCostAD;
