// ==================================================
// ELEMENT REFERENCE
// ==================================================

const registrationForm = document.getElementById('registrationForm');
const enquiryForm = document.getElementById("enquiryForm");

const closeRegistration = document.querySelector('.close-registration');
const closeEnquiry = document.querySelector(".close-enquiry");

const registrationFormTriggers = document.querySelectorAll('.registration-form-trigger');
const enquiryFormTriggers = document.querySelectorAll(".enquiry-form-trigger");

const sections = document.querySelectorAll('.section');

// ==================================================
// IMPORTS
// ==================================================

import { createIntersectionObserver } from './fadein.js';

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO OPEN A FORM
function openForm(form) {
    form.classList.add('active');
}

// * FUNCTION TO CLOSE A FORM
function closeForm(form) {
    form.classList.remove('active');
}

// ==================================================
// FUNCTION CALLS
// ==================================================

const observer = createIntersectionObserver();

// ==================================================
// EVENT LISTENERS
// ==================================================

// & INITIAL DISPLAY SETTINGS
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        sections.forEach(section => { observer.observe(section); });
    }, 4000);
})

// & EVENT LISTENER FOR REGISTRATION-FORM-TRIGGER CLICK
registrationFormTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
        openForm(registrationForm);
    });
});

// & EVENT LISTENER FOR CLOSE-REGISTRATION CLICK
closeRegistration.addEventListener('click', () => {
    closeForm(registrationForm);
});

// & EVENT LISTENER FOR REGISTRATION-FORM-TRIGGER CLICK
enquiryFormTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
        openForm(enquiryForm);
    });
});

// & EVENT LISTENER FOR CLOSE-REGISTRATION CLICK
closeEnquiry.addEventListener('click', () => {
    closeForm(enquiryForm);
});