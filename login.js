function togglePassword() {
  const passwordField = document.getElementById("password");
  const checkbox = document.getElementById("togglePasswordCheckbox");
  passwordField.type = checkbox.checked ? "text" : "password";
}

function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  let isValid = true;

  emailError.textContent = "";
  passwordError.textContent = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email";
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long";
    isValid = false;
  } else if (!/[a-z]/.test(password)) {
    passwordError.textContent =
      "Password must contain at least one lowercase letter";
    isValid = false;
  } else if (!/[A-Z]/.test(password)) {
    passwordError.textContent =
      "Password must contain at least one uppercase letter";
    isValid = false;
  } else if (!/[0-9]/.test(password)) {
    passwordError.textContent = "Password must contain at least one number";
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordError.textContent =
      "Password must contain at least one special character";
    isValid = false;
  }

  return isValid;
}

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        spinner.style.display = "none";
        if (data.id) {
          document.getElementById("successMessage").textContent =
            "Login successful!";
          document.getElementById("errorMessage").textContent = "";
        } else {
          document.getElementById("errorMessage").textContent =
            "Login failed. Please try again.";
          document.getElementById("successMessage").textContent = "";
        }
      })
      .catch((error) => {
        spinner.style.display = "none";
        document.getElementById("errorMessage").textContent =
          "Login failed. Please try again.";
        document.getElementById("successMessage").textContent = "";
      });

    if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("rememberMe", email);
    }
  }
});
