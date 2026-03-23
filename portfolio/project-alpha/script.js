const steps = [...document.querySelectorAll(".step")];
let index = 0;
const form = document.getElementById("quoteForm");
const status = document.getElementById("status");

function showStep(i) {
  steps.forEach((step, idx) => step.classList.toggle("active", idx === i));
}

function changeStep(delta) {
  index = Math.min(Math.max(index + delta, 0), steps.length - 1);
  showStep(index);
}

steps.forEach((step) => {
  step.querySelectorAll("[data-next]").forEach((btn) => btn.addEventListener("click", () => changeStep(1)));
  step.querySelectorAll("[data-prev]").forEach((btn) => btn.addEventListener("click", () => changeStep(-1)));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Sending...";
  setTimeout(() => {
    status.textContent = "Quote scheduled!";
    form.reset();
    changeStep(-index);
  }, 800);
});
