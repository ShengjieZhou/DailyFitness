const DietaryService = require('../Service/DietaryService');

function RecipeController (req, res, dbAddress, headers) {
    var dietaryService = new DietaryService(dbAddress, headers);
    var data = req.body;

    const handleRequest = (promise, successMessage, errorMessage) => {
        promise
            .then(response => {
                console.log(response.data);
                const results = response.data.rows;
                res.json(results);

            })
            .catch(error => {
                console.error(errorMessage, error);
                res.status(500).json({ message: errorMessage });
            });
    };

    const getDietary = (labels) => {
        handleRequest(dietaryService.getDietary(labels),'success:','fail:');
    }

    

    return {
        getDietary
    };
}
module.exports = RecipeController;




