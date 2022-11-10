import { useDispatch, useSelector } from "react-redux";
import { selectIsEQP, selectQuantities, clearHandlingFee, updateNetUnitCost, updateQtyPerBox, updateCostPerBox, updateBoxData, selectAmountOfBoxSizes, updateAmountOfBoxSizes, selectAmountOfHandlingFees, updateAmountOfHandlingFees } from "../main/mainSlice";
import PricingType from "./PricingType";
import Quantity from "./quantity/Quantity";
import UnitCost from "./UnitCost";
import UnitCode from "./UnitCode";
import SetupFee from "./SetupFee";
import SetupCode from "./SetupCode";
import HandlingType from "./handlingFees/HandlingType";
import { columnsArr } from "../../utils/helpers/helperArrays";
import QtyPerBox from "./box/QtyPerBox";
import CostPerBox from "./box/CostPerBox";
import HandlingFee from "./handlingFees/HandlingFee";
import ResetButton from "./ResetButton";


const Input = () => {
  const dispatch = useDispatch();
  const quantities = useSelector(selectQuantities);
  const amountOfBoxSizes = useSelector(selectAmountOfBoxSizes);
  const amountOfHandlingFees = useSelector(selectAmountOfHandlingFees);
  const isEQP = useSelector(selectIsEQP);

  return (
    <div id="input-container">
      <ResetButton/>
      <h2>Input</h2>
      <div id="input-grid">
        {/* Pricing Type */}
        <h6 className="pricing-type row-head hide-if-mobile">Pricing Type</h6>
        <h6 className="pricing-type row-head mobile-abbreviation">PT</h6>
        <PricingType />

        {/* QTY */}
        <h6 className="qty row-head">Qty</h6>
        {quantities.map((qty, i) => {
          return  <Quantity id={"qty-input-"+i} columnIndex={i} key={"qty-input-cont-"+i} />;
        })}

        {/* unit cost */}
        <h6 className="unit-cost row-head hide-if-mobile">Unit Cost</h6>
        <h6 className="unit-cost row-head mobile-abbreviation">UC</h6>
        {!isEQP ? columnsArr.map((col, i) => {
          return <UnitCost  id={"unit-cost-"+i} columnIndex={i} key={"unit-cost-"+i}  />;
        }) : <UnitCost id={"unit-cost-"+0} columnIndex={0} key={"unit-cost-"+0}  />
        }

        {/* Unit Code */}
        <h6 className="unit-code row-head hide-if-mobile">Unit Code</h6>
        <h6 className="unit-code row-head mobile-abbreviation">Code</h6>
        {<UnitCode id={"unit-code"+0} columnIndex={0} key={"unit-code"+0}  />
        }

        {/* Setup Fee */}
        <h6 className="setup-fee row-head hide-if-mobile">Setup Fee</h6>
        <h6 className="setup-fee row-head mobile-abbreviation">SF</h6>
        <SetupFee />
        {/* Setup Code */}
        <h6 className="setup-code row-head hide-if-mobile">Setup Code</h6>
        <h6 className="setup-code row-head mobile-abbreviation">SC</h6>
        <SetupCode />

        {/* Box Qty/Cost */}
        <h6 id="box-head" className="row-head">
          Box
        </h6>

        <p className="qty-pb hide-if-mobile">QTY-PB</p>
        <p className="qty-pb mobile-abbreviation">QPB</p>
        {Array.from(Array(amountOfBoxSizes)).map((box, i) => (<QtyPerBox id={"qty-pb-"+i} boxIndex={i} key={"qty-pb-"+i} />))}
        
        <p className="cost-pb hide-if-mobile">COST-PB</p>
        <p className="cost-pb mobile-abbreviation">CPB</p>
        {Array.from(Array(amountOfBoxSizes)).map((box, i) => (<CostPerBox id={"cost-pb-"+i} boxIndex={i} key={"cost-pb-"+i} />))}
        <button
          className="add-box box-btn"
          onClick={() => {
            if(amountOfBoxSizes < 5){
              dispatch(updateAmountOfBoxSizes({value: amountOfBoxSizes + 1}))
              dispatch(updateBoxData({}));
              dispatch(updateNetUnitCost({}));
            }
          }}
        >
          + <br className="mobile-text-break" /> Box
        </button>
        <button
          className="remove-box box-btn"
          onClick={() => {
            if(amountOfBoxSizes > 1){
              dispatch(updateAmountOfBoxSizes({value: amountOfBoxSizes - 1}))
              //clear box values upon box removal
              dispatch(updateQtyPerBox({boxIndex: (amountOfBoxSizes -1), value: 0}));
              dispatch(updateCostPerBox({boxIndex: (amountOfBoxSizes -1), value: 0}));
              //update box data accordingly
              dispatch(updateBoxData({}));
              dispatch(updateNetUnitCost({}));
            }
          }}
        >
          - <br className="mobile-text-break" /> Box
        </button>
        {/* Handling Fees */}

        <h6 className="row-head hide-if-mobile" id="handling-head">Handling Fees</h6>
        <h6 className="row-head mobile-abbreviation" id="handling-head">HFs</h6>
        <p className="handling title-type">TYPE</p>
        {Array.from(Array(amountOfHandlingFees)).map((h, i) => {
          return (
            <HandlingType
              handlingIndex={i}
              id={"handling-type-"+i}
              key={"handling-type-"+i}
            />
          );
        })}

        <p className="handling title-fee">FEE</p>

        {Array.from(Array(amountOfHandlingFees)).map((h, i) => {
          return (
            <HandlingFee
              handlingIndex={i}
              id={"handling-fee-"+i}
              key={"handling-fee-"+i}/>
          );
        })}

        <button
          className="add-fee handling-btn"
          onClick={() => {
            amountOfHandlingFees < 5 && dispatch(updateAmountOfHandlingFees({value: amountOfHandlingFees + 1}));
          }}
        >
          + <br className="mobile-text-break" /> Fee
        </button>
        <button
          className="remove-fee handling-btn"
          onClick={() => {
            if(amountOfHandlingFees > 1){
              selectAmountOfHandlingFees(amountOfHandlingFees - 1);
              dispatch(clearHandlingFee({handlingIndex: (amountOfHandlingFees - 1)}));
              dispatch(updateNetUnitCost({}));
            }
          }}
        >
          - <br className="mobile-text-break" /> Fee
        </button>
        {/* input-grid closer */}
      </div>
      {/* Input container closer */}
    </div>
  );
};

export default Input;