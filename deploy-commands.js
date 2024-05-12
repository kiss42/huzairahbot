require('dotenv').config(); // Make sure this is at the top of your file

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Delete all global commands
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [] },
        );
        console.log('Successfully deleted all global commands.');

        // Retrieve the guild ID from your .env file
        const guildId = process.env.GUILD_ID; // Make sure GUILD_ID is in your .env file

        // Delete all guild-specific commands for your guild
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            { body: [] },
        );
        console.log(`Successfully deleted all guild-specific commands for guild ID: ${guildId}`);

        // Re-register global commands
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('Successfully reloaded global application (/) commands.');

    } catch (error) {
        console.error(error);
    }
})();
