const { Client, GatewayIntentBits } = require('discord.js');
const { scheduleDailyMessage } = require('./utils/scheduler');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Example usage of the scheduler
  const dailyMessageChannelId = 'YOUR_CHANNEL_ID';
  const dailyMessage = 'Good morning! Here is your daily joke.';
  scheduleDailyMessage(client, dailyMessageChannelId, dailyMessage);
});

client.login(process.env.DISCORD_TOKEN);
