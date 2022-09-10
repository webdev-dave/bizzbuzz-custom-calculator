

const Results = () => {
    return (
        <div id="output-container">
        <h2>Results</h2>
        <div id="output-grid">
          <h3>X pcs</h3>
          <p class="output-head">Net Cost PU</p>
          <div class="output-data">
            <p>data</p>
          </div>
          <p class="output-head">Retail Price  PU</p>
          <div class="output-data">
            <p>data</p>
          </div>
          <p class="output-head">Retail Total</p>
          <div class="output-data">
            <p>data</p>
          </div>
          <p class="output-head">Total Profit</p>
          <div class="output-data">
            <p>data</p>
          </div>
          <p class="output-head">Profit Margin</p>
          <form action="">
            <label for="profit-margin"></label>
            <input type="text" id="profit-margin"class="output-data" value="40%" />
          </form>
        {/* output-grid closer */}
        </div>
      {/* output-container closer */}
      </div>

    )
}

export default Results;