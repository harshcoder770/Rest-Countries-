let cardsSection = document.querySelector(".cards-section");
fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((country) => {
      cardsSection.append(createCard(country));
    });
  });

const changeColor = document.querySelector(".mode");
if (localStorage.theme == "dark") {
  changeColor.innerHTML = `
   Dark Mode <i class="fa-regular fa-moon"></i> 
`;
} else {
  changeColor.innerHTML = `
     Light Mode <i class="fa-solid fa-sun"></i> 
    `;
}

const body = document.querySelector("body");
body.classList.add(localStorage.getItem("Theme"));
let themeVar = 1;
changeColor.addEventListener("click", () => {
  if (localStorage.Theme == "light") {
    changeColor.innerHTML = `
       Dark Mode <i class="fa-regular fa-moon"></i>
    `;
  } else if (body.classList[0] == "dark") {
    changeColor.innerHTML = `
   Light Mode <i class="fa-solid fa-sun"></i> 
    `;
  }
  if (themeVar % 2 == 0) {
    localStorage.Theme = "light";
  } else {
    localStorage.Theme = "dark";
  }
  themeVar++;

  body.classList.remove(localStorage.Theme == "dark" ? "light" : "dark");
  body.classList.add(localStorage.getItem("Theme"));
});

const dropdown = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");

dropdown.addEventListener("click", () => {
  dropdownContent.classList.toggle("open");
});

let region;
const Africa = document.querySelector(".Africa");
const America = document.querySelector(".America");
const Asia = document.querySelector(".Asia");
const Europe = document.querySelector(".Europe");
const Ocenia = document.querySelector(".Ocenia");

Africa.addEventListener("click", () => {
  region = "Africa";
  regionCreate(region);
  dropdownContent.classList.remove("open");
});
America.addEventListener("click", () => {
  region = "America";
  regionCreate(region);
  dropdownContent.classList.remove("open");
});
Asia.addEventListener("click", () => {
  region = "Asia";
  regionCreate(region);
  dropdownContent.classList.remove("open");
});
Europe.addEventListener("click", () => {
  region = "Europe";
  regionCreate(region);

  dropdownContent.classList.remove("open");
});
Ocenia.addEventListener("click", () => {
  region = "Oceania";
  regionCreate(region);

  dropdownContent.classList.remove("open");
});

function regionCreate(region) {
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((data3) => {
      // console.log(data3)
      cardsSection.innerHTML = "";
      data3.forEach((box) => {
        cardsSection.append(createCard(box));
      });
    });
}

function createCard(country) {
  const countryCard = document.createElement("a");
  countryCard.classList.add("Card");
  countryCard.href = `/country.html?name=${country.name.common}`;

  countryCard.innerHTML = `
          <img src = ${country.flags?.svg}
          <div class="country-info">
          <p class="Country-name info">${country.name.common}</p>
          <p class="Country-population info"><b>population: </b> ${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p class="Country-region info"><b>Region: </b> ${country.region}</p>
          <p class="Country-Capital info"><b>Capital:</b> ${
            country.capital ? country.capital[0] : "There are None"
          }</p>
          </div>`;
  return countryCard;
}

let timeout;
const input = document.querySelector(".input");
input.addEventListener("input", (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
      .then((res) => res.json())
      .then((data2) => {
        try {
          cardsSection.innerHTML = "";
          data2.forEach((country) => {
            let card = createCard(country);
            cardsSection.append(card);
          });
        } catch {
          cardsSection.innerHTML = `<h1>There is no such a Country.<//h1>
          <div class = 'btn-div'> 
          <button onClick = location.reload() class = 'error-btn'>Click this</button> 
          </div>
          `;
         
          
          
        }
      });
  }, 1000);
});
