const App = () => {
    const [highlightPalmOil, setHighlightPalmOil] = React.useState(false);
    const [sampleData, setSampleData] = React.useState([]);
    const [nameFilter, setNameFilter] = React.useState("");
    const [tooltipInfo, setTooltipInfo] = React.useState({
        product: {},
        top: 0,
        left: 0,
        visible: false,
    })
  
    React.useEffect(() => {      
      fetch("data.json")
        .then(response => response.json())
        .then(data => setSampleData(data.map(d => d.hazelnut_percent ? d : {...d, hazelnut_percent: -10})))
    }, []);

    return (
      <div className="main">
          <section className="section">
              <div className="container">
                <h1 className="title">
                    Open Prices Hazelnut Challenge Dataviz
                </h1>
                <div className="columns">
                  <div className="column">
                    <Graph sampleData={sampleData} highlightPalmOil={highlightPalmOil} nameFilter={nameFilter} setTooltipInfo={setTooltipInfo}/>
                  </div>
                  <div className="column">
                    <div className="field">
                      <div className="control">
                        <button className="button is-info" onClick={() => setHighlightPalmOil(!highlightPalmOil)}>
                          {highlightPalmOil ? "Stop highlighting products Palm Oil" : "Highlight products with Palm Oil"}
                        </button>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label className="label">Filter on product name, brand or barcode</label>
                        <input className="input" type="text" placeholder="Filter" onChange={(e) => setNameFilter(e.target.value)}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
          
          <article className="message tooltip" style={{
              top: `${tooltipInfo.top}px`,
              left: `${tooltipInfo.left}px`,
              visibility: tooltipInfo.visible ? "visible" : "hidden",
          }}>
              <div className="message-body">
                  <strong>{tooltipInfo.product.product}</strong><br/>
                  <strong>Hazelnut %:</strong> {tooltipInfo.product.hazelnut_percent == -10 ? "Unknown" : tooltipInfo.product.hazelnut_percent + "%"}<br/>
                  <strong>Palm Oil:</strong> {tooltipInfo.product.ingredients_from_palm_oil_n ? "Yes" : "No"}<br/>
                  <strong>Price/kg:</strong> {tooltipInfo.product.price_per_kg}€<br/>
                  <strong>Avg price:</strong> {tooltipInfo.product.price}€<br/>
                  <strong>Nb prices:</strong> {tooltipInfo.product.id_x}<br/>
              </div>
          </article>
      </div>
    );
}


const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)