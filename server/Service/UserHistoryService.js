const axios = require('axios');
const dbName = 'userHistory';

const UserHistoryService = (dbAddress) => {
    // 记录用户搜索记录
    const recordSearchHistory = (object) => {
        const timestamp = new Date().toISOString();
        // 定义需要被记录的用户操作的字段
        const record = {
            time: timestamp,
            object: object
        };
        return axios.post(`${dbAddress}/${dbName}`, record)
    }

    // 删除用户搜索记录
    const deleteSearchHistory = (historyId) => {
        return axios.delete(`${dbAddress}/${dbName}/${historyId}`);
    }

    return {
        recordSearchHistory, deleteSearchHistory
    };
}

export default UserHistoryService;

