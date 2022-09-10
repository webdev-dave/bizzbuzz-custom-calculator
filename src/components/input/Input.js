import PricingType from "./PricingType";
import Quantity from "./Quantity";
import UnitPrice from "./UnitPrice";
import UnitCode from "./UnitCode";
import SetupFee from "./SetupFee";
import SetupCode from "./SetupCode";

const Input = () => {
  const quantities = [50, 100, 250, 500, 1000, 2500, 5000];
  const columnsArr = ["", "", "", "", "", "", ""];

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
          return <Quantity qty={qty} id={`qty-${i}`} key={`qty-${i}`} />;
        })}

        {/* unit price */}
        <p className="unit-price input-head">Unit Price</p>
        {columnsArr.map((col, i) => {
          return <UnitPrice key={`unit-price-${i}`} />;
        })}

        {/* Unit Code */}
        <p className="unit-code input-head">Unit Code</p>
        <UnitCode/>


        {/* Setup Fee */}
        <p className="setup-fee input-head">Setup Fee</p>
        <SetupFee/>
        {/* Setup Code */}
        <p className="setup-code input-head">Setup Code</p>
        <SetupCode/>

        {/* Box Qty/Cost */}
        <p id="box-head" className="input-head">
          Box
        </p>
        <p className="box-qty">QTY</p>
        <input className="box-qty" type="text" />
        <p className="box-cost">COST</p>
        <input className="box-cost" type="text" />
        <button id="box-btn">Add Box</button>
        {/* Handling Fees */}
        <p className="input-head" id="handling-head">
          Handling
        </p>
        <p className="handling">TYPE</p>
        <select className="handling-fees-selector" id="">
          <option>order</option>
          <option>box</option>
          <option>rush</option>
          <option>misc</option>
        </select>
        <p className="handling">FEE</p>
        <input className="handling-fees-input" type="text" />
        <select className="handling-fees-selector" id="">
          <option>order</option>
          <option>box</option>
          <option>rush</option>
          <option>misc</option>
        </select>
        <input className="handling-fees-input" type="text" />
        <select className="handling-fees-selector" id="">
          <option>box</option>
          <option>order</option>
          <option>rush</option>
          <option>misc</option>
        </select>
        <input className="handling-fees-input" type="text" />
        <button id="handling-fees-btn">Add Fee</button>
        {/* input-grid closer */}
      </div>
      {/* Input container closer */}
    </div>
  );
};

export default Input;
