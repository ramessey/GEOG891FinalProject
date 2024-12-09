
// Retreive the census population data for a particular feature
// Use this data to populate the proper population property of that feature
// (yes pun intended)
const populatePopulation = async (feature: Feature, year: number) => {
    const countyCode = feature.id as number - 31000;
    await getPopulation(31, countyCode, year).then(population => {
        feature.properties.population = population;
    });
    return feature;
};


//For testing other components more quickly
const getPopulationDemo = async (nStateCode: number, nCountyCode: number, year: number) => {
    return Math.floor(Math.random() * 100);
}


//TODO: UseMemo?? Or some kind of cache
const getPopulation = async (nStateCode: number, nCountyCode: number, year: number) => {
    let sCountyCode = nCountyCode.toString();
    // We must append zeros to the county code until it is exactly three characters
    while (sCountyCode.length < 3) {
        sCountyCode = `0${sCountyCode}`;
    }
    const URL = `https://api.census.gov/data/${year}/pep/charagegroups?get=POP&for=county:${sCountyCode}&in=state:${nStateCode}`;

    try {
        let population: number;
        await fetch(URL)
            .then(response => {
                if (response.ok) return response.json();
                    else throw new Error(response.status.toString());
            })
            .then(data => {
                population = Number(data[1][0])// The data will be a matrix, and this is the location which contains population statistics
            });
        return population;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default populatePopulation
