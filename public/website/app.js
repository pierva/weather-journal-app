/* FRONT END JAVASCRIPT */

/* Global Variables */
const model = {
    inputSelectors: ['#zip', '#feelings'],
    weatherPath: '/weather',
};

const octopus = {
    init: () => {
        view.init();
    },

    getWeatherPath: () => model.weatherPath,

    generateNewDate: () => {
        // Create a new date instance dynamically with JS
        let d = new Date();
        return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    },

    getInputSelectors: () => {
        return model.inputSelectors;
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

    addEventListeners: () => {
        const submitButton = document.getElementById('generate');
        submitButton.addEventListener('click', (event) => {
            console.log('clicked')
            // Prevent default is needed in case we use a form, this 
            // way we prevent page reload
            event.preventDefault();
            // get user inputs
            const selectors = octopus.getInputSelectors();
            const inputs = view.getUserInputs(selectors);
            const origin = window.location.origin;
            octopus.getWeatherData(origin + octopus.getWeatherPath())
            

        })
    }
}

octopus.init();
