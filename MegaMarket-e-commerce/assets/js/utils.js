// Fetch data from an API
export async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Fetch failed: ' + res.status);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Truncate long text
export function truncateText(text, wordLimit = 20, end = '...') {
  if (!text) return '';
  const words = text.split(' ');
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + end
    : text;
}

//Restart CSS animation
export function animateElement(element, animationClass) {
  element.classList.remove(animationClass);
  void element.offsetWidth;
  element.classList.add(animationClass);
}

//form-validation

// Validate full name
export function validateName(name, errorElement) {
  if (!name || name.trim() === '') {
    errorElement.textContent = 'Full name is required.';
    return false;
  } else if (!/^[A-Za-z\s]{3,}$/.test(name)) {
    errorElement.textContent =
      'Name must contain only letters and be at least 3 characters.';
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

// Validate email format
export function validateEmail(mail, errorElement) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (mail.trim() === '') {
    errorElement.textContent = 'Email is required.';
    return false;
  } else if (!pattern.test(mail)) {
    errorElement.textContent = 'Please enter a valid email address.';
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

// Validate password
export function validatePassword(pass, errorElement) {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  if (pass.trim() === '') {
    errorElement.textContent = 'Password is required.';
    return false;
  } else if (!pattern.test(pass)) {
    errorElement.textContent =
      'Password must be at least 8 chars, include uppercase, lowercase, number, and symbol.';
    return false;
  } else {
    errorElement.textContent = '';
    return true;
  }
}

//Toggle password visibility
export function togglePasswordVisibility(passwordInput, toggleIcon) {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleIcon.classList.toggle('fa-eye');
  toggleIcon.classList.toggle('fa-eye-slash');
}

