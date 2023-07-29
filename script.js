// Signup page functionality
const signupForm = document.getElementById('signupForm');
const errorMessageDiv = document.getElementById('errorMessage');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if all fields are filled
  if (!name || !email || !password || !confirmPassword) {
    displayErrorMessage('All fields are mandatory!');
  } else if (password !== confirmPassword) {
    displayErrorMessage('Passwords do not match!');
  } else {
    // Generate a random 16-byte access token
    const accessToken = generateAccessToken();

    // Save user details and access token to local storage
    saveUserToLocalStorage(name, email, accessToken, password);

    // Display success message
    displayMessage('Signup Successful!', true);

    // Redirect to the profile page after a brief delay
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 2000);
  }
});

function generateAccessToken() {
  const tokenLength = 16;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

function saveUserToLocalStorage(name, email, accessToken, password) {
  const user = {
    name,
    email,
    accessToken,
    password,
  };
  localStorage.setItem('user', JSON.stringify(user));
}

function displayErrorMessage(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.color = '#f44336';
}

// Profile page functionality
const profileDetailsDiv = document.getElementById('profileDetails');
const logoutBtn = document.getElementById('logoutBtn');

// Check if the user is logged in (i.e., if there is an access token in local storage)
const user = JSON.parse(localStorage.getItem('user'));
const isUserLoggedIn = user && user.accessToken;

if (isUserLoggedIn) {
  // Display user details on the profile page
  const profileDetailsHTML = `
    <p><strong>Full Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Token:</strong> ${user.accessToken}</p>
    <p><strong>Password:</strong> ${user.password}</p>
  `;
  profileDetailsDiv.innerHTML = profileDetailsHTML;

  // Logout button functionality
  logoutBtn.addEventListener('click', () => {
    // Clear local storage and redirect to the signup page
    localStorage.clear();
    window.location.href = 'index.html';
  });
} else {
  // User is not logged in, redirect to the signup page
  window.location.href = 'index.html';
}
