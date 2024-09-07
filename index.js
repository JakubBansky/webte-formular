console.log('loaded');

const text_type = {
    TEXT: /^[a-zA-ZáčďéěíľňóôŕšťúýžÁČĎÉĚÍĽŇÓÔŔŠŤÚÝŽ ]+$/,
    EMAIL: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    NUMBER: /^\d+$/,
    PHONE_NUMBER: /^(\d{3}\s){2}\d{3}$/
}
const TEXT_INPUT_SIZE = 12;
const MAIL_INPUT_SIZE = 30;
const PHONE_NUMBER_LENGTH = 9;
const RED_BORDER = "2px dashed red";
const GREEN_BORDER = "2px solid green";
const BLACK_BORDER = "2px solid black";

var flag = true;

function displayError(msg, errfieldID) {
    let err = document.getElementById(errfieldID);
    err.innerHTML = msg;
}


function makeBorder(id) {
    let element = document.getElementById(id);
    element.style.border = '1px solid red';
}

function deleteBorder(id) {
    let element = document.getElementById(id);
    element.style.border = '1px solid black';
}


function checkRegex(type, text) {
    // console.log(text_type[type].test(text));
    return text_type[type].test(text);
}

function displayCharacters(inputID, outputID) {
    let input = document.getElementById(inputID);
    let output = document.getElementById(outputID);
    output.style.color = 'black';
    if (input.type == "text" && input.name == "email") {
        output.innerHTML = input.value.length + '/' + MAIL_INPUT_SIZE;
    } else if (input.type == "text") {
        output.innerHTML = input.value.length + '/' + TEXT_INPUT_SIZE;
    } else if (input.type == "number") {
        output.innerHTML = input.value.length + '/' + PHONE_NUMBER_LENGTH;
    }
}

function hideError(errfieldID) {
    let err = document.getElementById(errfieldID);
    err.innerHTML = "";
}

function validateNumber(Id) { //TODO preset + number synchro
    let number = document.getElementById(Id);
    let preset = document.getElementById('preset');
    let errMsg = document.getElementById("err-phone");
    if ((number.value < 100000000 || number.value > 1000000000) && preset.value == "None") {
        console.log("0 0");
        errMsg.innerHTML = "";
        number.style.border = BLACK_BORDER;
        preset.style.border = BLACK_BORDER;
    } else if (!(number.value < 100000000 || number.value > 1000000000) && preset.value == "None") {
        console.log("1 0");
        errMsg.innerHTML = "!Predvoľba";
        errMsg.style.color = "red";
        preset.style.border = RED_BORDER;
        number.style.border = GREEN_BORDER;
    } else if ((number.value < 100000000 || number.value > 1000000000) && preset.value != "None") {
        console.log("0 1");
        errMsg.innerHTML = "!Dĺžka";
        errMsg.style.color = "red";
        number.style.border = RED_BORDER;
        preset.style.border = GREEN_BORDER;
    } else {
        console.log("1 1");
        errMsg.style.color = "black";
        errMsg.innerHTML = "";
        number.style.border = GREEN_BORDER;
        preset.style.border = GREEN_BORDER;
    }

}

function validateIsEmpty(inputID, errfieldID, type) {
    let inputfield = document.getElementById(inputID);
    let errField = document.getElementById(errfieldID);
    errField.innerHTML = '';
    if (!inputfield.value) { 
        if (inputID != "email") {
            inputfield.style.border = RED_BORDER;
        }
    } else {
        if (checkRegex(type, inputfield.value)) {
            inputfield.style.border = GREEN_BORDER;
        } else {
            errField.style.color = 'red';
            inputfield.style.border = RED_BORDER;
            if (type == 'EMAIL') {
                displayError("format!!", errfieldID);
            } else if (type == 'TEXT') {
                displayError("pismenka!!", errfieldID);
            } else if (type == 'NUMBER') {
                displayError("iba ciselka", errfieldID);

            }
        }
    }

}


let birthdate = document.getElementById('birthdate');
let age = document.getElementById('age');
birthdate.addEventListener("focusout", (event) => {
    let errMsg = document.getElementById("err-age");
    let bday = new Date(event.target.value); 
    let today = new Date(); 
    if (isNaN(bday)) {
        birthdate.style.border = RED_BORDER;
    }
    let age = today.getFullYear() - bday.getFullYear();
    let month = today.getMonth() - bday.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < bday.getDate())) {
        age -= 1;
    }

    let ageinput = document.getElementById('age');
    if (age < 0 || age > 116) {
        ageinput.style.border = RED_BORDER;
        birthdate.style.border = RED_BORDER;
        errMsg.innerHTML = "Vek nesedí";
        ageinput.setAttribute('disabled', 'true');
    } else {
        ageinput.style.border = GREEN_BORDER;
        birthdate.style.border = GREEN_BORDER;
        errMsg.innerHTML = '';
        ageinput.value = age;
        ageinput.setAttribute('disabled', 'true');
    }
});

const inputs = document.querySelectorAll('.genders input');
const labels = document.querySelectorAll('.genders label');

inputs.forEach(input => {
    input.addEventListener('change', event => {
        labels.forEach(label => {
            label.style.border = "none";
        });
    });
});

const sportVolleyball = {
    "Monday": "Pondelok",
    "Thursday": "Štvrtok",
}

const sportFootball = {
    "Monday": "Pondelok",
    "Friday": "Piatok",
    "Sunday": "Nedeľa"
}
const sportFlorball = {
    "Monday": "Pondelok",
    "Thursday": "Štvrtok",
    "Friday": "Piatok"
}

const dayMonday = {
    "evening": "Večer",
    "night": "Noc",
}
const dayThursday = {
    "morning": "Rano",
    "evening": "Večer",
}
const dayFriday = {
    "morning": "Rano",
    "night": "Noc",
}
const daySunday = {
    "morning": "Rano",
    "afternoon": "Popoludnie",
    "evening": "Večer",
    "night": "Noc",
}

function populateSelect(select, options) {
    for (var key of Object.keys(options)) {
        var option = document.createElement("option");
        option.text = options[key];
        option.value = key;
        select.add(option);
    }
}

function clearSelect(select) {
    while (select.options.length > 0) {
        select.remove(0);
    }
}

let sportSelect = document.getElementById('dd-sport');
let daySelect = document.getElementById('dd-day');
let timeSelect = document.getElementById('dd-time');
let selectedSport = sportSelect.options[sportSelect.selectedIndex];
let selectedDay = daySelect.options[daySelect.selectedIndex];
populateSelect(daySelect, sportVolleyball);
populateSelect(timeSelect, dayMonday);


function selectSport() {
    sportSelect = document.getElementById('dd-sport');
    let selectedSport = sportSelect.options[sportSelect.selectedIndex];
    console.log(selectedSport.value);
    clearSelect(daySelect);
    clearSelect(timeSelect);
    if (selectedSport.value == "volleyball") {
        populateSelect(daySelect, sportVolleyball);
        populateSelect(timeSelect, dayMonday);
    } else if (selectedSport.value == "football") {
        populateSelect(daySelect, sportFootball);
        populateSelect(timeSelect, dayMonday);
    } else if (selectedSport.value == "florball") {
        populateSelect(daySelect, sportFlorball);
        populateSelect(timeSelect, dayMonday);
    }
}

function selectDay() {

    selectedSport = sportSelect.options[sportSelect.selectedIndex];
    selectedDay = daySelect.options[daySelect.selectedIndex];

    clearSelect(timeSelect);
    if (selectedDay.value == "Monday") {
        populateSelect(timeSelect, dayMonday);
    } else if (selectedDay.value == "Thursday") {
        populateSelect(timeSelect, dayThursday);
    } else if (selectedDay.value == "Friday") {
        populateSelect(timeSelect, dayFriday);
    } else if (selectedDay.value == "Sunday") {
        populateSelect(timeSelect, daySunday);
    }
}

function selectTime() {

}

function displayTextArea(ID) {
    let element = document.getElementById(ID);
    if (element.style.visibility == "visible") {
        element.style.visibility = "hidden";
    } else {
        element.style.visibility = "visible";
    }
}

function showMoreInfo() {
    let element = document.getElementById('show');
    let chooseBlock = document.getElementById('chooseBlock');
    if (element.checked == true) {
        chooseBlock.style.display = 'flex';
    } else {
        chooseBlock.style.display = 'none';
    }
}

function hide(id) {
    let element = document.getElementById(id);
    element.style.visibility = 'hidden';
    closeModal();
}

function display(id) {
    let element = document.getElementById(id);
    if (element.style.visibility == 'hidden') {
        element.style.visibility = 'visible';
    } else if (element.style.visibility == 'visible') {
        element.style.visibility = 'hidden';
    } else {
        element.style.visibility = 'visible';
    }
}

const formData = {};

function processForm() {
    flag = true;
    display('modal');
    modalInterraction();
    const form = document.forms["form"];
    formData.name = form.name.value;
    formData.surname = form.surname.value;
    formData.birthdate = form.birthdate.value;
    formData.age = form.age.value;
    formData.email = form.email.value;
    const preset = form.preset.value;
    const phoneNumber = form["phone-number"].value;
    if (preset == "None"){
        formData.phoneNumber = '\u2717';    
    }
    else{
        formData.phoneNumber = preset + " " + phoneNumber;
    }
    const gender = document.querySelector('input[name="gender"]:checked');
    formData.gender = gender ? gender.value : "";
    formData.sport = form["dd-sport"].options[form["dd-sport"].selectedIndex].innerHTML;
    formData.day = form["dd-day"].options[form["dd-day"].selectedIndex].innerHTML;
    formData.time = form["dd-time"].options[form["dd-time"].selectedIndex].innerHTML;
    formData.lights = form["box-lights"].checked;
    formData.preparePitch = form["box-prepare-pitch"].checked;
    formData.borrowStuff = form["box-borrow-stuff"].checked;
    console.log(formData);
    if (document.getElementById("box-other").checked) {
        formData.other = form.comment.value;
    } else {
        form.comment.value = "";
        formData.other = "";
    }

    if (!form.name.value) {
        flag = false;
        validateIsEmpty("name", "err-name", "TEXT");
    }
    if (!form.surname.value) {
        flag = false;
        validateIsEmpty("surname", "err-surname", "TEXT");

    }
    if (!form.birthdate.value) {
        flag = false;
        validateIsEmpty("birthdate", "birthdate", "TEXT");

    }
    if (!form.age.value) {
        flag = false;
        validateIsEmpty("age", "age", "TEXT");
    }
  
    if (!form.gender.value) {
        let labels = document.querySelectorAll('.genders label');
        labels.forEach(label => {
            label.style.border = RED_BORDER;
        });
        flag = false;
    } else {
        let labels = document.querySelectorAll('.genders label');
        labels.forEach(label => {
            label.style.border = 'none';
        });
    }
    if ((form.preset.value == "None") ^ (form["phone-number"].value < 100000000 || form["phone-number"].value > 1000000000)) {
        console.log(form.preset.value + " " + form["phone-number"].value);
       
        flag = false;
    }
    fillModal();
    var errModal = document.getElementById("err-modal");
    if (flag == true) {
        errModal.style.display = "none";

    } else {
        errModal.style.display = "flex";
    }

    return false;
}

const modal = document.getElementById("modal");
const pageContent = document.getElementsByTagName('form');


function modalInterraction() {
    if (modal.style.display == "flex") {
        closeModal();
    } else {
        openModal();
    }
}


function openModal() {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
}

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}


document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["form"];
});

const modalItems = ["Meno:", "Priezvisko:", "Dátum narodenia:", "Vek:",
    "Mail:", "Tel. číslo:", "Pohlavie:", "Šport: ", "Deň: ", "Čas: ", "Svetlá(3€): ", "Pripraviť ihrisko(4€): ",
    "Požičať náčinie(5€): ", "Iné: "
]

function cleanModal() {
    console.log("clean");
    let modal = document.getElementById("modal");
    const spans = modal.getElementsByTagName("span");
    const lItems = modal.getElementsByTagName("li");
    for (let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = modalItems[i];

    }
}



function fillModal() {
    let price = 0;
    cleanModal();
    console.log("fill")

    let modal = document.getElementById("modal");
    let count = 0;
    const spans = modal.getElementsByTagName("span");
    for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
            let value = formData[key];
            if (spans[count]) {
                if (value == true) {
                    spans[count].innerHTML += " " + '\u2713';
                } else if (value == false) {
                    spans[count].innerHTML += " " + '\u2717';
                } else {
                    spans[count].innerHTML += " " + value;
                }
            }
            if (key == 'lights' && value == true) {
                price += 3;
            }
            if (key == 'preparePitch' && value == true) {
                price += 4;
            }
            if (key == 'borrowStuff' && value == true) {
                price += 5;
            }
            count += 1;
        } else {
            count += 1;
        }
    }
    let priceElement = document.getElementById("price");
    priceElement.innerHTML = "Cena za zarezervovanie ihriska je 10€ + za ďaľšie služby " + price + "€" + " takže spolu to bude " + (10 + price) + "€";
    priceElement.style.fontWeight = "bold";
    console.log(price + "price");
}

function printV() {
    if (flag) {
        console.log("VALID");
    } else {
        console.log("inVALID");
    }
}

function validateForm() {
    console.log("here");
    if (flag) {
        return true;
    } else {
        return false;
    }
}