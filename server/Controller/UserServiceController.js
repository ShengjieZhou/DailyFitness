import UserHistoryService from "../Service/UserHistoryService";

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
        handleRequest(userHistoryService.recordSearchHistory(object),'搜索历史已保存:','保存搜索历史失败:')
    }

    const deleteSearchHistory = (historyId) => {
        handleRequest(userHistoryService.deleteSearchHistory(historyId),'历史记录已删除:', '删除历史记录失败:')
    }
    return {
        recordSearchHistory, deleteSearchHistory
    };
}

export default UserServiceController;

