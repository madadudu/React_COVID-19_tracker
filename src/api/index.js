import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        //const modifuedData = {confirmed, recovered, deaths, lastUpdate, }
        //if you comment it, you will see the data is not used.
        return { confirmed, recovered, deaths, lastUpdate };
        //console.log(response);
    } catch (error) {
        return error;
    }
}

// export const fetchDailyData = async () => {
//     try {
//         const { data } = await axios.get(`${url}/daily`);

//         //console.log(data);
//         const modifiedData = data.map((dailyData) => ({
//             confirmed: dailyData.confirmed.total,
//             deaths: dailyData.deaths.total,
//             date: dailyData.reportDate,
//         }));

//         return modifiedData;

//     } catch (error) {
//         console.log(error);
//     }
// }

////////////////////////////////////////////////////////////////////////////////
export const fetchDailyData = async () => {
    try{
        const { data } = await axios.get(`https://api.covidtracking.com/v1/us/daily.json`)
        //const { data } = await axios.get(`${url}/daily`);

        return data.map(({ positive, recovered, death, dateChecked: date}) => ({ confirmed: positive, recovered, deaths: death, date }));
    }catch (error) {
        return error;
    }
};

export const fetchCuntries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        //const response = await axios.get(`${url}/countries`);

        //console.log(response);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}
