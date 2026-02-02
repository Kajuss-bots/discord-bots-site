const bots = [
  {
    name: "Crazy Lithuanians",
    description: "Tickets / level / links / monthly clan xp",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
    invite: "https://discord.com/oauth2/authorize?client_id=1440312480395169793&permissions=8&integration_type=0&scope=bot",
    support: "https://discord.gg/CMqTmZdMfN",
    online: true
  },
  {
    name: "Latitane Bot",
    description: "Siphoned energy + sell functions.",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712139.png",
    invite: "https://discord.com/oauth2/authorize?client_id=1459178434361298974&permissions=0&integration_type=0&scope=bot",
    support: "https://discord.gg/CMqTmZdMfN",
    online: true
  },
  {
    name: "SignUp",
    description: "SignUp for mass. /signup",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712166.png",
    invite: "https://discord.com/oauth2/authorize?client_id=1464333078502703169&permissions=8&integration_type=0&scope=bot",
    support: "https://discord.gg/CMqTmZdMfN",
    online: false
  },
  {
    name: "Ticket Bot",
    description: "Bot with Ticket system",
    avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712187.png",
    invite: "https://discord.com/oauth2/authorize?client_id=1457309109677326431&permissions=8&integration_type=0&scope=bot",
    support: "https://discord.gg/CMqTmZdMfN",
    online: false
  }
];

const botsContainer = document.getElementById("bots");

function renderBots() {
  botsContainer.innerHTML = "";

  bots.forEach(bot => {
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

// pirmas render
renderBots();

// 🔄 AUTOMATINIS STATUS UPDATE (kas 10 sek.)
setInterval(() => {
  bots.forEach(bot => {
    bot.online = Math.random() > 0.5;
  });

  renderBots();
}, 10000);
