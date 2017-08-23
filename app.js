var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
code = '';
var { SingleSignOn } = require('eve-singlesignon');




app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});




app.use(bodyParser.json());
Api = require('./models/getapi');
Key = require('./models/Key')



mongoose.connect('mongodb://gavaghan:A34bc2km6sj@ds163181.mlab.com:63181/heroku_7jqz68q8');
var db = mongoose.connection;

app.get('/', function (req, res) {
  res.send('500 Internal Server Error Sorry, something went wrong.A team of highly trained monkeys has been dispatched to deal with this situation. If you see them, show them this information: =BKJLKJbkoh87hoijnUOY*&980BNjkbiubU*(O)HUNiunbouyH*&HGOuih87HBO*7hgouibhiouy8GV)*(&GVbiyuovbouYVyhubvouYGO8yvb89oY&VoYU0)-yVTY&9');
});

//get the api key old
app.get('/api/getapi', function (req, res) {
  Api.getApi(function (err, Api) {
    if (err) {
      throw err;
    }
    res.json(Api);

  });
});

//make a new apikey old
app.post('/api/getapi', function (req, res) {
  var apis = req.body;
  Api.addApi(apis, function (err, apis) {
    if (err) {
      throw err;
    }
    res.json(apis);
  });
});




const sso = new SingleSignOn(Key.CLIENT_ID, Key.SECRET_KEY, Key.CALLBACK_URL);
// get the NEW keys
app.get('/key', function (req, res) {
  AT = '';
  RF = '';
  CI = '';
  CN = '';

  // Get an access token for this authorization code
  sso.getAccessToken(req.query.code).then(result => {
    // The result contains the access token and expiry time


    // Store the access token so you can use it later
    AT = result.access_token;
    RF = result.refresh_token;
    // Access basic character info
    return sso.verifyAccessToken(result.access_token);
  })
    .then(result => {
      // We now have some basic info...

      CI = result.CharacterID;
      CN = result.CharacterName;


      var apis = {
        "Access_Token": AT,
        "Refresh_Token": RF,
        "Character_ID": CI,
        "Character_Name": CN
      };
      Api.addApi(apis, function (err, apis) {
        if (err) {
          throw err;
        }

      });
      return res.redirect('http://localhost:3000/');
    });
});


app.get('/RF', function (req, res) {

  rf = req.query.rf;
  id = req.query.id;
  at = "";


  sso.getAccessToken(rf, refresh_token = true).then(result => {

    at = result.access_token;

    return sso.verifyAccessToken(result.access_token);
  })
    .then(result => {
      Api.updateApi(id, at);
      jres = JSON.stringify({ ntoken: at });
      res.json(at)
    });
});







app.listen(8000);
console.log('runing port' + 8000);





