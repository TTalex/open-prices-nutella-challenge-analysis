const AxisGrid = ({xScale, yScale, height, width, margin}) => {
    const numberOfTicksTarget = 10
    const xTicks = xScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        xOffset: xScale(value),
    }))
    const yTicks = yScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        yOffset: yScale(value),
    }))
    
    return (
        <g className="grid">
            <g transform={`translate(0, ${margin.top})`}>
                {xTicks.map(({ value, xOffset }) => (
                    <g key={value} transform={`translate(${xOffset}, 0)`}>
                        <line y2={height - margin.top - margin.bottom} stroke="currentColor" />
                    </g>
                ))}
            </g>
            <g transform={`translate(${margin.left}, 0)`}>
                {yTicks.map(({ value, yOffset }) => (
                    <g key={value} transform={`translate(0, ${yOffset})`}>
                        <line x2={width - margin.left - margin.right} stroke="currentColor" />
                    </g>
                ))}
            </g>
            
        </g>
    )
}