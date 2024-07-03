const searchElement = document.querySelector(".search-btn");
const inputElement = document.querySelector(".js-input-city");
const cityElement = document.querySelector(".js-city span");
const weatherElement = document.querySelector(".js-weather span");
const tempElement = document.querySelector(".js-temp span");
const popElement = document.querySelector(".js-pop span");
const humidityElement = document.querySelector(".js-hum span");
const IconElement = document.querySelector(".weather_icon")
const infoElement = document.querySelector(".info");

url = 'https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}';
APIKey = "8b8416997bb7b90d2a3faabd027a1950";
lang = "zh_tw"


searchElement.addEventListener("click",()=>{
  let inputCity = inputElement.value;
  if(!inputCity){
    alert("Please enter your location!!!");
    infoElement.classList.add("hidden");
  }else{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIKey}&units=metric&lang=${lang}`)
    .then((response) =>{
      return response.json();
    }).then((response)=>{
      if(response.cod==='404'){
        alert(response.message);
        infoElement.classList.add("hidden");
      }else{
        infoElement.classList.remove("hidden")
        let iconNumber = response["weather"][0]["icon"];
        IconElement.src = `https://openweathermap.org/img/wn/${iconNumber}@2x.png`;
        cityElement.innerHTML = response["name"];
        tempElement.innerHTML = `${response["main"]["temp_min"]} &degC~${response["main"]["temp_max"]} &deg;C`;
        weatherElement.innerHTML = response["weather"][0]["description"];
        humidityElement.innerHTML = `${response["main"]["humidity"]}%`;
      }
    })
  }
})