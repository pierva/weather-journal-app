/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.log('error: ', error);
    }
}