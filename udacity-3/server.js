// Setup empty JS object to act as endpoint for all routes
const projectData={};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();

/* Middleware*/
const bodyParser=require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=3000;

const server=app.listen(port,(error)=>{
    if(error) console.log("ERROR: ", error);
    else console.log(`Server is running on: ${port}`);
})


app.post('/addWeather',(req,res)=>{
    projectData.zipCode=req.body.zipCode;
    projectData.country=req.body.country;
    projectData.date=req.body.date;
    projectData.temp=req.body.temp;
    projectData.content=req.body.content;
    res.end();
})

app.get('/getWeather', (req,res)=>{
    res.send(projectData);
    res.end();
})