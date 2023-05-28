var express = require('express');
var router = express.Router();
var database = require('../models/DailyFitness.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', async (req, res) => {
  try {
    const result = await database.isExists();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
