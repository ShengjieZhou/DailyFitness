const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 5000;
const service = 'http://localhost:5984/';

const username = 'admin';
const password = 'Password';

const credentials = Buffer.from(`${username}:${password}`).toString('base64');
const headers = { Authorization: `Basic ${credentials}` };

app.use(cors());
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello from the backend!'
  };
  res.json(data);
});

app.get('/api/recipe', (req, res) => {
  const type = req.query.type; 
  let url = service + 'receipt/_design/api/_view/' + type + 'Recipe';
  axios.get( url, { headers })
    .then(response => {
      const results = response.data.rows;
      res.json(results); 
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' }); 
    });
});

app.post('/api/newRecipe', (req, res) => {
  const newData = req.body; 
  //插入数据库 待完成
  console.log(newData);
  res.sendStatus(200); 
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});