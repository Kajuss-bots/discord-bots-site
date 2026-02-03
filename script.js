let metaBots = [];
let bots = [];
let currentCategory = "all";

const botsContainer = document.getElementById("bots");
const filterButtons = document.querySelectorAll(".filter");

const API_URL = "https://discord-bots-api.onrender.com/status";

/* =========================
   LOAD METADATA
========================= */
async function loadMeta() {
  const res = await fetch("status.json?_=" + Date.now());
  const data = await res.json();
  metaBots = data.bots;
}

/* =========================
   LOAD REAL STATUS FROM API
========================= */
async function loadStatus() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    bots = metaBots.map(meta => {
      const apiBot = data.bots.find(b => b.id === meta.id);

      return {
        ...meta,
        online: apiBot ? apiBot.online : false,
        avatar:
          apiBot && apiBot.avatar
            ? apiBot.avatar
            : `https://cdn.discordapp.com/embed/avatars/${Math.floor(
                Math.random() * 6
              )}.png`
      };
    });

    renderBots(currentCategory);
  } catch (err) {
    console.error("API error:", err);
  }
}

/* =========================
   RENDER BOTS
========================= */
function renderBots(category) {
  botsContainer.innerHTML = "";

  bots.forEach(bot => {
    if (category !== "all" && bot.category !== category) return;

    const div = document.createElement("div");
    div.className = "bot";

    div.innerHTML = `
      <div class="status ${bot.online ? "online" : "offline"}"></div>
      <img src="${bot.avatar}" alt="${bot.name}">
      <h2>${bot.name}</h2>
      <p>${bot.description}</p>
      <div class="buttons">
        <a href="${bot.invite}" target="_blank">Invite</a>
        <a href="${bot.support}" target="_blank" class="secondary">Support</a>
      </div>
    `;

    botsContainer.appendChild(div);
  });
}

/* =========================
   FILTERS
========================= */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderBots(currentCategory);
  });
});

/* =========================
   INIT
========================= */
(async () => {
  await loadMeta();
  await loadStatus();
  setInterval(loadStatus, 15000); // auto refresh
})();
