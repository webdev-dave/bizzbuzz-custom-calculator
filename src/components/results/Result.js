

const Results = () => {
    return (
        <div id="output-container">
        <h2>Results</h2>
        <div id="output-grid">
          <h3>X pcs</h3>
          <p className="output-head">Net Cost PU</p>
          <div className="output-data">
            <p>data</p>
          </div>
          <p className="output-head">Retail Price  PU</p>
          <div className="output-data">
            <p>data</p>
          </div>
          <p className="output-head">Retail Total</p>
          <div className="output-data">
            <p>data</p>
          </div>
          <p className="output-head">Total Profit</p>
          <div className="output-data">
            <p>data</p>
          </div>
          <p className="output-head">Profit Margin</p>
          <form action="">
            <label htmlFor="profit-margin"></label>
            <input type="text" id="profit-margin"className="output-data" />
          </form>
        {/* output-grid closer */}
        </div>
      {/* output-container closer */}
      </div>

    )
}

export default Results;