"use strict";

// SELECTING ELEMENTS

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const calculateBtn = document.querySelector("#calculate");

// REGULAR EXPRESSIONS

const dayRegex = /^(0+[1-9]|[12]\d|3[01])$/;
const monthRegex = /^(0+[1-9]|1[0-2])$/;
const yearRegex = /^[1-9]{1}\d{3}$/;

// FUNCTIONS

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

    // validateYear();
    // validateMonth();
    // validateDay();

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
            return;
        }
    } else {
        return;
    }
}

// EVENT LISTENERS

dayInput.addEventListener("input", validateDay);
monthInput.addEventListener("input", validateMonth);
yearInput.addEventListener("input", validateYear);

calculateBtn.addEventListener("click", function (e) {
    e.preventDefault();

    validateDate();
});
