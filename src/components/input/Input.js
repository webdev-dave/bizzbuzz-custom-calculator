import { useDispatch, useSelector } from "react-redux";
import { selectIsEQP, selectQuantity, clearHandlingFee, updateNetUnitCost, updateQtyPerBox, updateCostPerBox, updateBoxData } from "../main/mainSlice";
import PricingType from "./PricingType";
import Quantity from "./Quantity";
import UnitCost from "./UnitCost";
import UnitCode from "./UnitCode";
import SetupFee from "./SetupFee";
import SetupCode from "./SetupCode";
import HandlingType from "./HandlingType";
import { useState } from "react";
import { columnsArr } from "../../assets/helpers/helperArrays";
import QtyPerBox from "./QtyPerBox";
import CostPerBox from "./CostPerBox";
import HandlingFee from "./HandlingFee";


const Input = () => {
  const dispatch = useDispatch();
  const quantities = useSelector(selectQuantity);
  
  const [boxAmount, setBoxAmount] = useState(3);
  const [handlingAmount, setHandlingAmount] = useState(1);
  const isEQP = useSelector(selectIsEQP);
 

  return (
    <div id="input-container">
      <h2>Input</h2>
      <div id="input-grid">
        {/* Pricing Type */}
        <p className="pricing-type row-head hide-if-mobile">Pricing Type</p>
        <p className="pricing-type row-head mobile-abbreviation">PT</p>
        <PricingType />

        {/* QTY */}
        <p className="qty row-head">Qty</p>
        {quantities.map((qty, i) => {
          return <Quantity id={"qty-input"+i} columnIndex={i} key={"qty-input"+i} />;
        })}

        {/* unit cost */}
        <p className="unit-cost row-head hide-if-mobile">Unit Cost</p>
        <p className="unit-cost row-head mobile-abbreviation">UC</p>
        {!isEQP ? columnsArr.map((col, i) => {
          return <UnitCost  id={"unit-cost"+i} columnIndex={i} key={"unit-cost"+i}  />;
        }) : <UnitCost id={"unit-cost"+0} columnIndex={0} key={"unit-cost"+0}  />
      }

        {/* Unit Code */}
        <p className="unit-code row-head hide-if-mobile">Unit Code</p>
        <p className="unit-code row-head mobile-abbreviation">Code</p>
        {<UnitCode id={"unit-code"+0} columnIndex={0} key={"unit-code"+0}  />
        }

        {/* Setup Fee */}
        <p className="setup-fee row-head hide-if-mobile">Setup Fee</p>
        <p className="setup-fee row-head mobile-abbreviation">SF</p>
        <SetupFee />
        {/* Setup Code */}
        <p className="setup-code row-head hide-if-mobile">Setup Code</p>
        <p className="setup-code row-head mobile-abbreviation">SC</p>
        <SetupCode />

        {/* Box Qty/Cost */}
        <p id="box-head" className="row-head">
          Box
        </p>

        <p className="qty-pb hide-if-mobile">QTY-PB</p>
        <p className="qty-pb mobile-abbreviation">QPB</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<QtyPerBox id={"qty-pb-"+i} boxIndex={i} key={"qty-pb-"+i} />))}
        
        <p className="cost-pb hide-if-mobile">COST-PB</p>
        <p className="cost-pb mobile-abbreviation">CPB</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<CostPerBox id={"cost-pb-"+i} boxIndex={i} key={"cost-pb-"+i} />))}
        <button
          className="add-box box-btn"
          onClick={() => {
            if(boxAmount < 5){
              setBoxAmount(boxAmount + 1);
              dispatch(updateBoxData({}));
              dispatch(updateNetUnitCost({}));
            }
          }}
        >
          + Box
        </button>
        <button
          className="remove-box box-btn"
          onClick={() => {
            if(boxAmount > 1){
              boxAmount > 1 && setBoxAmount(boxAmount - 1);
              //clear box values upon box removal
              dispatch(updateQtyPerBox({boxIndex: (boxAmount -1), value: 0}));
              dispatch(updateCostPerBox({boxIndex: (boxAmount -1), value: 0}));
              //update box data accordingly
              dispatch(updateBoxData({}));
              dispatch(updateNetUnitCost({}));
            }
          }}
        >
          - Box
        </button>
        {/* Handling Fees */}

        <p className="row-head hide-if-mobile" id="handling-head">Handling Fees</p>
        <p className="row-head mobile-abbreviation" id="handling-head">HFs</p>


        <p className="handling title-type hide-if-mobile">TYPE</p>
        <p className="handling title-type mobile-abbreviation">type</p>
        {Array.from(Array(handlingAmount)).map((h, i) => {
          return (
            <HandlingType
              handlingIndex={i}
              id={"handling-type-"+i}
              key={"handling-type-"+i}
            />
          );
        })}

        <p className="handling title-fee hide-if-mobile">FEE</p>
        <p className="handling title-fee mobile-abbreviation">fee</p>
        {Array.from(Array(handlingAmount)).map((h, i) => {
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
            handlingAmount < 5 && setHandlingAmount(handlingAmount + 1);
          }}
        >
          + Fee
        </button>
        <button
          className="remove-fee handling-btn"
          onClick={() => {
            handlingAmount > 1 && setHandlingAmount(handlingAmount - 1);
            handlingAmount > 1 && dispatch(clearHandlingFee({handlingIndex: (handlingAmount - 1)}));
            handlingAmount > 1 && dispatch(updateNetUnitCost({}));
          }}
        >
          - Fee
        </button>
        {/* input-grid closer */}
      </div>
      {/* Input container closer */}
    </div>
  );
};

export default Input;
