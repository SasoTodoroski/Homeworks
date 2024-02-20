let countiesTalkingEnglish = document.getElementById("countiesTalkingEnglish");
let countiesUsingEUR = document.getElementById("countiesUsingEUR");
let Macedonia = document.getElementById("Macedonia");
let countryName = document.getElementById("countryName");
let inputBtn = document.getElementById("inputBtn");
let resetBtn = document.getElementById("resetBtn");
let tabela = document.getElementById("tabela");
const loading = document.getElementById('loading');
let countriesTalkingEnglishResult = document.getElementById('countriesTalkingEnglishResult');

countiesTalkingEnglish.addEventListener('click', () => {
    loading.style.display = 'block';
    tabela.innerHTML = "";
    callApiENG();
});

countiesUsingEUR.addEventListener('click', () => {
    loading.style.display = 'block';
    tabela.innerHTML = "";
    callApiEUR();
});

Macedonia.addEventListener('click', () => {
    loading.style.display = 'block';
    countriesTalkingEnglishResult.innerText = "";
    tabela.innerHTML = "";
    callApiMacedonia();
});

inputBtn.addEventListener('click', () => {
    loading.style.display = 'block';
    countriesTalkingEnglishResult.innerText = "";
    tabela.innerHTML = "";
    callApi(countryName.value);
});

resetBtn.addEventListener('click', () => {
    countriesTalkingEnglishResult.innerText = "";
    countryName.value = "";
    tabela.innerHTML = "";
});

function callApi(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let inputData = [];
            for (let i = 0; i < data.length; i++) {
                let element = {
                    Flag: data[i].flags.png,
                    Name: data[i].name.common,
                    Population: data[i].population,
                    Capital: data[i].capital,
                    Area: data[i].area
                }
                console.log(element);
                inputData.push(element);
            }
            let novHTML = "";
            let elementi = inputData.length;
            console.log(elementi);
            // Ako ima poveke od 3 elementi pravime redovi so po 3 koloni
            for (let index = 0; index < elementi; index += 3) {
                novHTML += `<tr>`;
                for (let i = index; i < index + 3; i++) {
                    if (i < inputData.length) {
                        novHTML +=
                            `<td> <img style="height: 150px; width: 250px;" src="${inputData[i].Flag}" alt="">
                        <br>
                        <b style="font-size: x-large;">${inputData[i].Name}</b>
                        <br>
                        ${inputData[i].Name} is country with population of ${inputData[i].Population}
                        with the capital city ${inputData[i].Capital}
                        <br> <br>
                        Open od <a href="https://en.wikipedia.org/wiki/${inputData[i].Name}">Wikipedia</a></td>`
                    }
                }
                novHTML += `</tr>`;
            }
            loading.style.display = 'none';
            tabela.innerHTML = novHTML;
        })
        .catch(function (err) {
            console.error('Fetch error:', err);
        });
}

function callApiENG() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let languageData = [];
            for (let i = 0; i < data.length; i++) {
                const daliImaKeyLanguages = Object.keys(data[i]);
                // console.log(daliImaKeyLanguages);
                if (daliImaKeyLanguages.includes("languages"))
                {    
                    if (data[i].languages.eng)
                    {   languageData.push(data[i].name.common);   }
                }
            }
            loading.style.display = 'none';
            // console.log("Counties talking English are:" + languageData);
            countriesTalkingEnglishResult.innerText = `Countries talking english are:
            
            `
            countriesTalkingEnglishResult.innerText += languageData;
        })
        .catch(function (err) {
            console.error('Fetch error:', err);
        });
}

// za zemji koi koristat euro
function callApiEUR() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let languageData = [];
            for (let i = 0; i < data.length; i++) {
                const daliImaKeyCurrencies = Object.keys(data[i]);
                console.log(daliImaKeyCurrencies);
                if (daliImaKeyCurrencies.includes("currencies"))
                {    
                    if (data[i].currencies.EUR)
                    {   languageData.push(data[i].name.common);   }
                }
            }
            loading.style.display = 'none';
            // console.log("Counties talking English are:" + languageData);
            countriesTalkingEnglishResult.innerText = `Countries using EURO:
            
            `
            countriesTalkingEnglishResult.innerText += languageData;
        })
        .catch(function (err) {
            console.error('Fetch error:', err);
        });
}

// za Makedonija
function callApiMacedonia() {
    fetch(`https://restcountries.com/v3.1/name/Macedonia`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let inputData = [];
            let element = {
                Flag: data[0].flags.png,
                Name: data[0].name.common,
                Population: data[0].population,
                Capital: data[0].capital,
                Area: data[0].area
            }
            console.log(element);
            inputData.push(element);
            loading.style.display = 'none';
            tabela.innerHTML = "";
            tabela.innerHTML +=
                `<td> <img style="height: 150px; width: 250px;" src="${inputData[0].Flag}" alt="">
                <br>
                <b style="font-size: x-large;">${inputData[0].Name}</b>
                <br>
                ${inputData[0].Name} is country with population of ${inputData[0].Population}
                with the capital city ${inputData[0].Capital}
                <br> <br>
                Open od <a href="https://en.wikipedia.org/wiki/${inputData[0].Name}">Wikipedia</a></td>`
        })
        .catch(function (err) {
            console.error('Fetch error:', err);
        });
}