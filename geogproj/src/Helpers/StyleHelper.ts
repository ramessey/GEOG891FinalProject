//TODO: add error context instead of console log

// Applies default styles, alongside determining the proper color for each cell
const calculateChoroplethStyle = ((currentCellValue: number, maxMapValue: number, minMapValue: number) => {
    return ({
        fillColor: calculateRedBlueIntervalColor(currentCellValue, maxMapValue, minMapValue),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '2',
        fillOpacity: 0.5
    });
});


// Treating the upper bound of some numerical interval as red, and the lower bound as blue,
// Expresses the position of some value within this interval as a proportionate shade of purple
const calculateRedBlueIntervalColor = ((currentVal:number, maxVal:number, minVal:number) => {
    if (maxVal !== null && minVal !== null && currentVal !== null) {
        // Determine the position of a specified value on an interval between two other values
        const ratio = (currentVal - minVal) / (maxVal - minVal);
        // Then, map this position onto the interval between red and blue
        const redDecimal = Math.floor(255 * ratio);
        const blueDecimal = Math.floor(255 * (1 - ratio));
        // Return whatever color lies on that position
        return toRGBHexString(redDecimal, 0, blueDecimal);
    } else {
        //Default to black for invalid/unknown values
        return "#000000";
    }
});


const toRGBHexString = ((red: number, green: number, blue: number) => {
    return `#${toHexColor(red)}${toHexColor(green)}${toHexColor(blue)}`
});


const toHexColor = ((nDecimalColor: number) => {
    //First, normalize the value to not exceed the bounds of a standard hex color
    nDecimalColor = Math.min(nDecimalColor, 255);
    nDecimalColor = Math.max(nDecimalColor, 0);
    //Then, convert it to a hex string
    let sHexColor = nDecimalColor.toString(16);
    //The work in a hex color expression, we must always have exactly two characters
    while (sHexColor.length < 2) {
        sHexColor = `0${sHexColor}`;
    }
    return sHexColor;
});

export default calculateChoroplethStyle