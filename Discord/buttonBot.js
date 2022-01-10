const express = require("express");
const router = express.Router();

const { Client, Intents } = require("discord.js");
const token = process.env['BOT_TOKEN']
const { promotions } = require("./promotions");
const { testServers } = require("./test-servers");
const { buildMessage } = require("./generateMessage");

const sendMessageToGroup = (group, channel) => {
    const discordChannel = group.channel_id;
    const role = group.role_id;
    const holidays = group.holidays;

    if (discordChannel === channel.id.toString()) {
        const notAHoliday = [];
        const currentDate = new Date();

        holidays.forEach(holiday => {
            if (
                currentDate >= holiday.start &&
                currentDate.setUTCHours(23, 59, 59) <= holiday.end
            ) {
                notAHoliday.push(false);
            }
        });

        if (
            notAHoliday.length === 0 &&
            (currentDate >= group.start &&
                currentDate.setUTCHours(23, 59, 59) <= group.end)
        ) {
            const unfilteredMessage = buildMessage(role);
            channel.send(unfilteredMessage);
        }
    }
}

// Get the generateMessage
const composeMessage = guilds => {
    guilds.map((guild, key) => {
        // All channels on all Discord servers
        guild.channels.cache.map(channel => {
            promotions.forEach((promo, index) => {
                sendMessageToGroup(promo, channel)
            });
        });
    });
};

const buttonBotLoaded = () => {
    console.log("READY!");
    const guilds = client.guilds.cache.map(guild => guild);

    composeMessage(guilds);

    const date = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Brussels"
    });

    const localDate = new Date(date);
    const localTime = localDate.getHours() + ":" + localDate.getMinutes();

    console.log(localTime);
}

const buttonBot = (request, response, next) => {
    // Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS],
        allowedMentions: { parse: ["users", "roles"] }
    });

    client.once("ready", buttonBotLoaded);

    client.login(token);

    // Login to Discord with your client's token

    response.render('index', { status: "Active", version: "1.0.0" })
}

router.get("/", buttonBot(request, response, next));

module.exports = router;
