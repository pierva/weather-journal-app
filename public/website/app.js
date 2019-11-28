/* FRONT END JAVASCRIPT */

/* Global Variables */
const model = {
    inputSelectors: ['#zip', '#feelings'],
    origin: window.location.origin,
    weatherPath: '/weather',
    postPath: '/postdata'
};

const octopus = {
    init: () => {
        view.init();
    },

    getWeatherPath: () => model.weatherPath,

    getPostPath: () => model.postPath,

    generateNewDatetime: () => {
        // Create a new date instance dynamically with JS
        let d = new Date();
        return `${d.getMonth}.${d.getDate()}.${d.getFullYear} - ${d.getHours()}:${d.getMinutes()}`;
    },

    getInputSelectors: () => {
        return model.inputSelectors;
    },

    getWeatherData: async (path = '') => {
        const response = await fetch(model.origin + path);
        try {
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    },

    postData: async (path = '', data = {}) => {
        // response returns a promise
        const response = await fetch(model.origin + path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
        } catch (error) {
            return error;
        }
    }
}

const view = {
    // Arrow function 
    init: () => {
        // Wait until the DOM is fully loaded before adding event listeners
        document.addEventListener('DOMContentLoaded', () => {
            view.addEventListeners();
        })
    },

    getUserInputs: (selectors = []) => {
        let inputs = {};
        // Strip leading '.' or '#' for class and id selectors
        const regex = new RegExp('^(#|.)');
        for (let selector of selectors) {
            const domEle = document.querySelector(selector);
            inputs[selector.replace(regex, '')] = domEle.value.trim();
        }
        return inputs;
    },

    updateUI: (data) => {
        console.log(data);
    },

    addEventListeners: () => {
        const submitButton = document.getElementById('generate');
        submitButton.addEventListener('click', (event) => {
            // Prevent default is needed in case we use a form, this 
            // way we prevent page reload
            event.preventDefault();
            // get user inputs
            const selectors = octopus.getInputSelectors();
            const inputs = view.getUserInputs(selectors);
            
            octopus.getWeatherData(
                octopus.getWeatherPath() + '?zip=' + inputs.zip)
                .then((weatherData) => {
                    if(weatherData.error) {
                        const errorDiv = document.querySelector('#feedback');
                        errorDiv.innerHTML = weatherData.error;
                        errorDiv.classList.add('error');
                    }
                    octopus.postData(octopus.getPostPath(), inputs)
                        .then((data) => {
                            view.updateUI();
                        });
                });
        });
    }
}

octopus.init();
