const axios = require('axios');

function DietaryService(dbAddress, headers) {

    this.dbAddress = dbAddress;
    this.headers = headers;

    const getDietary = (labels) => {
        let url = `${dbAddress}dietary/_design/advice/_view/label?keys=[${labels.split(',').map(label => `"${label}"`)}]`;
        console.log(url);
        return axios.get(url, { headers });
    }
    return {
        getDietary
    };
}

module.exports = DietaryService;