const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  var data = fs.readFileSync('db.json'); // read db.json
  var parsedData = JSON.parse(data); // parse the json file
  parsedData.members.push(req.body); // add the new member data into the parsedData
  const result = JSON.stringify(parsedData, null, 2); // stringify the data and keep format
  fs.writeFile('db.json', result, (err) => { // update db.json
    if (err) throw err;
    console.log('Member has been added!')
  });
  res.json(parsedData.members);
});

// Update Member
app.put('/api/members/:id', (req, res) => {
  var data = fs.readFileSync('db.json'); // read db.json
  var parsedData = JSON.parse(data); // parse the json file
  var foundIndex = parsedData.members.findIndex(x => x.id == req.params.id) // find index of the data
  parsedData.members.splice(+foundIndex, 1, req.body); // replace member data using splice
  const result = JSON.stringify(parsedData, null, 2); // stringify the data and keep format
  fs.writeFile('db.json', result, (err) => { // update db.json
    if (err) throw err;
    console.log('Member has been updated!');
  });
  res.status(200).json(parsedData.members);
})

// Delete Member
app.delete('/api/members/:id', (req, res) => {
  var data = fs.readFileSync('db.json'); // read db.json
  var parsedData = JSON.parse(data); // parse the json file
  var foundIndex = parsedData.members.findIndex(x => x.id == req.params.id) // find index of the data
  parsedData.members.splice(+foundIndex, 1); // delete member data using splice
  const result = JSON.stringify(parsedData, null, 2); // stringify the data and keep format
  fs.writeFile('db.json', result, (err) => { // update db.json
    if (err) throw err;
    console.log('Member has been deleted!');
  });
  res.status(200).json(parsedData.members);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
