const themeSelect = document.getElementById("themeSelect");
const root = document.documentElement;
const calcBtn = document.getElementById("calcBtn");
const result = document.getElementById("calcResult");

const themes = {
  light: {
    "--bg": "#f4f6fb",
    "--card": "#ffffff",
    "--ink": "#0f172a",
    "--muted": "#64748b",
  },
  dark: {
    "--bg": "#020617",
    "--card": "#0f172a",
    "--ink": "#f8fafc",
    "--muted": "#cbd5f5",
  },
};

function applyTheme(name) {
  const values = themes[name];
  Object.entries(values).forEach(([key, value]) => root.style.setProperty(key, value));
  document.body.dataset.theme = name;
}

themeSelect.addEventListener("change", (event) => applyTheme(event.target.value));
applyTheme(themeSelect.value);

calcBtn.addEventListener("click", () => {
  const visitors = Number(document.getElementById("visitors").value || 0);
  const conversion = Number(document.getElementById("conversion").value || 0) / 100;
  const deal = Number(document.getElementById("deal").value || 0);
  const baseline = visitors * conversion * deal;
  const lift = baseline * 1.32; // assumed average lift from hero page
  result.textContent = `Potential ARR: $${lift.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
});
