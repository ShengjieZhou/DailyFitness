const RecipeService = require("../Service/RecipeService");
const Cache = require("../Service/CacheManager");

const cache = new Cache();

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
        // check if exists in cache
        const cachedValue = cache.get(type);
        if (cachedValue) {
            // return value in cache
            return Promise.resolve(cachedValue);
        } else {
            recipeService.getRecipe(type)
                .then(response => {
                    const newRecipe = response;
                    // save search result in cache and return it
                    cache.set(type, newRecipe);
                    handleRequest(recipeService.getRecipe(type),'success:','fail:');
                })
        }

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




