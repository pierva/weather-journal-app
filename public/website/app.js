/* FRONT END JAVASCRIPT */

/* Global Variables */
const model = {
    
};

const octopus = {
    generateNewDate: () => {
        // Create a new date instance dynamically with JS
        let d = new Date();
        return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    },

    getWeatherData: async (url = '') => {
        const response = await fetch(url);
        try {
            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.log('error: ', error);
        }
    }
}

const view = {
    // Arrow function 
    init: () => {
        // Wait until the DOM is fully loaded before adding event listeners
        document.addEventListener('DOMContentLoaded', ()=> {
            view.addEventListeners();
        })
    },

    getUserInputs: (selectors = []) => {
        let inputs = {};
        // Strip leading '.' or '#' for class and id selectors
        const regex = new RegExp('^(#|.)');
        for (let selector of selectors) {
            const domEle = document.querySelector(selector);
            inputs[selector.replace(regex, '')] = domEle.value;
        }
        return inputs;
    },

    addEventListener: () => {
        const submitButton = document.getElementById('generate');
        submitButton.addEventListener('submit', (event) => {
            // Prevent default is needed in case we use a form, this 
            // way we prevent page reload
            event.preventDefault();
            // get zip code
            const zip = document.getElementById('zip').value;
            const feelings = document.getElementById('feelings').value;

        })
    }
}

