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
        <p className="pricing-type input-head">Pricing</p>
        <PricingType />

        {/* QTY */}
        <p className="qty input-head">Quantity</p>
        {quantities.map((qty, i) => {
          return <Quantity id={"qty-input"+i} columnIndex={i} key={"qty-input"+i} />;
        })}

        {/* unit cost */}
        <p className="unit-cost input-head">Unit Cost</p>
        {!isEQP ? columnsArr.map((col, i) => {
          return <UnitCost  id={"unit-cost"+i} columnIndex={i} key={"unit-cost"+i}  />;
        }) : <UnitCost id={"unit-cost"+0} columnIndex={0} key={"unit-cost"+0}  />
      }

        {/* Unit Code */}
        <p className="unit-code input-head">Unit Code</p>
        {<UnitCode id={"unit-code"+0} columnIndex={0} key={"unit-code"+0}  />
        }

        {/* Setup Fee */}
        <p className="setup-fee input-head">Setup Fee</p>
        <SetupFee />
        {/* Setup Code */}
        <p className="setup-code input-head">Setup Code</p>
        <SetupCode />

        {/* Box Qty/Cost */}
        <p id="box-head" className="input-head">
          Box
        </p>
        <p className="qty-pb">QTY-PB</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<QtyPerBox id={"qty-pb-"+i} boxIndex={i} key={"qty-pb-"+i} />))}
        <p className="cost-pb">COST-PB</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<CostPerBox id={"cost-pb-"+i} boxIndex={i} key={"cost-pb-"+i} />))}
        <button
          className="add-box box-btn"
          onClick={() => {
            boxAmount < 5 && setBoxAmount(boxAmount + 1);
            //update box data accordingly
            boxAmount < 5 && dispatch(updateBoxData({}));
          }}
        >
          Add Box
        </button>
        <button
          className="remove-box box-btn"
          onClick={() => {
            boxAmount > 1 && setBoxAmount(boxAmount - 1);
            console.log(boxAmount)
            //clear box values upon box removal
            boxAmount > 1 && dispatch(updateQtyPerBox({boxIndex: (boxAmount -1), value: 0}));
            boxAmount > 1 && dispatch(updateCostPerBox({boxIndex: (boxAmount -1), value: 0}));
            //update box data accordingly
            boxAmount > 1 && dispatch(updateBoxData({}));
          }}
        >
          Remove Box
        </button>
        {/* Handling Fees */}
        <p className="input-head" id="handling-head">
          Handling Fees
        </p>

        <p className="handling title-type">TYPE</p>
        {Array.from(Array(handlingAmount)).map((h, i) => {
          return (
            <HandlingType
              handlingIndex={i}
              id={"handling-type-"+i}
              key={"handling-type-"+i}
            />
          );
        })}

        <p className="handling title-fee">FEE</p>
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
          Add Fee
        </button>
        <button
          className="remove-fee handling-btn"
          onClick={() => {
            handlingAmount > 1 && setHandlingAmount(handlingAmount - 1);
            handlingAmount > 1 && dispatch(clearHandlingFee({handlingIndex: (handlingAmount - 1)}));
            handlingAmount > 1 && dispatch(updateNetUnitCost({}));
          }}
        >
          Remove Fee
        </button>
        {/* input-grid closer */}
      </div>
      {/* Input container closer */}
    </div>
  );
};

export default Input;
