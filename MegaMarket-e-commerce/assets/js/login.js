import {
  validateEmail,
  validatePassword,
  togglePasswordVisibility,
} from '/assets/js/utils.js';

const email = document.getElementById('email');
const password = document.getElementById('password');


const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

const signUpBtn = document.getElementById('login-btn');
const toggleIcon = document.getElementById("togglePassword");


toggleIcon.addEventListener("click", () => {
  togglePasswordVisibility(password, toggleIcon);
});

signUpBtn.addEventListener('click', e => {
  e.preventDefault();
  const isEmailValid = validateEmail(email.value, emailError);
  const isPasswordValid = validatePassword(password.value, passwordError);
  if ( isEmailValid && isPasswordValid) {

    // 
   
    

  }
});