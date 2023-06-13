const axios = require('axios');
const dbName = 'userHistory';
const cache = require('CacheManager');

const UserHistoryService = (dbAddress) => {
    // record users' search history in the database
    const recordSearchHistory = (object) => {
        const timestamp = new Date().toISOString();
        // define the elements needed to be record
        const record = {
            time: timestamp,
            object: object
        };
        return axios.post(`${dbAddress}/${dbName}`, record)
    }

    // fetch users' search history
    const fetchSearchHistory = () => {
        return axios.get(`${dbAddress}/${dbName}`)
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
        const response = await axios.get(`${dbAddress}/${dbName}/${historyId}`);

        // Store the fetched data in cache
        cache.set(cacheKey, response.data);

        return response.data;
    };

    // delete users' search history by id
    const deleteSearchHistory = (historyId) => {
        return axios.delete(`${dbAddress}/${dbName}/${historyId}`);
    }

    return {
        recordSearchHistory, fetchSearchHistory, fetchPopularHistory, deleteSearchHistory
    };
}

//export default UserHistoryService;
module.exports = UserHistoryService;

