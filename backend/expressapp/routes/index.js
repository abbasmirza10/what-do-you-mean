var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var axios = require('axios');

const logModelOut = false;

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m'
const RESET = '\x1b[0m';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'WDYM' });
});

/* GET analysis page. */
router.get('/analysis', function(req, res) {
  res.render('analysis', { title: 'Analysis - WDYM' });
});

/* API */
router.all('/model', function(req, res) {

  var data = '';
  if (req.method == 'GET') {
    data = req.body;
  } else if (req.method == 'POST') {
    data = req.body;
  }

  const url = 'http://localhost:5000';
  const config = {headers: {'Content-Type': 'application/json'}};

  axios.post(url, data, config)
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      console.log(`MODEL responded with status ${GREEN}${response.status}${RESET}`);
      if (logModelOut) {
        console.log(response.data);
      }
      res.json(response.data);
    }
  }).catch(err => {
    // respond with error message only in development
    if (req.app.get('env') == 'development') {
      if (err.response) {
        console.log(`MODEL responded with status ${RED}${err.response.status}${RESET}`);
        res.status(err.response.status).json(err.response.data);
      } else {
        console.log(`MODEL failed to connect to model`);
        res.status(500).json({error: 'Model server refused to connect.'});
      }
    } else {
      res.status(500).json({error: 'Internal server error.'});
    }
  })
});

module.exports = router;