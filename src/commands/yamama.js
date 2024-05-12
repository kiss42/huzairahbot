const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yomama')
        .setDescription('Get a random "Yo Mama" joke!')
        .addUserOption(option => option.setName('user').setDescription('Whom to address the joke to').setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const filePath = path.join(__dirname, '../fs/joke_list.csv');

        try {
            // Read the contents of the CSV file synchronously
            const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
            const jokes = data.split('\n').slice(1).filter(line => line.trim() !== ''); // Skip the header and filter out empty lines

            // Select a random joke
            const randomIndex = Math.floor(Math.random() * jokes.length);
            const randomJokeLine = jokes[randomIndex];
            const randomJoke = randomJokeLine.split(',')[1]; // Assuming CSV format is id,joke,category

            // Format the reply to include the mentioned user's name, if applicable
            const replyText = user ? `${user}, ${randomJoke}` : randomJoke;

            // Reply with the joke
            await interaction.reply(replyText);
        } catch (err) {
            console.error('Error reading joke_list.csv:', err);
            await interaction.reply('Sorry, I couldn\'t fetch a joke right now.');
        }
    },
};
