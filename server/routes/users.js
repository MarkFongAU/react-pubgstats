const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET player's lifetime stats and server stats
router.get('/:id', (clientReq, clientRes) => {
    let playerID = clientReq.params.id;

    // Initial API request option
    const APIOption = {
        url: 'https://pubg.op.gg/api/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };

    // Player Object
    let player = {
        profile: [],
        lifetime_stats: {
            matches_played: 0,
            matches_won: 0,
            matches_top10: 0,
            kill_total: 0,
            death_total: 0,
            assist_total: 0,
            kd: 0,
            kda: 0,
            win_rate: 0,
        },
        server_stats: [],
    };

    // Player profile request function
    function profileRequestOptions(playerID) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'users' + '/' + playerID;
        return option;
    }

    // Server + Season stats request function
    function serverSeasonStatsRequestOptions(playerID, server, season, mode, queue_size) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'users' + '/' + playerID + '/' + 'ranked-stats' + '?' +
            'server=' + server + '&' +
            'season=' + season + '&' +
            'mode=' + mode + '&' +
            'queue_size=' + queue_size;
        return option;
    }

    // Async HTTP - Multiple Get
    function multipleGetRequest(options, callback) {
        request(options,
            (err, res, body) => {
                callback(err, body);
            }
        );
    }

    // Check for all completed async API calls before returning Player object to React App
    function checkAllAsync(expected_async_counts, completed_async_counts) {
        // If Completed async counts === Expected async counts
        if (completed_async_counts >= expected_async_counts) {
            // Calculate lifetime KD and KDA
            player.lifetime_stats.kd = player.lifetime_stats.kill_total / player.lifetime_stats.death_total;
            player.lifetime_stats.kda = (player.lifetime_stats.kill_total + player.lifetime_stats.assist_total) / player.lifetime_stats.death_total;

            // Calculate lifetime Win Rate
            player.lifetime_stats.win_rate = player.lifetime_stats.matches_won / player.lifetime_stats.matches_played;

            // Display the player object
            console.log(player);

            // Return the player object back to the React front-end
            clientRes.send({
                player: player,
            });
        }
    }

    // Player profile request option
    let profileOption = profileRequestOptions(playerID);

    // Async HTTP - Player profile request option
    let APIProfileRequests = [profileOption];

    // Async HTTP - Server + Season stats call count
    let expected_async_counts = 0;
    let completed_async_counts = 0;

    // Async - GET Server + Season stats function
    async function getServerSeasonStats(server, season) {
        // Server + Season Stats Object
        let serverSeasonStats = {
            tpp1: [],
            tpp2: [],
            tpp4: [],
            fpp1: [],
            fpp2: [],
            fpp4: [],
        };

        // Server + Season stats request option for all game modes
        let tpp1 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 1);
        let tpp2 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 2);
        let tpp4 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 4);
        let fpp1 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 1);
        let fpp2 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 2);
        let fpp4 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 4);

        // Async HTTP - Server + Season stats request request option for all game modes
        let APIStatsRequests = [tpp1, tpp2, tpp4, fpp1, fpp2, fpp4];

        // Async HTTP - Server + Season stats request
        async.map(APIStatsRequests, multipleGetRequest, (err, res) => {
            if (err) return console.log(err);

            // Loop through the response json
            for (let i = 0; i < res.length; i++) {
                // Determine game mode
                let mode = '';
                if (i === 0) {
                    mode = 'tpp1';
                } else if (i === 1) {
                    mode = 'tpp2';
                } else if (i === 2) {
                    mode = 'tpp4';
                } else if (i === 3) {
                    mode = 'fpp1';
                } else if (i === 4) {
                    mode = 'fpp2';
                } else if (i === 5) {
                    mode = 'fpp4';
                }

                // Check if player has ever played in the server in this season
                if (res[i].hasOwnProperty('message')) {
                    // The player has not played in this server in this season, skip parsing on this response
                    console.log(server, ' ', season, ' ', mode, ' ', 'N/A');
                } else {
                    // The player has played in this server in this season, parse this response
                    console.log(server, ' ', season, ' ', mode, ' ', 'Played');

                    // Pass JSON data into Server + Season stats object
                    if (i === 0) {
                        // mode = 'tpp1';
                        serverSeasonStats.tpp1 = res[i].stats;
                    } else if (i === 1) {
                        // mode = 'tpp2';
                        serverSeasonStats.tpp2 = res[i].stats;
                    } else if (i === 2) {
                        // mode = 'tpp4';
                        serverSeasonStats.tpp4 = res[i].stats;
                    } else if (i === 3) {
                        // mode = 'fpp1';
                        serverSeasonStats.fpp1 = res[i].stats;
                    } else if (i === 4) {
                        // mode = 'fpp2';
                        serverSeasonStats.fpp2 = res[i].stats;
                    } else if (i === 5) {
                        // mode = 'fpp4';
                        serverSeasonStats.fpp4 = res[i].stats;
                    }

                    // Increment player's lifetime stats on played servers in this season
                    player.lifetime_stats.matches_played += res[i].stats.matches_cnt;
                    player.lifetime_stats.matches_won += res[i].stats.win_matches_cnt;
                    player.lifetime_stats.matches_top10 += res[i].stats.topten_matches_cnt;
                    player.lifetime_stats.kill_total += res[i].stats.kills_sum;
                    player.lifetime_stats.death_total += res[i].stats.deaths_sum;
                    player.lifetime_stats.assist_total += res[i].stats.assists_sum;
                }
            }

            // Add the server and season stats object into the player object
            player.server_stats = {
                ...player.server_stats,
                [server]: {
                    ...player.server_stats[server],
                    [season]: serverSeasonStats,
                }
            };

            // Increment the Async HTTP call counts and check against the expected counts
            completed_async_counts++;
            checkAllAsync(expected_async_counts, completed_async_counts);
        });
    }

    // Async HTTP - Player profile request
    async.map(APIProfileRequests, multipleGetRequest, (err, res) => {
        if (err) return console.log(err);

        // Profile Object
        let profile = {
            id: res[0]._id,
            nickname: res[0].nickname,
            servers: res[0].servers,
            seasons: res[0].seasons,
        };

        // Add profile object to Player object
        player.profile = profile;

        // Count number of Async calls required to get all the lifetime stats of the player
        expected_async_counts = (profile.servers.length) * (profile.seasons.length);
        console.log('Expected async counts:' + expected_async_counts);

        // Async - GET All Server + Season stats
        async function APIAsync() {
            await Promise.all(profile.servers.map(async (server) => {
                console.log(server.server);
                await Promise.all(profile.seasons.map(async (season) => {
                    console.log(season.season);
                    await getServerSeasonStats(server.server, season.season);
                }));
            }));
        }

        // Call Async - Perform GET All Server + Season stats
        APIAsync().then(() => {
        });
    });
});

// GET player's server and season stats
router.get('/:id/ranked-stats', (clientReq, clientRes) => {
    let playerID = clientReq.params.id;
    let server = clientReq.query.server;
    let season = clientReq.query.season;

    // Initial API request option
    const APIOption = {
        url: 'https://pubg.op.gg/api/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };

    // Server + Season Stats Object
    let serverSeasonStats = {
        tpp1: [],
        tpp2: [],
        tpp4: [],
        fpp1: [],
        fpp2: [],
        fpp4: [],
    };

    // Server + Season stats request function
    function serverSeasonStatsRequestOptions(playerID, server, season, mode, queue_size) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'users' + '/' + playerID + '/' + 'ranked-stats' + '?' +
            'server=' + server + '&' +
            'season=' + season + '&' +
            'mode=' + mode + '&' +
            'queue_size=' + queue_size;
        return option;
    }

    // Server + Season stats request option for all game modes
    let tpp1 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 1);
    let tpp2 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 2);
    let tpp4 = serverSeasonStatsRequestOptions(playerID, server, season, 'tpp', 4);
    let fpp1 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 1);
    let fpp2 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 2);
    let fpp4 = serverSeasonStatsRequestOptions(playerID, server, season, 'fpp', 4);

    // Async - Server + Season stats request request option for all game modes
    let APIStatsRequests = [tpp1, tpp2, tpp4, fpp1, fpp2, fpp4];

    // Async - Multiple Get
    function multipleGetRequest(options, callback) {
        request(options,
            (err, res, body) => {
                callback(err, body);
            }
        );
    }

    // Async - Server + Season stats request
    async.map(APIStatsRequests, multipleGetRequest, (err, res) => {
        if (err) return console.log(err);

        // Loop through the response json
        for (let i = 0; i < res.length; i++) {
            // Determine game mode
            let mode = '';
            if (i === 0) {
                mode = 'tpp1';
            } else if (i === 1) {
                mode = 'tpp2';
            } else if (i === 2) {
                mode = 'tpp4';
            } else if (i === 3) {
                mode = 'fpp1';
            } else if (i === 4) {
                mode = 'fpp2';
            } else if (i === 5) {
                mode = 'fpp4';
            }

            // Check if player has ever played in the server in this season
            if (res[i].hasOwnProperty('message')) {
                // The player has not played in this server in this season, skip parsing on this response
                console.log(server, ' ', season, ' ', mode, ' ', 'N/A');
            } else {
                // The player has played in this server in this season, parse this response
                console.log(server, ' ', season, ' ', mode, ' ', 'Played');

                // Pass JSON data into Server + Season stats object
                if (i === 0) {
                    // mode = 'tpp1';
                    serverSeasonStats.tpp1 = res[i].stats;
                } else if (i === 1) {
                    // mode = 'tpp2';
                    serverSeasonStats.tpp2 = res[i].stats;
                } else if (i === 2) {
                    // mode = 'tpp4';
                    serverSeasonStats.tpp4 = res[i].stats;
                } else if (i === 3) {
                    // mode = 'fpp1';
                    serverSeasonStats.fpp1 = res[i].stats;
                } else if (i === 4) {
                    // mode = 'fpp2';
                    serverSeasonStats.fpp2 = res[i].stats;
                } else if (i === 5) {
                    // mode = 'fpp4';
                    serverSeasonStats.fpp4 = res[i].stats;
                }
            }
        }

        clientRes.send({
            serverSeasonStats: serverSeasonStats,
        });
    });
});

// let serverStats = {
//     rating: res[0].rating,
//     matches_cnt: res[0].matches_cnt,
//     win_matches_cnt: res[0].win_matches_cnt,
//     topten_matches_cnt: res[0].topten_matches_cnt,
//     kills_sum: res[0].kills_sum,
//     kills_max: res[0].kills_max,
//     assists_sum: res[0].assists_sum,
//     headshot_kills_sum: res[0].headshot_kills_sum,
//     deaths_sum: res[0].deaths_sum,
//     longest_kill_max: res[0].longest_kill_max,
//     rank_avg: res[0].rank_avg,
//     damage_dealt_avg: res[0].damage_dealt_avg,
//     time_survived_avg: res[0].time_survived_avg,
// }

module.exports = router;