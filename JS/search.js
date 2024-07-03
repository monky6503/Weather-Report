const searchElement = document.querySelector(".search-btn");
const inputElement = document.querySelector(".js-input-city");
const cityElement = document.querySelector(".js-city span");
const weatherElement = document.querySelector(".js-weather span");
const tempElement = document.querySelector(".js-temp span");
const popElement = document.querySelector(".js-pop span");
const CIElement = document.querySelector(".js-ci span");
const IconElement = document.querySelector(".weather_icon")
const infoElement = document.querySelector(".info");

url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-C7E3004B-A2E9-4392-8565-09EB9EB71922';


searchElement.addEventListener("click",function(){
  let inputCity = inputElement.value;
  if(!inputCity){
    alert("Please enter your location!!!");
    infoElement.classList.remove("block");
    infoElement.classList.add("hidden");
  }else{
    const now = new Date()
    const hours = now.getHours();

    fetch(url)
    .then((response) =>{
      return response.json();
    })
    .then((response) =>{
      let locations = response["records"]["location"];
      let data = [];
      locations.forEach(location =>{
        let obj = {
          city:location["locationName"],
          weather:location["weatherElement"][0]["time"][0]["parameter"]["parameterName"],
          weatherIconNumber:location["weatherElement"][0]["time"][0]["parameter"]["parameterValue"],
          pop:location["weatherElement"][1]["time"][0]["parameter"]["parameterName"],
          MinT:location["weatherElement"][2]["time"][0]["parameter"]["parameterName"],
          CI:location["weatherElement"][3]["time"][0]["parameter"]["parameterName"],
          MaxT:location["weatherElement"][4]["time"][0]["parameter"]["parameterName"]
        };
        data.push(obj);
      })

      let day_Night = (hours >18 || hours <6)?"night":"day";

      const result = data.filter(obj => obj.city === inputCity);
      if(result.length === 0){
        alert("Location not found please enter another one");
        infoElement.classList.remove("block");
        infoElement.classList.add("hidden");
      } else{
        infoElement.classList.remove("hidden");
        infoElement.classList.add("block");
        let IconNumber = ("0"+result[0]["weatherIconNumber"]).slice(-2);
        IconElement.src = `https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${day_Night}/${IconNumber}.svg`;
        cityElement.innerHTML = result[0]["city"];
        weatherElement.innerHTML = result[0]["weather"];
        tempElement.innerHTML = `${result[0]["MinT"]} &deg;C ~ ${result[0]["MaxT"]} &deg;C`;
        popElement.innerHTML = `${result[0]["pop"]}%`;
        CIElement.innerHTML = result[0]["CI"];
      }
    })
  }
})

