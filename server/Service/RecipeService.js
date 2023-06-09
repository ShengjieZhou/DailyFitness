const axios = require('axios');



function RecipeService(dbAddress, headers) {

    this.dbAddress = dbAddress;
    this.headers = headers;

    const getRecipe = (type) => {
        let url = dbAddress + 'receipt/_design/api/_view/' + type + 'Recipe';
        return axios.get(url, { headers });
    }

    const addRecipe = (newData) => {
        return new Promise((resolve, reject) => {
            let sort = 1;
            // get sort number
            let url = dbAddress + 'receipt/_design/api/_view/getMaxNum?group=true';
            axios.get(url, { headers })
                .then(response => {
                    const results = response.data.rows;
                    results.forEach(element => {
                        if (element.key == newData.type) {
                            sort = element.value + 1;
                        }
                    });
                    newData = {
                        sort: sort.toString(),
                        type: newData.type,
                        title: newData.title,
                        step: newData.step
                    }
                    resolve(newData);
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    const postRecipe = (data) => {
        return axios.post(dbAddress + '/receipt', data, { headers });;
    }

    return {
        getRecipe, addRecipe, postRecipe
    };
}

module.exports = RecipeService;