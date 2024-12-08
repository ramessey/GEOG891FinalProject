
// Retreive the census population data for a particular feature
// Use this data to populate the proper population property of that feature
// (yes pun intended)
const populatePopulation = async (feature: Feature) => {
    const countyCode = feature.id as number - 31000;
    await getPopulation(31, countyCode).then(population => {
        feature.properties.population = population;
    });
    return feature;
};


//TODO: UseMemo?? Or some kind of cache
const getPopulation = async (nStateCode: number, nCountyCode: number) => {
    let sCountyCode = nCountyCode.toString();
    // We must append zeros to the county code until it is exactly three characters
    while (sCountyCode.length < 3) {
        sCountyCode = `0${sCountyCode}`;
    }
    const URL = `https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&for=county:${sCountyCode}&in=state:${nStateCode}`;

    try {
        let population: number;
        await fetch(URL)
            .then(response => {
                if (response.ok) return response.json();
                    else throw new Error(response.status.toString());
            })
            .then(data => {
                population = Number(data[1][1])// The data will be a matrix, and this is the location which contains population statistics
            });
        return population;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default populatePopulation
