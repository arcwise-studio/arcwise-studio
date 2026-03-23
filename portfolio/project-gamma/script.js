const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function activate(tabId) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabId));
  panels.forEach((panel) => panel.classList.toggle("show", panel.id === tabId));
}

tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.tab)));
