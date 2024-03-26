/* Global Variables */

const button = document.querySelector('#generate');
const date = document.querySelector('#date');
const tempreture = document.querySelector('#temp');
const content = document.querySelector('#content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = 'e547b287422d9930c327cb1a6ebf7933';

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
button.addEventListener('click',()=>{
  const zipcode = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;
  if(!zipcode){
    alert('Please insert your Zipcode')
  }else if (!feelings) {
    alert('Please insert your feelings')
  }else {
    getWeatherData(zipcode)
    .then((temp)=>{
      postData(temp,feelings);
      return getData();
    })
    .then((projectData)=>{
      date.innerHTML = `Date: ${projectData.date}`;
      tempreture.innerHTML = `Temperture: ${projectData.temp}`;
      content.innerHTML = `Feelings: ${projectData.feelings}`;
    });
  }
})


/* Function to GET Web API Data*/
async function getWeatherData(zipcode){
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=metric`);
  try{
    const data = await res.json();
    return data.main.temp;
  }catch(e){
    console.log(`error: ${e}`);
  }
}

/* Function to POST data */
async function postData(temp,feelings){
  await fetch('/postData', {
    method: 'POST',
    credentials:'same-origin',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify({
      date: newDate,
      temp: temp,
      feelings: feelings,
    }),
  });
}


/* Function to GET Project Data */
async function getData(){
  const res = await fetch('/all');
  try{
    const data = await res.json();
    return data;
  }catch(e){
    console.log(`error: ${e}`);
  }
}
