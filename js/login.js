const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value.trim();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    alert("Login submitted. Hook up to backend when ready.");
  });
}
