const BASE_URL = "https://api.frankfurter.app/latest?from";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");    
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() =>{
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal = "1";
        amount.value = "1";
    }
    const URL = `${BASE_URL}=${fromCurr.value}&to=${toCurr.value}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();

        if (data.error) {
            // Handle case where API returns an error
            alert("Sorry, the requested currency pair is not available.");
            return;
        }
        let val = data.rates[toCurr.value]; // Assuming USDINR is the format returned by the API
        let rate = val;
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    } catch (error) {
        // Handle fetch error or JSON parsing error
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again later.');
    }
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})

console.log()