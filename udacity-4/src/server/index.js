const dotenv = require('dotenv');
dotenv.config();
const baseURL="https://api.meaningcloud.com/sentiment-2.1?";
const apiKey=process.env.API_KEY;

var path = require('path');
const express = require('express');
const app = express();
//Middle-Ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Cross origin allowance
const cors = require('cors');
app.use(cors());

const mockAPIResponse = require('./mockAPI.js');
const { send } = require('process');

const port=3031;

app.use(express.static('dist'));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(port, (error) => {
    if(error) console.log("Error occured ",error);
    else console.log(`Example app listening on port ${port}!`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    res.end();
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
    res.end();
})

const apiURL={};
app.post('/createApi', (req,res)=>{
    const url=req.body.url;
    apiURL.name = `${baseURL}key=${apiKey}&url=${url}&lang=en`;
    console.log(apiURL.name);
    res.end();
})

app.get('/api', (req,res)=>{
    res.send(apiURL);
    res.end();
})
