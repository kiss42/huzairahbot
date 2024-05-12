const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('insult')
        .setDescription('Generates a random insult.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Who do you want to insult?')
                .setRequired(true)),
    async execute(interaction) {
        // Fetching the insult from the API
        const response = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json');
        const data = await response.json(); // Parsing the JSON response

        // Getting the user option
        const user = interaction.options.getUser('user');
        
        // Replying with the insult
        await interaction.reply(`${user}, ${data.insult}`);
    },
};
