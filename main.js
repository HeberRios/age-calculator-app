"use strict";

// SELECTING ELEMENTS

const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const calculateBtn = document.querySelector("#calculate");

// REGULAR EXPRESSIONS

const dayRegex = /^(0?[1-9]|[12]\d|3[01])$/;
const monthRegex = /^(0+[1-9]|1[0-2])$/;
const yearRegex = /^[1-9]{2}\d{2}$/;

// FUNCTIONS

function validateDay() {
    if (dayInput.value === "") {
        dayInput.previousElementSibling.classList.add("error-active");
        dayInput.classList.add("error-active");
        dayInput.nextElementSibling.textContent = "This field is required";
        dayInput.nextElementSibling.classList.add("error-active");
    } else if (dayRegex.test(dayInput.value)) {
        dayInput.previousElementSibling.classList.remove("error-active");
        dayInput.classList.remove("error-active");
        dayInput.nextElementSibling.textContent = "Valid day";
        dayInput.nextElementSibling.classList.remove("error-active");
    } else {
        dayInput.previousElementSibling.classList.add("error-active");
        dayInput.classList.add("error-active");
        dayInput.nextElementSibling.textContent = "Must be a valid day";
        dayInput.nextElementSibling.classList.add("error-active");
    }
}

function validateMonth() {
    if (monthInput.value === "") {
        monthInput.previousElementSibling.classList.add("error-active");
        monthInput.classList.add("error-active");
        monthInput.nextElementSibling.textContent = "This field is required";
        monthInput.nextElementSibling.classList.add("error-active");
    } else if (monthRegex.test(monthInput.value)) {
        monthInput.previousElementSibling.classList.remove("error-active");
        monthInput.classList.remove("error-active");
        monthInput.nextElementSibling.textContent = "Valid month";
        monthInput.nextElementSibling.classList.remove("error-active");
    } else {
        monthInput.previousElementSibling.classList.add("error-active");
        monthInput.classList.add("error-active");
        monthInput.nextElementSibling.textContent = "Must be a valid month";
        monthInput.nextElementSibling.classList.add("error-active");
    }
}

function validateYear() {
    const currentYear = new Date().getFullYear();

    if (yearInput.value === "") {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "This field is required";
        yearInput.nextElementSibling.classList.add("error-active");
    } else if (+yearInput.value > currentYear) {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "Must be in the past";
        yearInput.nextElementSibling.classList.add("error-active");
    } else if (yearRegex.test(yearInput.value)) {
        yearInput.previousElementSibling.classList.remove("error-active");
        yearInput.classList.remove("error-active");
        yearInput.nextElementSibling.textContent = "Valid year";
        yearInput.nextElementSibling.classList.remove("error-active");
    } else {
        yearInput.previousElementSibling.classList.add("error-active");
        yearInput.classList.add("error-active");
        yearInput.nextElementSibling.textContent = "Must be a valid year";
        yearInput.nextElementSibling.classList.add("error-active");
    }
}

// EVENT LISTENERS

dayInput.addEventListener("input", validateDay);
monthInput.addEventListener("input", validateMonth);
yearInput.addEventListener("input", validateYear);
