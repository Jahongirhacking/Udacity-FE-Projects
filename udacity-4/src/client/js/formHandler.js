const url_api = {};
const spinner = `<i class="fas fa-spinner fa-pulse">`;
const blank = document.querySelectorAll("p>span"); 

async function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    url_api.base = document.getElementById('url').value
    if(Client.checkForURL(url_api.base)){

        document.getElementById("submit").value="Searching...";
        document.getElementById("article_url").innerHTML=url_api.base;
        for(let span of blank){
            span.innerHTML=spinner;
        }

        await postData('/createApi',{url:url_api.base})
        .then(() => getAPI('/api'))
        .then((res)=>{
            getData(url_api.name)
        })
        .catch(error=>console.log("Error on posting ",error))

    }else{
        alert("URL is inappropriate, please try again with another URL!")
    }   
    return 1; 
}

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .catch (error => {
        console.log('error', error);
    })
};

const getAPI = async (url = "") => {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        url_api.name=data.name;
    })
    .catch (error => {
        console.log('error', error);
    })
}

const getData = async (url = "") => {
    await fetch(url)
    .then(res => res.json())
    .then(data => UI(data))
    .catch (error => {
        console.log('error', error);
    })
}

const UI = (data)=>{
    if(data.agreement==undefined){
        clearUI();
        return 0;
    }
    document.getElementById("url").value="";
    document.getElementById("article_url").innerHTML=url_api.base;
    document.getElementById("agreement").innerHTML=data.agreement;
    document.getElementById("confidence").innerHTML=data.confidence;
    document.getElementById("irony").innerHTML=data.irony;
    document.getElementById("subjectivity").innerHTML=data.subjectivity;
    document.getElementById("score").innerHTML=emotions(data.score_tag);
    document.getElementById("submit").value="Submit";
}

const clearUI = ()=>{
    for(let span of blank){
        span.innerHTML="";
    }
    document.getElementById("submit").value="Submit";
    alert("The article was not been found!");
}
const emotions = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEU':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit}
