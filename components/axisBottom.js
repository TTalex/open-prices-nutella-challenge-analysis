const TICK_LENGTH = 6

const AxisBottom = ({xScale}) => {
    const range = xScale.range()
    const numberOfTicksTarget = 10
    const ticks = xScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        xOffset: xScale(value),
    }))
    
    return (
        <g>
            <path
                d={["M", range[0], 0, "L", range[1], 0].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            
            {ticks.map(({ value, xOffset }) => (
                <g key={value} transform={`translate(${xOffset}, 0)`}>
                    <line y2={TICK_LENGTH} stroke="currentColor" />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateY(20px)",
                            fill: "var(--bulma-body-color)"
                        }}
                        >
                        {value}
                    </text>
                </g>
            ))}
        </g>
    )
}