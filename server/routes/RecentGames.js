const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET player's server's recent games (only for one mode and queue_size)
router.get('/:id/matches/recent', (clientReq, clientRes) => {
    let playerID = clientReq.params.id;
    let server = clientReq.query.server;
    let season = clientReq.query.season;
    let mode = clientReq.query.mode;
    let queue_size = clientReq.query.queue_size;
    let after = clientReq.query.after;

    console.log('PlayerID: ' + playerID + ' Server: ' + server + ' Season: ' + season + ' Mode: ' + mode + ' QueueSize: ' + queue_size + ' After offset: ' + after);

    // Initial API request option
    const APIOption = {
        url: 'https://pubg.op.gg/api/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };

    // Recent Games function
    function recentGamesRequestOptions(playerID, server, season, mode, queue_size, after) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'users' + '/' + playerID + '/' + 'matches' + '/' + 'recent' + '?' +
            'server=' + server + '&' +
            'season=' + season + '&' +
            'mode=' + mode + '&' +
            'queue_size=' + queue_size + '&' +
            'after=' + after;

        console.log('Options URL: ' + option.url);

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

    // Recent Games request option
    let recentGamesOption = recentGamesRequestOptions(playerID, server, season, mode, queue_size, after);

    // Async HTTP - Recent Games request option
    let APIRecentGamesRequests = [recentGamesOption];

    // Async - Recent Games request
    async.map(APIRecentGamesRequests, multipleGetRequest, (err, res) => {
        if (err) return console.log(err);

        console.log('Response' + res[0], res);

        // Recent Games Object
        let recentGames = {
            params: res[0].params,
            matches: res[0].matches,
        };

        console.log(recentGames);

        // Return Recent Games object
        clientRes.send({
            recentGames: recentGames,
        });
    });
});

module.exports = router;