//import UserHistoryService from "../Service/UserHistoryService";
const UserHistoryService = require("../Service/UserHistoryService");

const UserServiceController = (req, res, dbAddress) => {
    const userHistoryService = new UserHistoryService(dbAddress);
    const {object} = req.body;

    const handleRequest = (promise, successMessage, errorMessage) => {
        promise
            .then(response => {
                console.log(successMessage, response.data);
                res.status(200).json({ message: successMessage });
            })
            .catch(error => {
                console.error(errorMessage, error);
                res.status(500).json({ message: errorMessage });
            });
    };

    const recordSearchHistory = () => {
        handleRequest(userHistoryService.recordSearchHistory(object),'Search history saved:','Search history failed to save:')
    }

    const fetchSearchHistory = () => {
        handleRequest(userHistoryService.fetchSearchHistory(),'Fetch History Success:','Failed to fetch history:')
    }

    const deleteSearchHistory = (historyId) => {
        handleRequest(userHistoryService.deleteSearchHistory(historyId),'History deleted:', 'History failed to delete:')
    }
    return {
        recordSearchHistory, fetchSearchHistory, deleteSearchHistory
    };
}

module.exports = UserServiceController;
//export default UserServiceController;

