const Graph = ({sampleData, highlightPalmOil, nameFilter, setTooltipInfo}) => {
    const width = 800, height = 600;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 }
    
    const svgRef = React.useRef()

    const originXScale = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right])
    const originYScale = d3.scaleLinear()
        .domain([0, 50])
        .range([height - margin.bottom, margin.top])

    const [lastXScale, setLastXScale] = React.useState(() => originXScale.copy())
    const [lastYScale, setLastYScale] = React.useState(() => originYScale.copy())
    const [scaleFactor, setScaleFactor] = React.useState(1)
    const [filteredData, setFilteredData] = React.useState(sampleData)

    React.useEffect(() => {
        d3.select(svgRef.current)
            .call(d3.zoom().scaleExtent([1, 20]).on("zoom", zoomed))
    })

    React.useEffect(() => {
        setFilteredData(sampleData.filter(d => 
          d.readable_product_name.toLowerCase().includes(nameFilter.toLowerCase())
          || d.brands.toLowerCase().includes(nameFilter.toLowerCase())
          || d.product.toLowerCase().includes(nameFilter.toLowerCase())
        ))
    }, [sampleData]);

    const zoomed = (event) => {
        const newXScale = event.transform.rescaleX(originXScale)
        const newYScale = event.transform.rescaleY(originYScale)
        setLastXScale(() => newXScale)
        setLastYScale(() => newYScale)
        setScaleFactor(event.transform.k)
    }

    return (
        <div>
            <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                <clipPath id="mask">
                    <rect x={0} y={0} width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} />
                </clipPath>
                </defs>
                <text x={width/2} y={height-10} textAnchor="middle" fill="var(--bulma-body-color)">Hazelnut %</text>
                <text x={-(height/2)} y={20} textAnchor="middle" transform="rotate(-90)" fill="var(--bulma-body-color)">Price/kg (€)</text>
                <g className="plot-area" clipPath="url(#mask)" transform={`translate(${margin.left}, ${margin.top})`}>
                    {filteredData.map(d => <GraphImage 
                        key={d.product} 
                        product={d} 
                        lastXScale={lastXScale} 
                        lastYScale={lastYScale} 
                        highlightPalmOil={highlightPalmOil} 
                        setTooltipInfo={setTooltipInfo}
                        scaleFactor={scaleFactor}
                    />)}
                </g>
                <g transform={`translate(${margin.left}, 0)`}>
                    <AxisLeft yScale={lastYScale}/>
                </g>
                <g transform={`translate(0, ${height - margin.bottom})`}>
                    <AxisBottom xScale={lastXScale}/>
                </g>
                <AxisGrid xScale={lastXScale} yScale={lastYScale} height={height} width={width} margin={margin}/>
            </svg>
        </div>
    )
}
