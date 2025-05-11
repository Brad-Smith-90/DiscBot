require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const spinSlots = require("./spin.js"); // Import slot function from spin.js

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async msg => {
  if (msg.author.bot) return; // Ignore bot messages

  if (msg.content === "Hello") {
    msg.reply("Greetings!");
  }

  if (msg.content === "!roll") {
    const roll = Math.floor(Math.random() * 6) + 1;
    msg.reply(`You rolled a ${roll}`);
  }

  if (msg.content === "!spin") {
    await spinSlots(msg); // Call the spin animation logic from spin.js
  }
});

client.login(process.env.TOKEN);
