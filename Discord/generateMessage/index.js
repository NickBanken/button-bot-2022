const buildMessage = role => {
    const pressDaButton = [
        "Time to press your favourite button   👉🔴",
        "Remember da button   👉🔴",
        "It's button time!   👉🔴",
        "Push it push it push it push it   👉🔴"
    ];

    const morningStart = [
        `Gooooooood morning <@&${role}> 😎`,
        `Top of the morning <@&${role}> ☀️`,
        `Rise and shine <@&${role}> 🤖`,
        `Wakey, wakey, eggs and bakey <@&${role}> 🍳`
    ];

    const morningEnd = [
        `Congrats on making it through the morning <@&${role}>!`,
        `Half way done <@&${role}>!`,
        `<@&${role}>, make some space for snacks!`,
        `Good job <@&${role}>!`
    ];

    const afternoonStart = [
        `Good afternoon <@&${role}> 🕶️`,
        `Pleasant afternoon we’re having, <@&${role}> ☺️`,
        `How u doin' <@&${role}> 🤓`,
        `Let's get started again <@&${role}> 🚀`
    ];

    const afternoonEnd = [
        `Well done today <@&${role}>!`,
        `You made it through <@&${role}>!`,
        `<@&${role}>, it's over, pat yourself!`,
        `Amazing job you did <@&${role}>!`
    ];

    const randomFrom = messages => {
        const index = Math.floor(Math.random() * Math.floor(messages.length));
        return messages[index];
    };

    const bruDateString = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Brussels"
    });
    const bruDate = new Date(bruDateString);
    const bruHours = bruDate.getHours();
    let message = "";

    if (bruHours < 12) {
        message = randomFrom(morningStart);
    } else if (bruHours < 13) {
        message = randomFrom(morningEnd);
    } else if (bruHours < 16) {
        message = randomFrom(afternoonStart);
    } else {
        message = randomFrom(afternoonEnd);
    }

    return message + " " + randomFrom(pressDaButton);
};

module.exports = {buildMessage};