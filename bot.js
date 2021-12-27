// Require the necessary discord.js classes
const { Client, Intents, Guild } = require('discord.js');
const cron = require('node-cron');
const { token } = require('./config.json');
const { promotions } = require('./Discord/promotions');
const { buildMessage } = require('./Discord/generateMessage');
// import promotions from './promotions';

// // Create a new client instance
// const client = new Client({
//     intents: [Intents.FLAGS.GUILDS],
//     allowedMentions: { parse: ['users', 'roles'] }
// });
// // Get the generateMessage
// const composeMessage = (guilds) => {
//     let thisGuild;
//     let discordChannel;
//     let role;
//     let holidays;
//     let start;
//     let end;
//
//     guilds.map((guild, key) => {
//         // All channels on all Discord servers
//         guild.channels.cache.map(channel => {
//             // All promotions
//             promotions.forEach((promo, index) => {
//                 thisGuild = promo.guild_id;
//                 discordChannel = promo.channel_id;
//                 role = promo.role_id;
//                 holidays = promo.holidays;
//                 start = promo.start;
//                 end = promo.end;
//
//                 // All relevant promotions
//                 if (discordChannel === channel.id.toString()) {
//                     const notAHoliday = [];
//                     const currentDate = new Date();
//
//                     holidays.forEach(holiday => {
//                         if(currentDate >= holiday.start && currentDate.setUTCHours(23, 59, 59) <= holiday.end) {
//                             notAHoliday.push(false);
//                         }
//                     });
//
//                     if(notAHoliday.length === 0 && (currentDate >= promo.start && currentDate.setUTCHours(23, 59, 59) <= promo.end)) {
//                         const unfilteredMessage = buildMessage(role);
//                         channel.send(unfilteredMessage);
//                     }
//                 }
//             });
//         })
//     })
// }
//
// // When the client is ready, run this code (only once)
// client.once('ready', () => {
//     console.log("READY!")
//     const guilds = client.guilds.cache.map(guild => guild);
//
//     cron.schedule("0 55 9 * * Mon,Tue,Wed,Thu,Fri,Sat", () => {
//         composeMessage(guilds);
//     })
//     cron.schedule("0 31 12 * * Mon,Tue,Wed,Thu,Fri,Sat", () => {
//         console.log('test')
//         composeMessage(guilds);
//     })
//     cron.schedule("0 25 13 * * Mon,Tue,Wed,Thu,Fri,Sat", () => {
//         composeMessage(guilds);
//     })
//     cron.schedule("0 1 17 * * Mon,Tue,Wed,Thu,Fri,Sat", () => {
//         composeMessage(guilds);
//     })
//
//
//     console.log("------------------------")
//     console.log("Start guild info")
//     console.log("------------------------")
//     console.log("No input")
//     console.log("------------------------")
//     console.log("End Guild info")
//     console.log("------------------------")
//
//     const date = new Date().toLocaleString("en-US", {
//         timeZone: "Europe/Brussels"
//     });
//     const localDate = new Date(date);
//     const localTime = localDate.getHours() + ":" + localDate.getMinutes();
//
//     console.log(localTime);
// });
//
// // Login to Discord with your client's token
// client.login(token);