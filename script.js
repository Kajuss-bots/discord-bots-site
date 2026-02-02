const bots = [
  {
    name: "Crazy Lithuanians",
    description: "Tickets / level / links / monthly clan xp",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    invite: "#",
    support: "#",
    online: true,
    category: "Runescape"
  },
  {
    name: "Latitane Bot",
    description: "Siphoned energy + sell functions.",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
    invite: "#",
    support: "#",
    online: true,
    category: "AlbionOnline"
  },
  {
    name: "SignUp",
    description: "SignUp for mass. /signup",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712166.png",
    invite: "#",
    support: "#",
    online: false,
    category: "AlbionOnline"
  },
  {
    name: "Ticket Bot",
    description: "Bot with Ticket system",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712187.png",
    invite: "#",
    support: "#",
    online: false,
    category: "both"
  }
];

const botsContainer = document.getElementById("bots");
const filterButtons = document.querySelectorAll(".filter");

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

/* FILTER CLICKS */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderBots(btn.dataset.category);
  });
});

/* INITIAL LOAD — SVARBIAUSIA */
renderBots("all");
