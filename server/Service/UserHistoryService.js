const axios = require('axios');
const dbName = 'userhistory';
const cache = require('./CacheManager');

function UserHistoryService(dbAddress) {
    this.dbAddress = dbAddress;
    // record users' search history in the database
    const recordSearchHistory = (object, target) => {
        const timestamp = new Date().toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).replace(',', '');
        // define the elements needed to be record
        const record = {
            time: timestamp,
            object: object,
            target: target
        };
        const jsonRecord = JSON.stringify(record);
        return axios.post(`${dbAddress}/${dbName}`, jsonRecord, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    // fetch users' search history
    const fetchSearchHistory = () => {
        return axios.get(`${dbAddress}${dbName}/_design/userHistory/_view/all_history`)
    }

    // fetch popular search history by id with cache
    const fetchPopularHistory = async (historyId) => {
        const cacheKey = `popularHistory_${historyId}`;

        // Check if the popular history exists in cache
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Fetch popular history from the database
        const response = await axios.get(`${dbAddress}${dbName}/${historyId}`);

        // Store the fetched data in cache
        cache.set(cacheKey, response.data);

        return response.data;
    };

    // delete users' search history by id
    const deleteSearchHistory = (historyId, rev) => {
        return axios.delete(`${dbAddress}${dbName}/${historyId}?rev=${rev}`);
    }

    return {
        recordSearchHistory, fetchSearchHistory, fetchPopularHistory, deleteSearchHistory
    };
}

module.exports = UserHistoryService;

