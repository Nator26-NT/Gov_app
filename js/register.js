const registerForm = document.getElementById("register-form");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = registerForm.elements.name.value.trim();
    const email = registerForm.elements.email.value.trim();
    const password = registerForm.elements.password.value.trim();
    const confirm = registerForm.elements.confirm.value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration submitted. Hook up to backend when ready.");
  });
}
