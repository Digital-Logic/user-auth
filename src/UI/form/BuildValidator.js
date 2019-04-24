import isEmailValidator from 'validator/lib/isEmail';


function required( message="Field is required") {
    return function _required(value) {
        if (!value || value.trim().length === 0) {
            return 'Field is required';
        }
    }
}

function minLength(length, message=`Field must be ${length} characters long.`) {
    return function _minLength(value) {
        if (!value || value.trim().length < length) {
            return message
        }
    }
}

function isEmail(message="Field must be a valid email address.") {
    return function _isEmail(value) {
        if (!isEmailValidator(value)) {
            return message;
        }
    }
}


function equalTo(key, message="Passwords do not match.") {
    return function _equalTo(value, formValues) {
        if (value !== formValues[key]) {
            return message;
        }
    }
}

export {
    required,
    minLength,
    isEmail,
    equalTo
};