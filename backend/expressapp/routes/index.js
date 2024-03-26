var express = require('express');
var router = express.Router();
var spawn = require("child_process").spawn;

const logReqQuery = false;
const logStdout = true;
const logStderr = true;
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
  if (logReqQuery) {
    console.log(req.query);
  }
  sampleQuery = {'sentence': 'Ashley fell asleep...', 'mode': 0};
  const data = JSON.stringify(req.query);

  // Creates a child process that runs the model
  const pythonProcess = spawn('python3', ['main.py', data]);

  // stdout is parsed into a dictionary, stderr is stored in an array
  var modelStdout = {};
  var modelStderr = '';
  
  pythonProcess.stdout.on('data', (data) => {
    if (logStdout) {
      console.log(`MODEL returns: ${data}`);
    }
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
      if (logStderr) {
        console.log(`${RED}${modelStderr}${RESET}`);
      }
      res.status(500).json({'error': `model.py exited with code ${code}`});
    }
  });
});

module.exports = router;