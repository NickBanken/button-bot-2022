const express = require("express");
const router = express.Router();

const { Client, Intents, Guild } = require('discord.js');
const cron = require('node-cron');
// const token = process.env.DISCORD_BOT_TOKEN;
// const port = process.env.PORT;
const { token } = require('../config.json');
const { promotions } = require('./promotions');
const { testServers } = require('./test-servers');
const { buildMessage } = require('./generateMessage');

router.get("/", function(req, res, next) {
    let botMessage;
    // Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS],
        allowedMentions: { parse: ['users', 'roles'] }
    });
// Get the generateMessage
    const composeMessage = (guilds) => {
        let thisGuild;
        let discordChannel;
        let role;
        let holidays;
        let start;
        let end;


        guilds.map((guild, key) => {
            // All channels on all Discord servers
            guild.channels.cache.map(channel => {
                // All promotions

                // Change testServers to promotions before production!
                testServers.forEach((promo, index) => {
                    thisGuild = promo.guild_id;
                    discordChannel = promo.channel_id;
                    role = promo.role_id;
                    holidays = promo.holidays;
                    start = promo.start;
                    end = promo.end;

                    // All relevant promotions
                    if (discordChannel === channel.id.toString()) {
                        const notAHoliday = [];
                        const currentDate = new Date();

                        holidays.forEach(holiday => {
                            if(currentDate >= holiday.start && currentDate.setUTCHours(23, 59, 59) <= holiday.end) {
                                notAHoliday.push(false);
                            }
                        });

                        if(notAHoliday.length === 0 && (currentDate >= promo.start && currentDate.setUTCHours(23, 59, 59) <= promo.end)) {
                            const unfilteredMessage = buildMessage(role);
                            channel.send(unfilteredMessage);
                        }
                    }
                });
            })
        })
    }

// When the client is ready, run this code (only once)
    client.once('ready', () => {
        console.log("READY!")
        const guilds = client.guilds.cache.map(guild => guild);

        // Test Cron scheduler
        cron.schedule("0 8 17 * * Mon,Tue,Wed,Thu,Fri,Sat,Sun", () => {
            composeMessage(guilds);
        })

        // Actual Cron schedules
        cron.schedule("0 55 8 * * Mon,Tue,Wed,Thu,Fri,Sat,Sun", () => {
            composeMessage(guilds);
        })
        cron.schedule("0 31 11 * * Mon,Tue,Wed,Thu,Fri,Sat,Sun", () => {
            console.log('test')
            composeMessage(guilds);
        })
        cron.schedule("0 25 12 * * Mon,Tue,Wed,Thu,Fri,Sat,Sun", () => {
            composeMessage(guilds);
        })
        cron.schedule("0 1 16 * * Mon,Tue,Wed,Thu,Fri,Sat,Sun", () => {
            composeMessage(guilds);
        })
        composeMessage(guilds);
        const date = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Brussels"
        });
        const localDate = new Date(date);
        const localTime = localDate.getHours() + ":" + localDate.getMinutes();

        console.log(localTime);
        botMessage = 'bot is online!!';
    });

// Login to Discord with your client's token
    client.login(token);

    res.send({
        message: 'Bot is online!!',
        status: 200,
    })
});

module.exports = router;