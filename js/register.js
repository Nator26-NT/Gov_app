const registerForm = document.getElementById("register-form");

const normalizePhone = (value) =>
  value.trim().replace(/[\s\-().]/g, "");

const toE164ZA = (value) => {
  const cleaned = normalizePhone(value);

  if (cleaned.startsWith("+27") && cleaned.length === 12) {
    return cleaned;
  }

  if (cleaned.startsWith("27") && cleaned.length === 11) {
    return `+${cleaned}`;
  }

  if (cleaned.startsWith("0") && cleaned.length === 10) {
    return `+27${cleaned.slice(1)}`;
  }

  return null;
};

const isValidDate = (year, month, day) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const luhnCheck = (digits) => {
  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
};

const isValidSouthAfricanId = (id) => /^\d{13}$/.test(id);

if (registerForm) {
  const saIdField = registerForm.elements.sa_id;
  const emailField = registerForm.elements.email;
  const cellphoneField = registerForm.elements.cellphone;
  const altNumberField = registerForm.elements.alt_number;
  const passwordField = registerForm.elements.password;
  const confirmField = registerForm.elements.confirm_password;

  const setFieldError = (field, message) => {
    field.setCustomValidity(message);
    field.reportValidity();
  };

  const clearFieldError = (field) => {
    field.setCustomValidity("");
  };

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    [
      saIdField,
      emailField,
      cellphoneField,
      altNumberField,
      passwordField,
      confirmField,
    ].forEach((field) => field && clearFieldError(field));

    const saId = saIdField.value.trim().replace(/\D/g, "");
    saIdField.value = saId;
    if (!isValidSouthAfricanId(saId)) {
      setFieldError(
        saIdField,
        "SA ID must be exactly 13 digits."
      );
      return;
    }

    const cellphone = toE164ZA(cellphoneField.value);
    if (!cellphone) {
      setFieldError(
        cellphoneField,
        "Enter a valid SA number: +27 followed by 9 digits (e.g., +27821234567)."
      );
      return;
    }
    cellphoneField.value = cellphone;

    if (altNumberField.value.trim()) {
      const altNumber = toE164ZA(altNumberField.value);
      if (!altNumber) {
        setFieldError(
          altNumberField,
          "Enter a valid SA number: +27 followed by 9 digits (e.g., +27821234567)."
        );
        return;
      }
      altNumberField.value = altNumber;
    }

    if (passwordField.value.trim().length < 8) {
      setFieldError(passwordField, "Password must be at least 8 characters.");
      return;
    }

    if (passwordField.value !== confirmField.value) {
      setFieldError(confirmField, "Passwords do not match.");
      return;
    }

    if (!registerForm.checkValidity()) {
      registerForm.reportValidity();
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("indigeeUsers") || "[]");
    const normalizedEmail = emailField.value.trim().toLowerCase();

    const alreadyExists = storedUsers.some(
      (user) =>
        user.saId === saId ||
        (normalizedEmail && user.email === normalizedEmail)
    );

    if (alreadyExists) {
      setFieldError(
        saIdField,
        "An account with this SA ID or email already exists."
      );
      return;
    }

    const userRecord = {
      saId,
      email: normalizedEmail,
      password: passwordField.value.trim(),
      cellphone: cellphoneField.value.trim(),
      altNumber: altNumberField.value.trim(),
      createdAt: new Date().toISOString(),
    };

    storedUsers.push(userRecord);
    localStorage.setItem("indigeeUsers", JSON.stringify(storedUsers));
    localStorage.setItem("indigeeLastUser", saId);

    alert("Registration submitted. Redirecting to login.");
    window.location.href = "login.html";
  });
}
