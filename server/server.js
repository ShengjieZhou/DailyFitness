const UserServiceController = require("./Controller/UserServiceController");
const RecipeController = require("./Controller/RecipeController");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
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

app.post('/api/recordUserHistory', (req, res) => UserServiceController(req, res, service).recordSearchHistory());

app.delete('/api/deleteUserHistory/:historyId',(req, res) => {
    const {historyId} = req.params;
    UserServiceController(req,res,service).deleteSearchHistory(historyId)
});

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