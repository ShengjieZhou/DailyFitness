const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());


app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello from the backend!'
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});