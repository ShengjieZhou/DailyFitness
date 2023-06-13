const UserHistoryService = require("../Service/UserHistoryService");

const UserServiceController = (req, res, dbAddress) => {
    const userHistoryService = new UserHistoryService(dbAddress);

    const handleRequest = (promise, successMessage, errorMessage) => {
        promise
            .then(response => {
                console.log(successMessage, response.data);
                const results = response.data.rows;
                res.json(results);
            })
            .catch(error => {
                console.error(errorMessage, error);
                res.status(500).json({ message: errorMessage });
            });
    };

    const recordSearchHistory = (object, target) => {
        handleRequest(userHistoryService.recordSearchHistory(object, target),'Search history saved:','Search history failed to save:')
    }

    const fetchSearchHistory = () => {
        handleRequest(userHistoryService.fetchSearchHistory(),'Fetch History Success:','Failed to fetch history:')
    }

    const deleteSearchHistory = (historyId, rev) => {
        handleRequest(userHistoryService.deleteSearchHistory(historyId, rev),'History deleted:', 'History failed to delete:')
    }
    return {
        recordSearchHistory, fetchSearchHistory, deleteSearchHistory
    };
}

module.exports = UserServiceController;

