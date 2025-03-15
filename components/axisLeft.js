const TICK_LENGTH = 6

const AxisLeft = ({ yScale }) => {
    const range = yScale.range()
    const numberOfTicksTarget = 10
    const ticks = yScale.ticks(numberOfTicksTarget).map((value) => ({
        value,
        yOffset: yScale(value),
    }))
    
    return (
        <g>
            <path
                d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
                fill="none"
                stroke="currentColor"
            />
            
            {ticks.map(({ value, yOffset }) => (
                <g key={value} transform={`translate(0, ${yOffset})`}>
                    <line x2={-TICK_LENGTH} stroke="currentColor" />
                    <text
                        key={value}
                        style={{
                            fontSize: "10px",
                            textAnchor: "middle",
                            transform: "translateX(-20px)",
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