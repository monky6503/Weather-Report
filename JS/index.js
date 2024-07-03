url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-C7E3004B-A2E9-4392-8565-09EB9EB71922';

let county = {"北部":["新北市","臺北市","桃園市","基隆市","宜蘭縣","新竹市","新竹縣"],
              "中部":["苗栗縣","臺中市","彰化縣","南投縣","雲林縣"],
              "南部":["嘉義縣","嘉義市","臺南市","高雄市","屏東縣"],
              "東部":["花蓮縣","臺東縣"],
              "離島":["澎湖縣","金門縣","連江縣"]};
let weatherList = ["新北市","臺北市","基隆市","宜蘭縣","桃園市","新竹市","新竹縣",
                   "苗栗縣","臺中市","彰化縣","南投縣","雲林縣",
                   "嘉義縣","嘉義市","臺南市","高雄市","屏東縣",
                   "花蓮縣","臺東縣",
                   "澎湖縣","金門縣","連江縣"];

function findRegion(city) {
  for (let region in county) {
      if (county[region].includes(city)) {
          return region;
      }
  }
  return null;
}

fetch(url)
    .then(response =>{
      return response.json()
    })
    .then(data =>{
      let locations = data["records"]["location"];
      locations.forEach(location =>{
        weatherList[weatherList.indexOf(location["locationName"])] = {
          area:findRegion(location["locationName"]),
          city:location["locationName"],
          weather:location["weatherElement"][0]["time"][0]["parameter"]["parameterName"],
          weatherIconNumber:location["weatherElement"][0]["time"][0]["parameter"]["parameterValue"],
          pop:location["weatherElement"][1]["time"][0]["parameter"]["parameterName"],
          MinT:location["weatherElement"][2]["time"][0]["parameter"]["parameterName"],
          CI:location["weatherElement"][3]["time"][0]["parameter"]["parameterName"],
          MaxT:location["weatherElement"][4]["time"][0]["parameter"]["parameterName"]
        };
      });
      //一開始顯示全部縣市
      updateWeather("全臺");
    })
    .catch(err =>{
      console.log(err);
    })


  

function updateWeather(area){
  let areaWeather = (area === "全臺")? weatherList: weatherList.filter(county => county.area === area);
  const now = new Date()
  const hours = now.getHours();
  let day_Night = (hours > 18 || hours < 6)?"night":"day";
  const infoElement = document.querySelector(".info");
  infoElement.innerHTML = '';
  for(let i=0; i<areaWeather.length;i++){
    let iconNumber = ("0"+areaWeather[i].weatherIconNumber).slice(-2);
    infoElement.innerHTML += `<div data-aos="flip-right" data-aos-easing="linear" data-aos-duration="700">
                                <div class="card bg-gradient-to-bl from-[#C9D6FF] to-[#FFFFFF] w-[370px] shadow-xl justify-self-center">
                                  <h2 class="js-city text-center text-2xl mt-5"><i
                                      class="fa-solid fa-map-location-dot"></i>&nbsp;&nbsp;<span></span>${areaWeather[i].city}
                                  </h2>
                                  <div class="flex flex-col justify-center items-center py-4">
                                    <img src="https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${day_Night}/${iconNumber}.svg" alt=".." class="weather_icon size-40">
                                    <p class="js-weather"><span></span>${areaWeather[i].weather}</p>
                                  </div>
                                  <div class="card-body px-4">
                                    <div class="flex justify-around">
                                      <p class="js-temp mr-2"><i class="fa-solid fa-temperature-full"></i>&nbsp;&nbsp;<span></span>${areaWeather[i].MinT} &deg;C ~ ${areaWeather[i].MaxT} &deg;C</p>
                                      <p class="js-pop mr-2"><i class="fa-solid fa-umbrella"></i>&nbsp;&nbsp;<span></span>${areaWeather[i].pop}%</p>
                                      <p class="js-ci"><i class="fa-solid fa-seedling"></i>&nbsp;&nbsp;<span></span>${areaWeather[i].CI}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
  };
};




const buttonElement = document.querySelectorAll("button");
buttonElement.forEach(button => {
  button.addEventListener("click",() => {
    let Area = button.textContent;
    updateWeather(Area);
  })
})


const time = document.querySelector(".time");
function setTime(){
  const now = new Date();
  let years = now.getFullYear();
  let months = now.getMonth()+1;
  let dates = now.getDate();
  let days = now.getDay();
  let hours = now.getHours();
  let mins = ("0"+now.getMinutes()).slice(-2);
  let seconds = ("0"+now.getSeconds()).slice(-2);
  let separator = (now.getSeconds() % 2 === 0) ? ":" : "&nbsp;";
  const dayNames = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  time.innerHTML = `${years}&nbsp;年&nbsp;${months}&nbsp;月&nbsp;${dates}&nbsp;日&nbsp;${dayNames[days]}&nbsp;&nbsp;${hours}${separator}${mins}${separator}${seconds}`;
}

setTime();
setInterval(setTime,1000);