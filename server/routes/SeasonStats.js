const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET player's server's season stats (All the modes: TPP, FPP , and queue_sizes: 1,2,4)
router.get('/:id/ranked-stats', (clientReq, clientRes) => {
    let playerID = clientReq.params.id;
    let server = clientReq.query.server;
    let season = clientReq.query.season;

    console.log('PlayerID: ' + playerID + ' Server: ' + server + ' Season: ' + season);

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
                // console.log(server, ' ', season, ' ', mode, ' ', 'N/A');
            } else {
                // The player has played in this server in this season, parse this response
                // console.log(server, ' ', season, ' ', mode, ' ', 'Played');

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

module.exports = router;