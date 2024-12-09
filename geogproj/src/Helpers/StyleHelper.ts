//TODO: add error context instead of console log
import type { GeoJsonProperties } from 'geojson';


// Applies default styles, alongside determining the proper color for each cell
export const calculateChoroplethFillColor = (population: number, breaks: number[], breakSchema: string) => {
    if (breakSchema == "Greatest Divisor") {
        return calculateDivisorChoroplethFillColor(population, breaks)
    } else {
        return calculateItervalChoroplethFillColor(population, breaks)
    }
};


// Determine which break is the upper limit for this vaue, and return this break's corresponding color
export const calculateItervalChoroplethFillColor = (population: number, breaks: number[]) => {
    for (let i = 0; i < breaks.length; i++) {
        if (!(population > breaks[i])) {
            return calculateRedBlueIntervalColor(i,breaks.length-1, 0)
        }
    }
    // Defalt to black in some weird edge case 
    // (if you see this color, whatever is feeding this function data is making invalid calculations)
    return "#000";
};

// Of the provided divisors, determine the largest which divides this value, and return the corresponding color for that divisor
export const calculateDivisorChoroplethFillColor = (population: number, breaks: number[]) => {
    for (let i = breaks.length - 1; i >= 0; i--) {
        const divisor = breaks[i];
        if (population % divisor == 0) {
            return calculateRedBlueIntervalColor(i, breaks.length - 1, 0)
        }
    }
    //defalt to black in some weird edge case 
    // (if you see this color, whatever is feeding this function data is making invalid calculations)
    return "#000";
};


// Treating the upper bound of some numerical interval as red, and the lower bound as blue,
// Expresses the position of some value within this interval as a proportionate shade of purple
export const calculateRedBlueIntervalColor = ((currentVal:number, maxVal:number, minVal:number) => {
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