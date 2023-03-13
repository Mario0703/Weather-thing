//DOM elements that the user can interact with
const Search       =  document.getElementById("Search-Field");
const SearchButton =  document.getElementById("Search-Button");
const SearchedCity =  document.getElementById("city");
const FeelsLike    =  document.getElementById("FeelsLikeTemp");
const Temprature   =  document.getElementById("Temp");
const CurrentTime  =  document.getElementById("CurrentTime");
const WindSpeed    =  document.getElementById("Windspeed");
const Humidity     =  document.getElementById("Humidity");
const weather      =  document.getElementById("Weather");
const WeatherCondition = document.getElementById("Weather-description")

const ImagesLocation = ["Images/FeelsLike.png","Images/temperature.svg","Images/Humidity.png","Images/wind-blow.png"];
const Images = [];

let API = "https://api.openweathermap.org/data/2.5/weather?q=&appid=db22b0db45514e9d3d4ebd192516153e";
//Adds an eventListener when the user clicks the search button, the api wil search for a city in the ShorAPIdata function
SearchButton.addEventListener("click",ShowAPIdata);

for(let i = 0; i<4; i++){
    const img = document.createElement("img")
    img.src = ImagesLocation[i]
    img.style.width = "30px"
    img.style.height = "30px"
    Images.push(img)
}

console.log(Images[0])
function ShowAPIdata(){
    const searchValue = Search.value
    //If string is empty say to user search field is empty
    if(searchValue.trim() ==''){
        alert("You did not enter a city")
        return
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Search.value}&appid=db22b0db45514e9d3d4ebd192516153e&units=metric`)
    .then(response =>{
        //Throw new error if the city is not found with the API
        if(!response.ok){
            throw new Error('City not found')
        }
        return response.json();
    })
    //Logs the data to the weather-div
    .then(data => {

            let main = data.main
            let WeatherDescreption = data.weather[0].description
            console.log(WeatherDescreption)
            if(Temprature.classList.contains("weather-info")){
            weather.classList.toggle('expanded')
            weather.addEventListener('transitionend',ShowData)
            console.log(data.wind.speed)
            }

            else{
                ShowData()
            }

            function ShowData(){
            if(data.weather[0].description == "overcast clouds"){
                console.log("wasds")
                WeatherCondition.classList.remove("weather-info")
                WeatherCondition.setAttribute("src","Images/ClearSky.png") 
            }
            else if (data.weather[0].description == "clear sky"){
                WeatherCondition.classList.remove("weather-info")
                WeatherCondition.setAttribute("src","Images/Sun.png")

            }
            else if (data.weather[0].description == "moderate rain"){
                WeatherCondition.classList.remove("weather-info")
                WeatherCondition.setAttribute("src","Images/Rain.png")
            }
            else{
                WeatherCondition.setAttribute("src","")

            }
            FeelsLike.innerText = `Feels like: ${main.feels_like}°C`;
            Temprature.innerText = `${main.temp}°C`;
            Humidity.innerText = `Humidity: ${main.humidity}%`;
            WindSpeed.innerText = `${data.wind.speed}KP/H`
            Temprature.appendChild(Images[1]);
            Humidity.appendChild(Images[2]);
            FeelsLike.appendChild(Images[0]);
            WindSpeed.appendChild(Images[3]);
            SearchedCity.innerHTML = searchValue;
            FeelsLike.classList.remove("weather-info");
            Temprature.classList.remove("weather-info");
            Humidity.classList.remove("weather-info");
            WindSpeed.classList.remove("weather-info")
            
            }
        })
    .catch(error => console.error(error));
}
