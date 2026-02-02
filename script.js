let bots = [];
let currentCategory = "all";

const botsContainer = document.getElementById("bots");
const filterButtons = document.querySelectorAll(".filter");

async function loadStatus() {
  const res = await fetch("status.json?_=" + Date.now());
  const data = await res.json();
  bots = data.bots;

  updateFilterCounts();
  renderBots(currentCategory);
}

function renderBots(category) {
  botsContainer.innerHTML = "";

  bots.forEach(bot => {
    if (category !== "all" && bot.category !== category) return;

    const div = document.createElement("div");
    div.className = "bot";

    div.innerHTML = `
      <div class="status ${bot.online ? "online" : "offline"}"></div>
      <img src="${bot.avatar}">
      <h2>${bot.name}</h2>
      <p>${bot.description}</p>
      <div class="buttons">
        <a href="${bot.invite}">Invite</a>
        <a href="${bot.support}" class="secondary">Support</a>
      </div>
    `;

    botsContainer.appendChild(div);
  });
}

/* 🧠 BOT COUNT */
function updateFilterCounts() {
  filterButtons.forEach(btn => {
    const category = btn.dataset.category;

    let count;
    if (category === "all") {
      count = bots.length;
    } else {
      count = bots.filter(bot => bot.category === category).length;
    }

    const baseText = btn.textContent.split(" (")[0];
    btn.textContent = `${baseText} (${count})`;
  });
}

/* FILTER CLICKS */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderBots(currentCategory);
  });
});

/* INITIAL LOAD */
loadStatus();

/* AUTO REFRESH kas 15 s */
setInterval(loadStatus, 15000);
