const allDropdown = document.querySelectorAll(".dropdown");
allDropdown.forEach((dropdown) => {
  const input = dropdown.querySelector("input");
  input.addEventListener("focus", () => {
    dropdown.classList.toggle("open");
  });
  input.addEventListener("blur", (e) => {
    setTimeout(() => {
      dropdown.classList.toggle("open");
    }, 250);
  });
});
