var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var axios = require('axios');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m'
const RESET = '\x1b[0m';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Raccoons' });
});

/* API */
router.all('/model', function(req, res) {

  const data = JSON.stringify(req.query);

  const url = 'http://localhost:5000';
  const config = {headers: {'Content-Type': 'application/json'}};

  axios.post(url, data, config)
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      console.log(`MODEL responded with status ${GREEN}${response.status}${RESET}`);
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

/* API using child processes (defuncted) */
router.all('/model/childprocess', function(req, res) {

  console.log(req.query);
  const data = JSON.stringify(req.query);

  // Creates a child process that runs the model
  const pythonProcess = spawn('python3', ['model-child-process.py', data]);

  // stdout is parsed into a dictionary, stderr is stored in an array
  var modelStdout = {};
  var modelStderr = '';
  
  pythonProcess.stdout.on('data', (data) => {
    console.log(`MODEL returns: ${data}`);
    modelStdout = JSON.parse(data);
  });

  // Note that stderr.on is called on every level of the error traceback
  pythonProcess.stderr.on('data', (data) => {
    modelStderr += data;
  });
  
  pythonProcess.on('close', (code) => {
    if (code == 0) {
      console.log(`MODEL exited with code ${GREEN}${code}${RESET}`);
      res.json(modelStdout);
    } else {
      console.log(`MODEL exited with code ${RED}${code}${RESET}`);
      console.log(`${RED}${modelStderr}${RESET}`);
      res.status(500).json({'error': `model.py exited with code ${code}`});
    }
  });
});

module.exports = router;