const express = require("express");
const router = express.Router();

const { Client, Intents } = require("discord.js");
const token = process.env['BOT_TOKEN']
const { promotions } = require("./promotions");
const { testServers } = require("./test-servers");
const { buildMessage } = require("./generateMessage");

router.get("/", function(req, res, next) {

    // Create a new client instance
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS],
        allowedMentions: { parse: ["users", "roles"] }
    });
    // Get the generateMessage
    const composeMessage = guilds => {
        let discordChannel;
        let role;
        let holidays;

        guilds.map((guild, key) => {
            // All channels on all Discord servers
            guild.channels.cache.map(channel => {

                promotions.forEach((promo, index) => {
                    discordChannel = promo.channel_id;
                    role = promo.role_id;
                    holidays = promo.holidays;

                    // All relevant promotions
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
                            (currentDate >= promo.start &&
                                currentDate.setUTCHours(23, 59, 59) <= promo.end)
                        ) {
                            const unfilteredMessage = buildMessage(role);
                            channel.send(unfilteredMessage);
                        }
                    }
                });
            });
        });
    };

    client.once("ready", () => {
        console.log("READY!");
        const guilds = client.guilds.cache.map(guild => guild);

        composeMessage(guilds);

        const date = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Brussels"
        });

        const localDate = new Date(date);
        const localTime = localDate.getHours() + ":" + localDate.getMinutes();

        console.log(localTime);
    });

    client.login(token);

    // Login to Discord with your client's token

    res.render('index', { status: "Active", version: "1.0.0" })
});

module.exports = router;
