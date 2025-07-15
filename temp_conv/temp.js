const celsius_farenheit = document.getElementById("Celsius");
const farenheit_celsius = document.getElementById("Farenheit");
const text_box = document.getElementById("num-box");
const result= document.getElementById("result")

function Converter()  {
    if (celsius_farenheit.checked) {
        const temp = Number(text_box.value);
        const farenheit = (temp * (9 / 5)) + 32;
        result.textContent= farenheit.toFixed(2) + "°F"
    }

    else if(farenheit_celsius.checked){
        const temp = Number(text_box.value);
        const celsius = (temp -32) * (5/9);
        result.textContent= celsius.toFixed(2) + "°C"
    }

    else{
        result.textContent= "Select an Conversion Option"
    }
}
