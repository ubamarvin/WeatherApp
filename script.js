console.log("Hello")

const weatherUrlStart = ""
//quicker than cutting out the location with substring 
const weatherUrlEnd = ""
const gifUrl = ""

const body = document.querySelector("body")
const form = document.querySelector(".search-bar")
const input = document.getElementById("input")

const locationSpan = document.querySelector(".location > span")
const tempPara = document.querySelector(".temp")
const conditionsPara = document.querySelector(".conditions")

const checkbox = document.getElementById("switch")

const celsius = " °C"
const fahrenheit = " °F"
// Get and Set initial Dom contents

//global var temp
let temp = 10;
let tempF;
getAndSetWeatherData()
console.log(temp)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let location = input.value
    input.value = ""
    getAndSetWeatherData(location)
})

checkbox.addEventListener("change", ()=>{
    if(checkbox.checked) {
        tempF = (temp * (9/5 )) + 32
        tempPara.innerText = tempF + fahrenheit
    } else {
        tempPara.innerText = temp + celsius
        
    }
})



//function to fetch weather
async function getAndSetWeatherData(location = "berlin", metric = true) {
    let unit = ""
    if(metric) {
        unit = celsius
    }
    

    //fetching
    try {

        const apiUrl = weatherUrlStart + location.toLocaleLowerCase() + weatherUrlEnd
        const responseFromWeatherApi = await fetch(apiUrl, {mode: "cors"})
    const weatherData = await responseFromWeatherApi.json()
    //Extraction
    temp = weatherData.currentConditions.temp
    const conditions = weatherData.currentConditions.conditions
    //Updating Dom Body
    getAndSetBackgroundImage(conditions)
    
    //Updating Dom Form
    locationSpan.innerText = location
    tempPara.innerText = temp + unit 
    
    conditionsPara.textContent = conditions
    
    console.log(temp)
    console.log(conditions)
    }catch (error) {
        console.error("Error: Weather Data not fetched", error)
    }
}


async function getAndSetBackgroundImage(conditions) {
    try {

        const apiUrl = gifUrl + conditions.toLocaleLowerCase()
        //fetch
        const responseFromGiphy = await fetch(apiUrl, {mode: "cors"})
        const responseAsJson = await responseFromGiphy.json()
        //Extraction
        const imgUrl = responseAsJson.data.images.original.url
        body.style.backgroundImage = `url(${imgUrl})`
    } catch (error) {
        console.error("Error fetching image", error)
    }
}
