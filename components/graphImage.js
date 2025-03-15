const GraphImage = ({product, lastXScale, lastYScale, highlightPalmOil, scaleFactor, setTooltipInfo}) => {
    const mouseEnter = (event) => {
        setTooltipInfo({
            product: product,
            top: event.pageY + 5,
            left: event.pageX + 5,
            visible: true,
        })
    }
    const mouseExit = () => {
        setTooltipInfo(oldTooltipInfo => ({
            ...oldTooltipInfo,
            visible: false,
        }))
    }
    return (
        <image 
            x={lastXScale(product.hazelnut_percent) - 10} 
            y={lastYScale(product.price_per_kg) - 10} 
            width={Math.min(64, 20 * scaleFactor)} 
            height={Math.min(64, 20 * scaleFactor)} 
            href={`images/${product.product}.jpg`} 
            className={highlightPalmOil ? (product.ingredients_from_palm_oil_n ? "redimage" : "greenimage") : ""}
            onMouseOver={mouseEnter}
            onMouseMove={mouseEnter}
            onMouseOut={mouseExit}
            onClick={(event) => {
                window.open(`https://prices.openfoodfacts.org/products/${product.product}`, "_blank")
            }}
        />
    )
}