const country = document.querySelector(".country-all");
const imageappend = document.querySelector('.image-content')
const nameH = document.querySelector('#head')
const NativeName  = document.querySelector('#Native-name')
const population  = document.querySelector('#population')
const region  = document.querySelector('#region')
const Subregion  = document.querySelector('#sub-region')
const Capital  = document.querySelector('#capital')
const tld  = document.querySelector('#tld')
const currrency  = document.querySelector('#currrency')
const language  = document.querySelector('#language')
const bordersApppend = document.querySelector('.border-countries')
const params = new URLSearchParams(window.location.search);
const countryname = params.get("name");
// console.log(countryname);
fetch(`https://restcountries.com/v3.1/name/${countryname}`)
  .then((data) => data.json())
  .then((data) => {
    // console.log(countryname=='China'?data[2]:data[0])
    let dta = countryname=='China'?data[2]:data[0]
    //image
    const image = document.createElement('img')
    image.src = `${dta.flags.svg}`
    imageappend.append(image)
    //heading name 
    nameH.innerText = `${dta.name.common}`
    //Native-name
    NativeName.innerText = `${Object.values(dta.name.official).join('')}`
    //population
    population.innerText = `${dta.population.toLocaleString("en-IN")}`
    //region
    region.innerText = `${dta.region}`
    //sub-region
    Subregion.innerText = `${dta.subregion}`
    //Capital 
    Capital.innerText = `${dta.capital[0]}`
    //tld 
    tld.innerText = `${dta.tld[0]}`
    //currency
    currrency.innerText = `${Object.values(dta.currencies)[0].name}`
    //languages
    language.innerText = `${Object.values(dta.languages).join(' ,')}`
   let bord ;
    dta.borders?bord = Object.values(dta.borders):' '
    // console.log(bord)
 
  if(bord){
    bord.forEach((bor) => {
      fetch(`https://restcountries.com/v3.1/alpha/${bor}`)
      .then(res => res.json())
      .then((data2) => {
        // console.log(data2[0])
        // console.log(data2[0])
        let border = document.createElement('a')
        border.classList.add('borders')
        border.innerText = `${data2[0].name.common}`
        border.href = `/country.html?name=${data2[0].name.common}`
        // console.log(border )
        bordersApppend.append(border)
      })
   
     
    })
  }
    

  });

  const changeColor = document.querySelector(".mode");
  if(localStorage.theme == 'dark'){
    changeColor.innerHTML = `
     Dark Mode <i class="fa-regular fa-moon"></i> 
  `
  }
  else {
    changeColor.innerHTML = `
       Light Mode <i class="fa-solid fa-sun"></i> 
      `
  }

const body = document.querySelector("body");
body.classList.add(localStorage.getItem("Theme"));

// console.log(themeVar)
changeColor.addEventListener("click", () => {
  if(localStorage.Theme == 'light'){
    changeColor.innerHTML = `
      Dark Mode <i class="fa-regular fa-moon"></i> 
    `
  
  }
  else if (body.classList[0]  == 'dark'){
    changeColor.innerHTML = `
    Light Mode <i class="fa-solid fa-sun"></i> 
    `
  }
  let themeVar = localStorage.Theme;
  if (themeVar == "dark") {
    body.classList = "";

    localStorage.Theme = "light";
    body.classList.add(localStorage.getItem("Theme"));
  } else if (themeVar == "light") {
    body.classList = "";
    localStorage.Theme = "dark";

    body.classList.add("dark");
  }
  
});



