import { useSelector } from "react-redux";
import { selectIsEQP, selectQuantity } from "../main/mainSlice";


import PricingType from "./PricingType";
import Quantity from "./Quantity";
import UnitCost from "./UnitCost";
import UnitCode from "./UnitCode";
import SetupFee from "./SetupFee";
import SetupCode from "./SetupCode";
import HandlingType from "./HandlingType";
import { useState } from "react";
import { columnsArr } from "../../assets/helpers/helperArrays";
import BoxQty from "./BoxQty";
import BoxCost from "./BoxCost";


const Input = () => {

  const quantities = useSelector(selectQuantity);
  
  const [boxAmount, setBoxAmount] = useState(1);
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
        {!isEQP ? columnsArr.map((col, i)=> {
            return <UnitCode id={"unit-code"+i} columnIndex={i} key={"unit-code"+i} />;
          }) : <UnitCode id={"unit-code"+0} columnIndex={0} key={"unit-code"+0}  />
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
        {Array.from(Array(boxAmount)).map((box, i) => (<BoxQty id={"qty-pb-"+i} key={"qty-pb-"+i} />))}
        <p className="cost-pb">COST-PB</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<BoxCost id={"cost-pb-"+i} key={"cost-pb-"+i} />))}
        <button
          className="add-box box-btn"
          onClick={() => {
            boxAmount < 5 && setBoxAmount(boxAmount + 1);
          }}
        >
          Add Box
        </button>
        <button
          className="remove-box box-btn"
          onClick={() => {
            boxAmount > 1 && setBoxAmount(boxAmount - 1);
          }}
        >
          Remove Box
        </button>
        {/* Handling Fees */}
        <p className="input-head" id="handling-head">
          Handling Fees
        </p>
        <p className="handling title-type">TYPE</p>
        <p className="handling title-fee">FEE</p>

        {Array.from(Array(handlingAmount)).map((h, i) => {
          return (
            <HandlingType
              defaultType={i}
              id={"handling-type-"+i}
              key={"handling-type-"+i}
            />
          );
        })}
        {Array.from(Array(handlingAmount)).map((h, i) => {
          return (
            <input
              className="handling-fees-input"
              type="text"
              id={"handling-fee-"+i}
              key={"handling-fee-"+i}
            />
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
