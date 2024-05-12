const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instigate')
        .setDescription('Stirs up a little friendly chaos!')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Choose a member to instigate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('phrase')
                .setDescription('Optional custom phrase to use in the instigation')
                .setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const customPhrase = interaction.options.getString('phrase');
        
        // Array of playful phrases to instigate with
        const phrases = [
           
            "does your hoes know what you're up to? 👀",
            "wrong bitch wrong bitch",
        ];

        // Choose a random phrase or use the custom one
        const phrase = customPhrase || phrases[Math.floor(Math.random() * phrases.length)];
        
        // Create the message to send
        const replyMessage = `${target}, nigga ${phrase}`;

        // Send the message in the interaction
        await interaction.reply(replyMessage);
    },
};
