// ==================================================
// ELEMENT REFERENCE
// ==================================================

const successPage = document.getElementById('successPage');

const registrationName = document.getElementById('registrationName');
const registrationEmail = document.getElementById('registrationEmail');
const registrationPhone = document.getElementById('registrationPhone');

const enquiryName = document.getElementById('enquiryName');
const enquiryEmail = document.getElementById('enquiryEmail');
const enquiryPhone = document.getElementById('enquiryPhone');
const enquiryLine = document.getElementById('enquiryLine');

const registrationSend = document.querySelector('#registrationForm .send');
const enquirySend = document.querySelector("#enquiryForm .send");

const hideSuccessPage = document.querySelector('.success-page .btn');

// ==================================================
// FUNCTIONS
// ==================================================

// * FUNCTION TO TOGGLE SEND-BTN STATE
function toggleSendBtnState(btn) {
    btn.classList.toggle('disabled', registrationPhone.value.trim() === '' || registrationName.value.trim() === '' || registrationEmail.value.trim() === '');
}

// * FUNCTION TO UPDATE INPUT STATES
function updateInputState(elem) {
    if (elem.value.trim() === '') {
        elem.style.borderColor = 'var(--color-state-red)';
        const msg = elem.parentElement.querySelector('.err-msg');
        if (!msg) { return; }
        msg.classList.remove('hidden');
        msg.textContent = 'This field is required';
    }

    else {
        elem.style.borderColor = 'var(--color-state-green)';
        const msg = elem.parentElement.querySelector('.err-msg');
        if (!msg) { return; }
        msg.classList.add('hidden');
        msg.textContent = '';
    }
}

// * FUNCTION TO CREATE A FORM DATA OBJECT
function createFormData(entries) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(entries)) {
        formData.append(key, value.value);
    }

    return formData;
}

// * FUNCTION TO RESET INPUTS
function resetInputs(inputs) {
    inputs.forEach(element => {
        element.value = '';
    });
}

// * FUNCTION TO ADD EVENT LISTENER FOR UPDATING INPUT STATE
function addUpdateStateChanger(input, submitBtn) {
    input.addEventListener('input', () => {
        updateInputState(input);
        toggleSendBtnState(submitBtn);
    });
}

// * FUNCTION TO SUBMIT A FORM
function addSubmissionListener(submitBtn, entries, submitURL) {
    const inputs = Object.values(entries);

    submitBtn.addEventListener('click', () => {
        let isValid = true;

        // Validate inputs
        inputs.forEach((input) => {
            if (input.value.trim() == '') {
                isValid = false;
                updateInputState(input);
            }
        });

        if (!isValid) {
            submitBtn.classList.add('shake');
            setTimeout(() => {
                submitBtn.classList.remove('shake');
            }, 2000);
            return;
        }

        // Submit form
        try {
            const formData = createFormData(entries);
            fetch(submitURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            resetInputs(inputs);

            submitBtn.classList.remove('open');
            setTimeout(() => {
                successPage.classList.add('open');
            }, 400);

        } catch {
            submitBtn.style.borderColor = 'var(--color-state-red)';
            submitBtn.textContent = "Error submitting form.";
        }
    });
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// & EVENT LISTENER FOR SETTINGS POPOVER TOGGLE
registrationForm.addEventListener('beforetoggle', (event) => {
    setTimeout(() => {
        registrationForm.classList.toggle('open', event.newState === 'open');
    }, 100);
});

// & EVENT LISTENER FOR INPUT VALIDATION
addUpdateStateChanger(registrationName, registrationSend);
addUpdateStateChanger(registrationEmail, registrationSend);
addUpdateStateChanger(registrationPhone, registrationSend);

// & EVENT LISTENER FOR SUCCESS PAGE CLOSE
hideSuccessPage.addEventListener('click', () => {
    successPage.classList.remove('open');
});

// & EVENT LISTENER FOR REGISTRATION FORM SUBMISSION
addSubmissionListener(
    registrationSend,
    {
        'entry.1918707273': registrationName,
        'entry.1654067689': registrationEmail,
        'entry.700167914': registrationPhone,
    },
    'https://docs.google.com/forms/d/e/1FAIpQLSe5k_scVs7FVaPFfD6KgNR3T7wGEa6MZPDKXUvp-KA1bEZ6XA/formResponse'
);

// & EVENT LISTENER FOR ENQUIRY FORM SUBMISSION
addSubmissionListener(
    enquirySend,
    {
        'entry.1551876098': enquiryName,
        'entry.1204135284': enquiryEmail,
        'entry.1855383320': enquiryPhone,
        'entry.1565867744': enquiryLine,
    },
    'https://docs.google.com/forms/d/e/1FAIpQLSfTXjt5uYNt296mS8vLoXKfgS47EMcyYJdvsb432ZEy3IvKwA/formResponse'
);