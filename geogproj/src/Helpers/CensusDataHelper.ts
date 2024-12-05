
// Retreive the census population data for a particular feature
// Use this data to populate the proper population property of that feature
// (yes pun intended)
const populatePopulation = async (feature: Feature) => {
    const countyCode = feature.id as number - 31000;
    const population = await getPopulationDemo(31, countyCode);
    feature.properties.population = population;
    return feature;
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getPopulationDemo = async (nStateCode: number, nCountyCode: number) => {
    await sleep(1000);
    return Math.floor(Math.random() * 3)
};

//const getPopulation = ((nStateCode: number, nCountyCode: number) => {
//    let sCountyCode = nCountyCode.toString();
//    // We must append zeros to the county code until it is exactly three characters
//    while (sCountyCode.length < 0) {
//        sCountyCode = `0${sCountyCode}`;
//    }
//    const URL = `https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&for=county:${sCountyCode}&in=state:${nStateCode}`;

//    try {
//        const response =  fetch(URL);
//        const jsonData = response.json();
//        return Math.floor(Math.random() * 3)
//        //return jsonData;
//    } catch (error) {
//        console.error('Error fetching data:', error);
//    }
//});

export default populatePopulation
