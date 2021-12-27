module.exports = {
    testServers: [
        {
            'name': 'My Testing Area',
            'guild_id': '',
            'channel_id': '923907289755312159',
            'role_id': '923906963866284112',
            'start': (new Date("2021-12-14")),
            'end': (new Date("2022-07-01").setUTCHours(23, 59, 59)),
            'holidays': [
                {
                    'start': (new Date("2022-02-28")),
                    'end': (new Date("2022-03-04").setUTCHours(23, 59, 59))
                },
                {
                    'start': (new Date("2022-05-09")),
                    'end': (new Date("2022-05-13").setUTCHours(23, 59, 59))
                }
            ]
        },
    ]
};