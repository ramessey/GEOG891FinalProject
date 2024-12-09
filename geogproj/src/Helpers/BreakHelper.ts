import type { FeatureCollection } from 'geojson';


const calculateBreaks = (geoJSON: FeatureCollection | null, breakSchema: string, numberOfBreaks: number): number[] => {
    // Default to empty array as a placeholder while everything loads
    let breaks:number[] = []
    if (breakSchema == "Greatest Divisor") {
        breaks = calculateGreatestDivisorBreaks(numberOfBreaks);
    }
    // If we're creating groups based on data intervals, we should extract the population data and process it
    else if (geoJSON) {
        let populationData: number[] = geoJSON.features.map(feature => feature?.properties?.population ?? 0);
        populationData = populationData.sort((a,b) => { return a-b;});
        if (breakSchema == "Equal Interval") {
            breaks =  calculateEqualIntervalBreaks(numberOfBreaks, populationData[0], populationData[populationData.length - 1]);
        }
        else if (breakSchema == "Quintiles") {
            breaks =  calculateQuantileBreaks(numberOfBreaks, populationData);
        }
    }
    // Default to empty array as a placeholder while everything loads
    breaks = breaks.sort((a, b) => { return a - b; });;
    return breaks;
};


// Each break will be the upper limit of some equally sized inteval between the highest and lowest value
const calculateEqualIntervalBreaks = (numberOfBreaks: number, minValue:number,maxValue:number) => {
    const breaks = [];
    const intervalSize: number = Math.ceil((maxValue - minValue)/numberOfBreaks);
    for (let i = 1; i <= numberOfBreaks; i++) {
        const upperLimitOfBreak = minValue + (i * intervalSize)
        breaks.push(upperLimitOfBreak);
    }
    return breaks;
};


// The breaks here will correspond to actual values in our data, which will be evenly spread throughout our data
const calculateQuantileBreaks = (numberOfBreaks: number, sortedPopulationData:number[]):number[] => {
    const breaks = [];
    // All of the breaks will include at least this many indices
    const minimumIndexQuantity: number = Math.floor(sortedPopulationData.length / numberOfBreaks);
    // If the number of indices isn't divisible by the numbre of breaks, some breaks will need another index
    // This is essentially the remainder of the prior division
    const breaksNeedingExtraIndex = sortedPopulationData.length % numberOfBreaks;
    for (let i = 1; i <= numberOfBreaks; i++) {
        const indexPosition = (minimumIndexQuantity * i) + Math.min(i, breaksNeedingExtraIndex) - 1;
        breaks.push(sortedPopulationData[indexPosition]);
    }
    return breaks;
};


// If we're grouping by highest common divisor, the breaks will just be whole numbers indicating different divisors
const calculateGreatestDivisorBreaks = (numberOfBreaks: number):number[] => {
    const breaks: number[] = [];
    for (let i = 1; i <= numberOfBreaks; i++) {
        breaks.push(i);
    }
    return breaks;
};


export default calculateBreaks
