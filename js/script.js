/*
country.name.common
country.flags.png
country.car.side
country.population
country.capital[0]
*/

const countriesList = document.getElementById("countries-list");
const countriesInfo = document.getElementById("countries-info");

const getCountries = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital");
        if (!response.ok) {
            throw new Error("Error al obtener países:", response.status);
        }
        const data = await response.json();
        const paises = data.sort((a,b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));
        return paises;
    } catch (error) {
        console.log(error);
    }
}

getCountries().then((paises) => {
    const template = (country) => {
        return `<div class="country" id="open-${country.name.common}">
            <img src="${country.flags.png}" alt="${country.flags.alt}">
            <h2>${country.name.common}</h2>
        </div>`;
    };
    const templateInfo = (country) => {
        return `<div class="country-info" id="${country.name.common}">
            <div>
                <img src="${country.flags.png}" alt="${country.flags.alt}">
                <div class="country-data">
                    <h2>${country.name.common}</h2>
                    <p>Capital: ${country.capital[0]}</p>
                    <p>Población: ${country.population}</p>
                    <p>Lado de la carretera: ${country.car.side}</p>
                </div>
            </div>
            <button class="close">Close</button>
        </div>`;
    };
    const structure = paises.map((country) => template(country)).join("");
    countriesList.innerHTML = structure;
    const structureInfo = paises.map((country) => templateInfo(country)).join("");
    countriesInfo.innerHTML = structureInfo;
    const countryInfo = Array.from(document.getElementsByClassName('country')); 
    countryInfo.map((country) => {
        country.addEventListener("click", (e) => {
            e.stopPropagation();
            const pais = country.id.split("-")[1];
            Array.from(document.getElementsByClassName("show")).map((element) => element.classList.remove("show"));
            document.getElementById(pais).classList.add("show");
        });
    });
    const btnsClose = Array.from(document.getElementsByClassName("close"));
    btnsClose.map((btn) => {
        btn.addEventListener("click", () => Array.from(document.getElementsByClassName("show")).map((element) => element.classList.remove("show")));
    });
});
