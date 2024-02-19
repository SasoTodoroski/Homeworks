let countiesTalkingEnglish = document.getElementById("countiesTalkingEnglish");
let countiesUsingEUR = document.getElementById("countiesUsingEUR");
let Macedonia = document.getElementById("Macedonia");
let countryName = document.getElementById("countryName");
let inputBtn = document.getElementById("inputBtn");
let resetBtn = document.getElementById("resetBtn");
let tabela = document.getElementById("tabela");
const loading = document.getElementById('loading');

countiesTalkingEnglish.addEventListener('click', () => {
    loading.style.display = 'block';
    tabela.innerHTML = "";
    callApiEUR();
});

inputBtn.addEventListener('click', () => {
    loading.style.display = 'block';
    tabela.innerHTML = "";
    callApi(countryName.value);
});

resetBtn.addEventListener('click', () => {
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

function callApiEUR() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let languageData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].languages.eng) {
                    languageData.push(data[i].name.common);
                    console.log(data[i].languages);
                    console.log(i);
                    console.log(languageData);
                }
            }
            console.log(languageData);
            console.log(brojac);
        })
        .catch(function (err) {
            console.error('Fetch error:', err);
        });
}

function callApiMacedonia() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let languageData = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].languages.mkd) {
                    languageData.push(data[i].name.common);
                    console.log(data[i].languages);
                    console.log(i);
                    console.log(languageData);
                };
            };
            console.log(languageData);
            console.log(brojac);
        });
};