const registerForm = document.getElementById("register-form");

if (registerForm) {
  const saIdField = registerForm.elements.sa_id;
  const emailField = registerForm.elements.email;
  const cellphoneField = registerForm.elements.cellphone;
  const altNumberField = registerForm.elements.alt_number;
  const passwordField = registerForm.elements.password;
  const confirmField = registerForm.elements.confirm_password;

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("indigeeUsers") || "[]");

    const userRecord = {
      saId: saIdField.value.trim(),
      email: emailField.value.trim().toLowerCase(),
      password: passwordField.value.trim(),
      cellphone: cellphoneField.value.trim(),
      altNumber: altNumberField.value.trim(),
      createdAt: new Date().toISOString(),
    };

    storedUsers.push(userRecord);
    localStorage.setItem("indigeeUsers", JSON.stringify(storedUsers));
    localStorage.setItem("indigeeLastUser", userRecord.saId);

    alert("Registration submitted. Redirecting to login.");
    window.location.href = "login.html";
  });
}
