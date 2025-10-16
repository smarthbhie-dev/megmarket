import {
  validateName,
  validateEmail,
  validatePassword,
  togglePasswordVisibility,
} from '/assets/js/utils.js';

const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const signUpBtn = document.getElementById('signUpBtn');
const toggleIcon = document.getElementById("togglePassword");


toggleIcon.addEventListener("click", () => {
  togglePasswordVisibility(password, toggleIcon);
});

signUpBtn.addEventListener('click', e => {
  e.preventDefault();
  const isNameValid = validateName(fullName.value, nameError);
  const isEmailValid = validateEmail(email.value, emailError);
  const isPasswordValid = validatePassword(password.value, passwordError);
  if (isNameValid && isEmailValid && isPasswordValid) {

    //
    
    

  }
});
