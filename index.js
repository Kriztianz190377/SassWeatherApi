
const container = document.querySelector('.container');
const result = document.querySelector('.result');
const resulH4 = document.querySelector('.resulH4');


const form = document.querySelector('.form');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchWeather);

});

function searchWeather(e) {
    e.preventDefault();

    const city = document.querySelector('.city').value;
    const country = document.querySelector('.country').value;


    if (city === "" || country === "") {
        messageError("Fill in the fields !!!");
        return;
    }
    queryApi(city, country);
}

function queryApi(city, country) {

    const APIKey = '421d0d7b07c333cd7c7f861ac3247cc9';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${APIKey}`;

    Spinners();

    fetch(url)
        .then(repons => repons.json())
        .then(data => {
            cleanHtml();

            if (data.cod === '404') {
                messageError("City not found");
                return;
            }
            showWeather(data);
        })

}

function showWeather(data) {

    const { main: { temp, temp_max, temp_min }, name } = data;

    resulH4.textContent = `The weather in the city of ${name} is:`;
    
    //temp 
    const pShowTemp = document.createElement('p');
    pShowTemp.classList.add('.pShowTemp');
    pShowTemp.innerHTML = `Actual temperature: ${temp} &#8451`;
    //temp_min
    const pShpwTemp_min = document.createElement('p');
    pShpwTemp_min.classList.add('.pShowTemp');
    pShpwTemp_min.innerHTML = `Minimal temperature: ${temp_min} &#8451`;

    //temp_max
    const pShpwTemp_max = document.createElement('p');
    pShpwTemp_max.classList.add('.pShowTemp');
    pShpwTemp_max.innerHTML = `Maximum temperature: ${temp_max} &#8451`;


    result.appendChild(resulH4);
    result.appendChild(pShowTemp);
    result.appendChild(pShpwTemp_min);
    result.appendChild(pShpwTemp_max);

}

function messageError(message) {
    const divError = document.createElement('div');
    divError.classList.add('error');
    const classErreur = document.querySelector('.error')
    if (!classErreur) {

        divError.innerHTML =
            `<strong>Error !!!</strong><br/>
        <span>${message}</span>     
        `;
        container.appendChild(divError);

        setTimeout(() => {
            divError.remove();
        }, 5000);
    }

}
function cleanHtml() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

}


function Spinners() {

    const divSpinners = document.createElement('div');
    divSpinners.classList.add('sk-fading-circle')
    divSpinners.innerHTML = `
       
         <div class="sk-circle1 sk-circle"></div>
         <div class="sk-circle2 sk-circle"></div>
         <div class="sk-circle3 sk-circle"></div>
         <div class="sk-circle4 sk-circle"></div>
         <div class="sk-circle5 sk-circle"></div>
         <div class="sk-circle6 sk-circle"></div>
         <div class="sk-circle7 sk-circle"></div>
         <div class="sk-circle8 sk-circle"></div>
         <div class="sk-circle9 sk-circle"></div>
         <div class="sk-circle10 sk-circle"></div>
         <div class="sk-circle11 sk-circle"></div>
         <div class="sk-circle12 sk-circle"></div>
        `;
        result.appendChild(divSpinners);

}

