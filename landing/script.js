const auditForm = document.getElementById("auditForm");
const statusEl = document.getElementById("formStatus");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

auditForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "Sending...";
  const formData = new FormData(auditForm);
  const payload = Object.fromEntries(formData.entries());
  try {
    await fakeNetwork(payload);
    auditForm.reset();
    statusEl.textContent = "Audit request received! Check your inbox for a confirmation.";
    statusEl.style.color = "#15803d";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Something went wrong. Email us at hello@arcwisestudio.com.";
    statusEl.style.color = "#b91c1c";
  }
});

function fakeNetwork(data) {
  return new Promise((resolve) => {
    console.info("Form submission", data);
    setTimeout(resolve, 900);
  });
}
