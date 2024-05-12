const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyjoke')
        .setDescription('Get a daily joke!'),
    async execute(interaction) {
        const jokeSource = Math.random() < 0.5 ? fetchIcanhazdadjoke : fetchOfficialJoke;
        try {
            const joke = await jokeSource();
            await interaction.reply(joke);
        } catch (error) {
            console.error(error);
            let errorMessage = 'Failed to fetch a joke, please try again later.';
            if (error instanceof fetch.FetchError) {
                errorMessage = 'There was a problem reaching the joke service. Please try again later.';
            } else if (error.message.includes('status')) {
                errorMessage = 'The joke service is currently unavailable. Please try again later.';
            }
            await interaction.reply(errorMessage);
        }
    },
};

async function fetchIcanhazdadjoke() {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
        throw new Error(`icanhazdadjoke API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.joke;
}

async function fetchOfficialJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
    if (!response.ok) {
        throw new Error(`official-joke-api request failed with status ${response.status}`);
    }
    const data = await response.json();
    return `${data.setup} ${data.punchline}`;
}
