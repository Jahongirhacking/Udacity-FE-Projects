/* Global Variables */
let zipCode;
let country;
let temp;
let content;
let newDate;
// Personal API Key for OpenWeatherMap API
// https://api.openweathermap.org/data/2.5/weather?zip=94141&appid=62f5922de50fd90ff14ef5af29eb8380&units=imperial
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=62f5922de50fd90ff14ef5af29eb8380&units=imperial';
//OpenWeatherMap.com

// Create a new date instance dynamically with JS
let d = new Date();
let month=d.getMonth()+1;
if(month<10) month='0'+month;
newDate = d.getDate()+'.'+ month+'.'+ d.getFullYear();


const request=(e)=>{
    document.getElementById("generate").innerText="Processing..."
    const zip=document.getElementById('zip').value;
    const apiURL=url+zip+apiKey;
    zipCode=zip;
    content=document.getElementById('feelings').value;
    getAPIData(apiURL)
    .then((d)=>{
        //Post to server /addWeather
        const newObj={
            zipCode: zipCode,
            country: country,
            temp: temp,
            content: content,
            date: newDate
        }
        postData('/addWeather', newObj)
        .then((d)=>{
            //if we capture the object then update UI
            updateUI();
        })
        .catch((error)=>{
            console.log("ERROR: ",error);
        })
    })
}
document.getElementById("generate").addEventListener('click', request)


// get information from OpenWeatherMap.com
const getAPIData= async (url)=>{
    const res=await fetch(url);
    try{
        const newData=await res.json();
        // console.log(newData);
        temp=newData.main.temp;
        country=newData.name+", "+newData.sys.country;
    }catch(error){
        console.log("ERROR: ", error);
        temp=undefined;
        alert("zip code is not found. Please, try again!")
    }
    
}

// Transfer the object to server
const postData= async (url='', data={})=>{
    fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response=>response.json)
    .catch((error)=>{
        console.log("Unexpected Error occured in response");
    })
}

// Get the whole object from /getWeather
const getAllData= async (url='')=>{
    const res=await fetch(url);
    try{
        const newData=await res.json();
        // console.log(newData);
        return newData;
    }catch(error){
        console.log("ERROR: ",error);
    }
    
}

// Update the elements of UI
const updateUI=async ()=>{
    getAllData('/getWeather')
    .then((data)=>{
        if(data.temp!=undefined){
            document.getElementById('zipCode').innerHTML="zip code: "+data.zipCode;
            document.getElementById('country').innerHTML="country: "+data.country;
            document.getElementById('date').innerHTML="date: "+data.date;
            document.getElementById('temp').innerHTML="temp: "+Math.round(data.temp)+" degrees";
            document.getElementById('content').innerHTML="content: "+data.content;

            document.getElementById('zip').value="";
            document.getElementById('feelings').value="";
        }else{
            console.log("Zip code is not found");
        }

        document.getElementById("generate").innerText="Generate";
    })
    .catch((err)=>{
        console.log("ERROR: ",err);
    })
}