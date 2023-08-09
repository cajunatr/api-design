var express = require('express');
var router = express.Router();
const sql = require('../obdc.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//test connection 
router.get('/main', async function(req, res, next) {
  try {
    const result = await sql.main(); 
    res.json(result);
  } catch (err) {
    next(err); 
  }
});

//upload to github. Host it on Render.com, troubleshoot 



module.exports = router;
