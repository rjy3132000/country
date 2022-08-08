/* # ******************************************** # */


let pageCheck = document.querySelector("body > div");
let body = document.querySelector("body")
let header = document.querySelector("header");
let mode = document.querySelector(".mode");
let filter_country = document.querySelector(".filter-country");
let input_data = document.querySelector(".input-data");
let select = document.querySelector("select");
let country_info = document.querySelector(".country-info");
let input = document.getElementById("country");


/* **************** JavaScript For Index Page **************** */

if (pageCheck.className == "container indexPage") {

  // mode EventListener
  mode.addEventListener("click",bgColor);

  // BgColor Functions
  function bgColor() {
    if (mode.classList.contains("active")) {
      body.classList.remove("active");
      header.classList.remove("active");
      input_data.classList.remove("active");
      select.classList.remove("active");
      mode.classList.remove("active");
      mode.innerHTML = "Dark Mode";
    }
    else {
      body.classList.add("active");
      header.classList.add("active");
      input_data.classList.add("active");
      select.classList.add("active");
      mode.classList.add("active");
      mode.innerHTML = "Dark Mode"
    }
    
  }


  // Input EventListener
  input_data.addEventListener("click",function() { 
    window.location.replace("search.html");
  });

  // Getting All Data From API Call
  function getDtat() {
    fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        country_info.innerHTML += `
          <li>
              <a href="singleCountry.html?a=${json[i].name.common}" title="${json[i].name.common}">
                  <img src="${json[i].flags.png}" alt="${json[i].name.common}">
                  <div class="country-details">
                      <h3>${json[i].name.common}</h3>
                      <span>populations: ${json[i].population}</span>
                      <span>region: ${json[i].region}</span>
                      <span>capitial: ${json[i].capital} </span>
                  </div>
              </a>
          </li> `;
      }

      // Filter On Region
      let countryRegion = json.map(function (elem) { return elem.region});
      
      // Single Region
      var regionUnique = countryRegion.filter(function (item, index) { return countryRegion.indexOf(item) >= index});

      for (key in regionUnique){
        select.innerHTML += `
        <option data-team="${regionUnique[key]}" value="${regionUnique[key]}">${regionUnique[key]}</option> `;
      }

      // EventListener on Select Tag
      select.addEventListener("change",selectValue); 
      
      
    });
  }
  getDtat();
}


/* **************** JavaScript For Single Country Info **************** */

if (pageCheck.className == "container singleCountry") {

  let country_information_detail = document.querySelector(".country-information-detail");
  let country_text = document.querySelector(".country-information");
  let btn_back = document.querySelector(".btn-back");

  mode.addEventListener("click",function() {
    if ( mode.classList.contains("active") ){
      body.classList.remove("active");
      mode.classList.remove("active");
      header.classList.remove("active");
      country_text.classList.remove("active");
      btn_back.classList.remove("active");
      mode.innerHTML = "Light Mode";
    }
    else {
      body.classList.add("active") ;
      mode.classList.add("active") ;
      header.classList.add("active");
      btn_back.classList.add("active");
      country_text.classList.add("active");
      mode.innerHTML = "Dark Mode";
    }
  })


  // countryDetails()
  console.log(countryDetails())
  function bFunction(bCountry) {
    country_information_detail.innerHTML = ""
    fetch(`https://restcountries.com/v3.1/name/${bCountry}`)
    .then(response => response.json())
    .then(json => {
      console.log(json[0]);

      let languages = "";
    let currencies = "";
    let native = "";
    let borderCountry = ``;

    let lan = json[0].languages;
    let cun = json[0].currencies;
    let b = json[0].borders;
    let n = json[0].name.nativeName;
    let NoBorder = 'NoBorder'
    for (key in lan) {
      languages += lan[key];
      languages += "\t"
    }

    for (key in cun) {
      currencies += key;
      currencies += "\t";
    }

    for (key in b) {
      borderCountry += `<a href="#FIXME" title="${b[key]}" class"borderCountry" onclick="bFunction('${b[key]}')">${b[key]}</a>`;
      borderCountry += "\t";
    }

    for (key in n) {
      native += n[key].common
      native += "\n"
    }

      country_information_detail.innerHTML += `
      <img src="${json[0].flags.png}" alt="country ${json[0].name.common}" class="flag">
      <div class="country-text">
          <div class="c-details">
              <div class="c-info-1">
              <h3>${json[0].name.common}</h3>
              <span>native name: ${native}</span>
              <span>populations: ${json[0].population}</span>
              <span>region: ${json[0].region}</span>
              <span>sub region: ${json[0].subregion}</span>
              <span>captial: ${json[0].capital[0]}</span> 
              </div>
              <div class="c-info-2">
                  <span>top domain: ${json[0].tld}</span>
                  <span>currencies: ${currencies}</span>
                  <span>languages: ${languages}</span>
              </div>
          </div>
          <div class="border-country">
              <p>
              
                  border country: ${borderCountry? borderCountry : NoBorder}
              </p>
          </div> 
      </div>  `;
    })

  }
}



/* **************** JavaScript For Filter Page **************** */

if (pageCheck.className == "container filterPage") {
  let r = JSON.parse(localStorage.getItem("reg"));
  country_info.innerHTML = "" ;

  mode.addEventListener("click", function() {
    if (mode.classList.contains("active")) {
      mode.classList.remove("active");
      body.classList.remove("active");
      header.classList.remove("active");
      input_data.classList.remove("active");
      select.classList.remove("active");

    }
    else {
      mode.classList.add("active");
      body.classList.add("active");
      input_data.classList.add("active");
      header.classList.add("active"); 
      select.classList.add("active");     
    }
  });

  input_data.addEventListener("click",function() { 
    window.location.replace("search.html");
  });


  fetch(`https://restcountries.com/v3.1/region/${r[0]}`)
  .then((response) => response.json())
  .then((json) => {

    
    for (let i = 0; i < json.length; i++) {
    country_info.innerHTML += `
      <li>
          <a href="singleCountry.html?a=${json[i].name.common}" title="${json[i].name.common}">
              <img src="${json[i].flags.png}" alt="${json[i].name.common}">
              <div class="country-details">
                  <h3>${json[i].name.common}</h3>
                  <span>populations: ${json[i].population}</span>
                  <span>region: ${json[i].region}</span>
                  <span>capitial: ${json[i].capital} </span>
              </div>
          </a>
      </li> `;
    }
  });

}



/* **************** JavaScript For Search Page **************** */

if (pageCheck.className == "container searchPage") {
  input.addEventListener("keyup",searchResult)

  mode.addEventListener("click",function() {
    if (mode.classList.contains("active")) {
      body.classList.remove("active");
      header.classList.remove("active");
      input_data.classList.remove("active");
      mode.classList.remove("active");
      mode.innerHTML = "Light Mode";
    }
    else {
      body.classList.add("active");
      header.classList.add("active");
      input_data.classList.add("active");
      mode.classList.add("active");
      mode.innerHTML = "Dark Mode";
    }
  
  })  

}

function getParameter(paraName) {
  var paraMeter = new URLSearchParams(window.location.search);
  var anchorValue = paraMeter.get(paraName);
  return anchorValue;
}



function countryDetails() {
  let country_information_detail = document.querySelector(".country-information-detail");

  country_information_detail.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/name/${getParameter("a")}?fullText=true`)
  .then((response) => response.json())
  .then((json) => {
    let languages = "";
    let currencies = "";
    let native = "";
    let borderCountry = ``;

    let lan = json[0].languages;
    let cun = json[0].currencies;
    let b = json[0].borders;
    let n = json[0].name.nativeName;

    for (key in lan) {
      languages += lan[key];
      languages += "\t"
    }

    for (key in cun) {
      currencies += key;
      currencies += "\t";
    }

    for (key in b) {
      borderCountry += `<a href="#FIXME" title="${b[key]}" class"borderCountry" onclick="bFunction('${b[key]}')">${b[key]}</a>`;
      borderCountry += "\t";
    }

    for (key in n) {
      native += n[key].common
      native += "\n"
    }

    country_information_detail.innerHTML += `
    <img src="${json[0].flags.png}" alt="country ${json[0].name.common}" class="flag">
    <div class="country-text">
        <div class="c-details">
            <div class="c-info-1">
            <h3>${json[0].name.common}</h3>
            <span>native name: ${native}</span>
            <span>populations: ${json[0].population}</span>
            <span>region: ${json[0].region}</span>
            <span>sub region: ${json[0].subregion}</span>
            <span>captial: ${json[0].capital[0]}</span> 
            </div>
            <div class="c-info-2">
                <span>top domain: ${json[0].tld}</span>
                <span>currencies: ${currencies}</span>
                <span>languages: ${languages}</span>
            </div>
        </div>
        <div class="border-country">
            <p>
                border country: ${borderCountry}
            </p>
        </div> 
    </div>  `;
  });
}

function selectValue() {
  let arr = [];
  let val = select.value;
  arr.push(val);
  localStorage.setItem("reg",JSON.stringify(arr));
  window.location.replace("filter.html");
}


function searchResult() {
  fetch(`https://restcountries.com/v3.1/name/${input.value}`)
  .then((response) => response.json())
  .then((json) => {
    country_info.innerHTML = "";
    for (let i = 0; i < json.length; i++) {
      country_info.innerHTML += `
        <li>
            <a href="singleCountry.html?a=${json[i].name.common}" title="${json[i].name.common}">
                <img src="${json[i].flags.png}" alt="${json[i].name.common}">
                <div class="country-details">
                    <h3>${json[i].name.common}</h3>
                    <span>populations: ${json[i].population}</span>
                    <span>region: ${json[i].region}</span>
                    <span>capitial: ${json[i].capital} </span>
                </div>
            </a>
        </li> `;
    }
  });

}