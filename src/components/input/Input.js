import PricingType from "./PricingType";
import Quantity from "./Quantity";
import UnitPrice from "./UnitPrice";

const Input = () => {
  const quantities = [50, 100, 250, 500, 1000, 2500, 5000];
  const columnsArr = ["","","","","","",""];
  
  return (
    <div id="input-container">
      <h2>Input</h2>
      <div id="input-grid">
        {/* Pricing Type */}
        <p class="pricing-type input-head">Pricing</p>
        <PricingType />

        {/* QTY */}
        <p class="qty input-head">Quantity</p>
        {quantities.map((qty, i) => {
          return <Quantity value={qty} id={`qty-${i}`} key={`col-${i}`} />;
        })}

        {/* unit price */}
        <p class="unit-price input-head">Unit Price</p>
        {
          columnsArr.map((col, i) => {
            return <UnitPrice/>
          })
        }
          
        

   

        {/* Unit Code */}
        <p class="unit-code input-head">Unit Code</p>
        <select class="unit-code" id="unit-code-selector">
          <option>A</option>
          <option>B</option>
          <option selected>C</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
          <option>G</option>
          <option>H</option>
          <option>P</option>
          <option>Q</option>
          <option>R</option>
          <option>S</option>
          <option>T</option>
          <option>U</option>
          <option>V</option>
          <option>W</option>
          <option>Z</option>
        </select>
        {/* Setup Fee */}
        <p class="setup-fee input-head">Setup Fee</p>
        <input class="setup-fee" type="text" />
        {/* Setup Code */}
        <p class="setup-code input-head">Setup Code</p>
        <select class="setup-code" id="setup-code-selector">
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
          <option>E</option>
          <option>F</option>
          <option>G</option>
          <option>H</option>
          <option>P</option>
          <option>Q</option>
          <option>R</option>
          <option>S</option>
          <option>T</option>
          <option>U</option>
          <option selected>V</option>
          <option>W</option>
          <option>Z</option>
        </select>
        {/* Box Qty/Cost */}
        <p id="box-head" class="input-head">
          Box
        </p>
        <p class="box-qty">QTY</p>
        <input class="box-qty" type="text" />
        <p class="box-cost">COST</p>
        <input class="box-cost" type="text" />
        <button id="box-btn">Add Box</button>
        {/* Handling Fees */}
        <p class="input-head" id="handling-head">
          Handling
        </p>
        <p class="handling">TYPE</p>
        <select class="handling-fees-selector" id="">
          <option selected>order</option>
          <option>box</option>
          <option>rush</option>
          <option>misc</option>
        </select>
        <p class="handling">FEE</p>
        <input class="handling-fees-input" type="text" />
        <select class="handling-fees-selector" id="">
          <option>order</option>
          <option selected>box</option>
          <option>rush</option>
          <option>misc</option>
        </select>
        <input class="handling-fees-input" type="text" />
        <select class="handling-fees-selector" id="">
          <option>box</option>
          <option>order</option>
          <option selected>rush</option>
          <option>misc</option>
        </select>
        <input class="handling-fees-input" type="text" />
        <button id="handling-fees-btn">Add Fee</button>
        {/* input-grid closer */}
      </div>
      {/* Input container closer */}
    </div>
  );
};

export default Input;
