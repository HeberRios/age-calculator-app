"use strict";

// SELECTING ELEMENTS

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const calculateBtn = document.querySelector("#calculate");
const resultYear = document.querySelector("#result-year");
const resultMonth = document.querySelector("#result-month");
const resultDay = document.querySelector("#result-day");
const resultsArray = [resultYear, resultMonth, resultDay];

// REGULAR EXPRESSIONS

const dayRegex = /^(0[1-9]|[12]\d|3[01])$/;
const monthRegex = /^(0[1-9]|1[0-2])$/;
const yearRegex = /^[1-9]{1}\d{3}$/;

// VARIABLES
const speedValue = 50;

// FUNCTIONS

function displayResultNumbers() {
    resultsArray.forEach(function (resultElement) {
        resultElement.textContent = "0";

        function animate() {
            const result = +resultElement.getAttribute("data-result");
            const data = +resultElement.innerText;

            const time = result / speedValue;

            if (data < result) {
                resultElement.innerText = Math.ceil(data + time);
                setTimeout(animate, 10);
            } else {
                resultElement.innerText = result;
            }
        }
        animate();
    });
}

function validateDay() {
    if (dayInput.value === "") {
        dayInput.previousElementSibling.classList.add("error-active");
        dayInput.classList.add("error-active");
        dayInput.nextElementSibling.textContent = "This field is required";
        dayInput.nextElementSibling.classList.add("error-active");
        return false;
    } else if (dayRegex.test(dayInput.value)) {
        dayInput.previousElementSibling.classList.remove("error-active");
        dayInput.classList.remove("error-active");
        dayInput.nextElementSibling.textContent = "Valid day";
        dayInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        dayInput.previousElementSibling.classList.add("error-active");
        dayInput.classList.add("error-active");
        dayInput.nextElementSibling.textContent = "Must be a valid day";
        dayInput.nextElementSibling.classList.add("error-active");
        return false;
    }
}

function validateMonth() {
    if (monthInput.value === "") {
        monthInput.previousElementSibling.classList.add("error-active");
        monthInput.classList.add("error-active");
        monthInput.nextElementSibling.textContent = "This field is required";
        monthInput.nextElementSibling.classList.add("error-active");
        return false;
    } else if (monthRegex.test(monthInput.value)) {
        monthInput.previousElementSibling.classList.remove("error-active");
        monthInput.classList.remove("error-active");
        monthInput.nextElementSibling.textContent = "Valid month";
        monthInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        monthInput.previousElementSibling.classList.add("error-active");
        monthInput.classList.add("error-active");
        monthInput.nextElementSibling.textContent = "Must be a valid month";
        monthInput.nextElementSibling.classList.add("error-active");
        return false;
    }
}

function validateYear() {
    const currentYear = new Date().getFullYear();

    if (yearInput.value === "") {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "This field is required";
        yearInput.nextElementSibling.classList.add("error-active");
        return false;
    } else if (+yearInput.value > currentYear) {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "Must be in the past";
        yearInput.nextElementSibling.classList.add("error-active");
        return false;
    } else if (yearRegex.test(yearInput.value)) {
        yearInput.previousElementSibling.classList.remove("error-active");
        yearInput.classList.remove("error-active");
        yearInput.nextElementSibling.textContent = "Valid year";
        yearInput.nextElementSibling.classList.remove("error-active");
        return true;
    } else {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "Must be a valid year";
        yearInput.nextElementSibling.classList.add("error-active");
        return false;
    }
}

function validateDate() {
    const monthDays = new Date(
        +yearInput.value,
        +monthInput.value,
        0
    ).getDate();

    if (validateYear() && validateMonth() && validateDay()) {
        if (monthDays < +dayInput.value) {
            dayInput.previousElementSibling.classList.add("error-active");
            dayInput.classList.add("error-active");
            dayInput.nextElementSibling.textContent = "Must be a valid date";
            dayInput.nextElementSibling.classList.add("error-active");

            monthInput.previousElementSibling.classList.add("error-active");
            monthInput.classList.add("error-active");
            monthInput.nextElementSibling.textContent = "";
            monthInput.nextElementSibling.classList.remove("error-active");

            yearInput.previousElementSibling.classList.add("error-active");
            yearInput.classList.add("error-active");
            yearInput.nextElementSibling.textContent = "";
            yearInput.nextElementSibling.classList.remove("error-active");
        } else {
            calculateAge(yearInput.value, monthInput.value, dayInput.value);
        }
    } else {
        return;
    }
}

function calculateAge(year, month, day) {
    let resultYears = 0;
    let resultMonths = 0;
    let resultDays = 0;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    // First calculate the years

    resultYears = currentYear - +year;

    // Second calculate the months

    if (currentMonth < +month) {
        resultYears--;
        resultMonths = currentMonth + 12 - +month;
    } else {
        resultMonths = currentMonth - +month;
    }

    // Third calculate the days

    if (currentDay < +day) {
        resultMonths--;
        const previousMonth = new Date().getMonth();
        const daysInPreviousMonth = new Date(
            currentYear,
            previousMonth,
            0
        ).getDate();

        resultDays = currentDay + daysInPreviousMonth - +day;
    } else {
        resultDays = currentDay - +day;
    }

    // check final results

    if (resultMonths < 0) {
        resultYears--;
        resultMonths = 12 + resultMonths;
    }

    resultYear.setAttribute("data-result", resultYears);
    resultMonth.setAttribute("data-result", resultMonths);
    resultDay.setAttribute("data-result", resultDays);

    displayResultNumbers();
}

// EVENT LISTENERS

dayInput.addEventListener("input", validateDay);
monthInput.addEventListener("input", validateMonth);
yearInput.addEventListener("input", validateYear);

calculateBtn.addEventListener("click", function (e) {
    e.preventDefault();

    validateDate();
});
