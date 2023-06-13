const UserServiceController = require("./Controller/UserServiceController");
const RecipeController = require("./Controller/RecipeController");
const VideoController = require("./Controller/VideoController");
const DietaryController = require("./Controller/DietaryController");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = 5000;

/**
 * database connection
 */
const service = 'http://127.0.0.1:5984/';
const username = 'admin';
const password = 'Password';

const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const headers = {Authorization: `Basic ${credentials}`};

/**
 * middleware
 */
app.use('/api/dietary', createProxyMiddleware({
    target: 'https://api.edamam.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api/dietary': '/api/nutrition-details?app_id=285d285d&app_key=71f2c3d39496a913657716d5af3f17f9'
    }
}));
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
    const { historyId } = req.params;
    UserServiceController(req, res, service).deleteSearchHistory(historyId)
});

app.get('/api/places/nearbysearch', async (req, res) => {
    const { location } = req.query;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    fetch(apiUrl + '?location=' + location + '&radius=5000&type=gym&key=AIzaSyBZjmD-a2Gdodaut8MWuZHGAtz3Euso0qQ')
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error(err));
});

app.get('/api/video', (req, res) => {
    const { topic } = req.query;
    VideoController(req, res, service, headers).getVideo(topic);
});

app.get('/api/advice', (req, res) => {
    const labels = req.query.labels;
    console.log(labels);
    DietaryController(req, res, service, headers).getDietary(labels);
})

//get dietary recommendation
// app.post('/api/dietary', (req, res) => {
//     const jsonData = req.body;
//     // res.send(jsonData);
//     DietaryController(req, res).getDietary(jsonData);
// });

/**
 * Startup server
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});