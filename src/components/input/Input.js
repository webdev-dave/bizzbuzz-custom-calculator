import PricingType from "./PricingType";
import Quantity from "./Quantity";
import UnitPrice from "./UnitPrice";
import UnitCode from "./UnitCode";
import SetupFee from "./SetupFee";
import SetupCode from "./SetupCode";
import HandlingType from "./HandlingType";
import { useState } from "react";
import { columnsArr } from "../../assets/helpers/helperArrays";
import BoxQty from "./BoxQty";
import BoxCost from "./BoxCost";

const Input = () => {
  const quantities = [50, 100, 250, 500, 1000, 2500, 5000];
  
  const [boxAmount, setBoxAmount] = useState(1);
  const [handlingAmount, setHandlingAmount] = useState(3);

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
          return <Quantity qty={qty} id={"qty-input"+(i+1)} key={"qty-input"+(i+1)} />;
        })}

        {/* unit price */}
        <p className="unit-price input-head">Unit Price</p>
        {columnsArr.map((col, i) => {
          return <UnitPrice key={"unit-price" + (i+1)} id={"unit-price" + (i+1)} />;
        })}

        {/* Unit Code */}
        <p className="unit-code input-head">Unit Code</p>
        <UnitCode />

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
        <p className="box-qty">QTY</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<BoxQty id={"box-qty-" + (i+1)} key={"box-qty-" + (i+1)} />))}
        <p className="box-cost">COST</p>
        {Array.from(Array(boxAmount)).map((box, i) => (<BoxCost id={"box-cost-" + (i+1)} key={"box-cost-" + (i+1)} />))}
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
              id={"handling-type-" +(i+1)}
              key={"handling-type-" + (i+1)}
            />
          );
        })}
        {Array.from(Array(handlingAmount)).map((h, i) => {
          return (
            <input
              className="handling-fees-input"
              type="text"
              id={"handling-fee-" + (i+1)}
              key={"handling-fee-" + (i+1)}
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
