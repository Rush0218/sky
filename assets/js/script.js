var button = document.querySelector(".search-btn"); 
var apiKey = "2fe3148386e179649114eb803859fdb2";




//create function to fetch current weather conditions for searched locations.
function getWeather(location) {
    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + apiKey;
    fetch(queryUrl).then(function(response) {
       return response.json(); 
    }).then(function(data) {
        displayWeather(data);  
    })
}; 

//create function to display certain information on the main container
function displayWeather(data) {
    var { name } = data; 
    var { lat, lon } = data.coord;
    var { icon, description } = data.weather[0]; 
    var { temp, humidity } = data.main; 
    var { speed } = data.wind; 
    document.querySelector(".place").textContent = name; 
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").textContent = description; 
    document.querySelector(".temp").textContent = temp + " °F"; 
    document.querySelector(".humidity").textContent = "humidity: " + humidity + "%"; 
    document.querySelector(".wind").textContent = "wind: " + speed + "kmh";
    
    //set each search item in locasl storage
    var history = document.querySelector(".search-history");
    var list = document.querySelector(".search-list");
    var listItem = document.createElement("button");

    localStorage.setItem("history", name); 
    listItem.className = "search-again"
    listItem.textContent = localStorage.getItem("history"); 
    list.appendChild(listItem); 
    history.setAttribute("style", "display: block"); 
    

    getForecast(lat, lon); 
};


//create a function to fetch daily forecasts for searched locations
function getForecast(lat, lon) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,alerts,minutely&units=imperial&appid=" + apiKey; 
    fetch(queryUrl).then(function(response) {
         return response.json(); 
    }).then(function(data) {
        displayForecast(data); 
    })
}; 


//created a function to display the daily forecast data into the card container
function displayForecast(data) {
    //day 1  of forecast
    var { dt } = data.daily[1]; 
    var { uvi } = data.current; 
    var { icon, description } = data.daily[1].weather[0]; 
    var { max } = data.daily[1].temp; 
    var { humidity } = data.daily[1]; 
    var { wind_speed } = data.daily[1]; 
 
    var date = new Date(dt * 1000); 
    document.querySelector(".date1").textContent = date.toDateString(); 
    document.querySelector("#uv").textContent = "UV Index: " + uvi; 
    var uvColor = document.querySelector("#uv");
    
        if (uvi <= 2) {
            uvColor.setAttribute("class", "green"); 
    } else if (uvi > 2 && uvi <= 5) {
            uvColor.setAttribute("class", "yellow"); 
        } else {
            uvColor.setAttribute("class", "red"); 
    };
    document.querySelector("#icon1").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description1").textContent = description; 
    document.querySelector("#temp1").textContent = max + " °F"; 
    document.querySelector("#humidity1").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind1").textContent = "wind: " + wind_speed + "kmh";


    //day 2 of forecast
    var { dt } = data.daily[2];  
    var { icon, description } = data.daily[2].weather[0]; 
    var { max } = data.daily[2].temp; 
    var { humidity } = data.daily[2]
    var { wind_speed } = data.daily[2]; 

    var date = new Date(dt * 1000);
    document.querySelector(".date2").textContent = date.toDateString(); 
    document.querySelector("#icon2").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description2").textContent = description; 
    document.querySelector("#temp2").textContent = max + " °F"; 
    document.querySelector("#humidity2").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind2").textContent = "wind: " + wind_speed + "kmh";


    //day 3 of forecast
    var { dt } = data.daily[3];  
    var { icon, description } = data.daily[3].weather[0]; 
    var { max } = data.daily[3].temp; 
    var { humidity } = data.daily[3]
    var { wind_speed } = data.daily[3]; 
    
    var date = new Date(dt * 1000);
    document.querySelector(".date3").textContent = date.toDateString();
    document.querySelector("#icon3").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description3").textContent = description; 
    document.querySelector("#temp3").textContent = max + " °F"; 
    document.querySelector("#humidity3").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind3").textContent = "wind: " + wind_speed + "kmh";


    //day 4 of forecast
    var { dt } = data.daily[4];  
    var { icon, description } = data.daily[4].weather[0]; 
    var { max } = data.daily[4].temp; 
    var { humidity } = data.daily[4]
    var { wind_speed } = data.daily[4]; 

    var date = new Date(dt * 1000);
    document.querySelector(".date4").textContent = date.toDateString();
    document.querySelector("#icon4").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description4").textContent = description; 
    document.querySelector("#temp4").textContent = max + " °F"; 
    document.querySelector("#humidity4").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind4").textContent = "wind: " + wind_speed + "kmh";

    
    //day 5 of forecast
    var { dt } = data.daily[5];  
    var { icon, description } = data.daily[5].weather[0]; 
    var { max } = data.daily[5].temp; 
    var { humidity } = data.daily[5]
    var { wind_speed } = data.daily[5]; 

    var date = new Date(dt * 1000);
    document.querySelector(".date5").textContent = date.toDateString();
    document.querySelector("#icon5").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description5").textContent = description; 
    document.querySelector("#temp5").textContent = max + " °F"; 
    document.querySelector("#humidity5").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind5").textContent = "wind: " + wind_speed + "kmh";

    //display forecast 
    var displayCard = document.querySelector(".future-forecast"); 
    displayCard.setAttribute("style", "display: flex"); 
}; 

function search() {
    getWeather(document.querySelector(".search-info").value); 
}; 



button.addEventListener("click", search);