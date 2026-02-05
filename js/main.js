const languageSelect = document.getElementById("language");

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    localStorage.setItem("indigee-lang", languageSelect.value);
  });

  const saved = localStorage.getItem("indigee-lang");
  if (saved) {
    languageSelect.value = saved;
  }
}
