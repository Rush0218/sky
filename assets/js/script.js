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
    var { icon, description } = data.weather[0]; 
    var { temp, humidity } = data.main; 
    var { speed } = data.wind; 
    document.querySelector(".place").textContent = name; 
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").textContent = description; 
    document.querySelector(".temp").textContent = temp + " °F"; 
    document.querySelector(".humidity").textContent = "humidity: " + humidity + "%"; 
    document.querySelector(".wind").textContent = "wind: " + speed + "kmh";

    localStorage.setItem("history", name); 
    var list = document.querySelector(".search-list");
    var listItem = document.createElement("button");
    var history = document.querySelector(".search-history");
    listItem.textContent = localStorage.getItem("history"); 
    list.appendChild(listItem); 
    history.setAttribute("style", "display: block"); 

    
    getForecast(name); 
};


//create a function to fetch daily forecasts for searched locations
function getForecast(location) {
    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&appid=" + apiKey; 
    fetch(queryUrl).then(function(response) {
         return response.json(); 
    }).then(function(data) {
        //displayForecast(data); 
    })
}; 


//created a function to display the daily forecast data into the card container
function displayForecast(data) {
    var { dt_txt } = data.list[0]; 
    var { icon } = data.list[0].weather[0]; 
    var { description } = data.list[0].weather; 
    var { temp } = data.list[0].main; 
    var { humidity } = data.list[0].main
    var { speed } = data.list[0].wind; 
    document.querySelector(".date1").textContent = dt_txt; 
    document.querySelector("#icon1").src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector("#description1").textContent = description; 
    document.querySelector("#temp1").textContent = temp + " °F"; 
    document.querySelector("#humidity1").textContent = "humidity: " + humidity + "%"; 
    document.querySelector("#wind1").textContent = "wind: " + speed + "kmh";
    
    var displayCard = document.querySelector(".future-forecast"); 
    displayCard.setAttribute("style", "display: contents"); 
}; 
    
    




function search() {
    getWeather(document.querySelector(".search-info").value); 
    getForecast(document.querySelector(".search-info").value); 
}; 

button.addEventListener("click", search);