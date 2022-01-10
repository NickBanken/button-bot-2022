const express = require("express");
const router = express.Router();

const { Client, Intents } = require("discord.js");
const token = process.env['BOT_TOKEN']
const { promotions } = require("./promotions");
const { testServers } = require("./test-servers");
const { buildMessage } = require("./generateMessage");

const todayIsHoliday = (holiday) => {
    const currentDate = new Date();

    if (
        currentDate >= holiday.start &&
        currentDate.setUTCHours(23, 59, 59) <= holiday.end
    ) {
        return true;
    }
}

const groupIsWorkingToday = (group) => {
    const currentDate = new Date();

    if ((currentDate >= group.start &&
        currentDate.setUTCHours(23, 59, 59) <= group.end)) {
        return true;
    }
}

const sendMessageToGroup = (group, channel) => {
    const discordChannel = group.channel_id;
    const role = group.role_id;
    const holidays = group.holidays;

    if (discordChannel !== channel.id.toString()) {
        return false;
    }

    holidays.forEach((holiday) => {
        if (todayIsHoliday(holiday)) {
            return false;
        }
    });

    if (!groupIsWorkingToday(group)) {
        return false;
    }

    const unfilteredMessage = buildMessage(role);
    channel.send(unfilteredMessage);
}

// Get the generateMessage
const sendMessageToAllGroups = (guilds) => {
    guilds.forEach((guild, key) => {
        // All channels on all Discord servers
        guild.channels.cache.forEach(channel => {
            promotions.forEach((promo, index) => {
                sendMessageToGroup(promo, channel)
            });
        });
    });
};

const showTimestamp = () => {
    const date = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Brussels"
    });

    const localDate = new Date(date);
    const localTime = localDate.getHours() + ":" + localDate.getMinutes();

    console.log(localTime);
}

const buttonBotLoaded = () => {
    console.log("READY!");
    // Guilds is Discord terminology for servers
    // TODO: is map needed here?
    const guilds = client.guilds.cache.map(guild => guild);

    sendMessageToAllGroups(guilds);
    showTimestamp()
}

const buttonBot = (request, response, next) => {
    // Create a new client instance
    const bot = new Client({
        intents: [Intents.FLAGS.GUILDS],
        allowedMentions: { parse: ["users", "roles"] }
    });

    bot.once("ready", buttonBotLoaded);

    // Token in .ENV
    bot.login(token);

    response.render('index', { status: "Active", version: "1.0.0" })
}

router.get("/", buttonBot(request, response, next));

module.exports = router;
