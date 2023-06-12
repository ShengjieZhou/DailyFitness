const UserServiceController = require("./Controller/UserServiceController");
const RecipeController = require("./Controller/RecipeController");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

/**
 * database connection
 */
const service = 'http://localhost:5984/';

const username = 'admin';
const password = 'Password';

const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const headers = {Authorization: `Basic ${credentials}`};

/**
 * middleware
 */
app.use(cors());
app.use(bodyParser.json());

/**
 * api routes
 */
//test api
app.get('/api/data', (req, res) => {
    const data = {
        message: 'Hello from the backend!'
    };
    res.json(data);
});

//get recipe
app.get('/api/recipe', (req, res) => {
    const type = req.query.type;
    RecipeController(req, res, service, headers).getRecipe(type);
});

//add recipe 
app.post('/api/newRecipe', (req, res) => {
    let newData = req.body;
    RecipeController(req, res, service, headers).addRecipe(newData);
});

// record user's search history
app.post('/api/diary/recordUserHistory', (req, res) => UserServiceController(req, res, service).recordSearchHistory());

// fetch user's search history
app.get('/api/diary/fetchUserHistory', (req, res) => UserServiceController(req, res).fetchSearchHistory());

// delete user's search history by id
app.delete('/api//diary/deleteUserHistory/:historyId', (req, res) => {
    const {historyId} = req.params;
    UserServiceController(req, res, service).deleteSearchHistory(historyId)
});

/**
 * Startup server
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});