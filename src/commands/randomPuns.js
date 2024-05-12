const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('findjoke')
        .setDescription('Find a joke based on a word!')
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The word to base the joke on')
                .setRequired(true)),
    async execute(interaction) {
        const term = interaction.options.getString('term');
        const joke = await fetchPun(term);
        await interaction.reply(joke);
    },
};

async function fetchPun(term) {
    // Note: As of the current API version, JokeAPI does not support a direct search functionality for jokes by a term.
    // The following implementation assumes hypothetical functionality or a future feature.
    const encodedTerm = encodeURIComponent(term);
    // Hypothetical URL including a search term query parameter.
    const url = `https://v2.jokeapi.dev/joke/Pun?contains=${encodedTerm}&blacklistFlags=nsfw,religious,political,explicit`;

    try {
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) {
            console.error('Failed to fetch the joke:', response.statusText);
            return 'Failed to fetch a joke. Please try again later.';
        }

        const data = await response.json();

        if (data.error) {
            console.error('Joke API returned an error:', data.message);
            return 'Sorry, I could not find a joke with that term.';
        }

        // Handle the response based on joke type
        if (data.type === 'single') {
            return data.joke;
        } else if (data.type === 'twopart') {
            return `${data.setup} ... ${data.delivery}`;
        } else {
            return 'No joke found for that term.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return 'Sorry, something went wrong while fetching your joke.';
    }
}
