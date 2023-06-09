const RecipeService = require("../Service/RecipeService");

function RecipeController (req, res, dbAddress, headers) {
    var recipeService = new RecipeService(dbAddress, headers);
    var {object} = req.body;

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

    const getRecipe = (type) => {
        handleRequest(recipeService.getRecipe(type),'success:','fail:');
    }

    const addRecipe = (newData) => {
        recipeService.addRecipe(newData)
        .then(newData => {
            handleRequest(recipeService.postRecipe(newData),'success:','fail:');
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' })
            });
    }

    return {
        getRecipe, addRecipe
    };
}

module.exports = RecipeController;
//export default RecipeController;




