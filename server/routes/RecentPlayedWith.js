const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET player's server's recent played with friends list
router.get('/:id/matches/summary-played-with', (clientReq, clientRes) => {
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

    // Friend List Object
    let friendList = [];

    // Friend List request function
    function friendListRequestOptions(playerID, server, season) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'users' + '/' + playerID + '/' + 'matches' + '/' + 'summary-played-with' + '?' +
            'server=' + server + '&' +
            'season=' + season;

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

    // Friend List request option
    let friendListOption = friendListRequestOptions(playerID, server, season);

    // Async HTTP - Friend List request option
    let APIFriendListRequests = [friendListOption];

    // Async - Friend List request
    async.map(APIFriendListRequests, multipleGetRequest, (err, res) => {
        if (err) return console.log(err);

        // Check for invalid input (playerID, server, season)
        if(res[0].users === undefined){
            // Check if the invalid input is for server and season or playerID
            if(res[0].message){
                // Return error message back to the React front-end
                clientRes.send({
                    friendList: 'Invalid server/season',
                });
            } else {
                // Return error message object back to the React front-end
                clientRes.send({
                    friendList: 'Invalid playerID',
                });
            }
            return;
        }

        // Friend List Object
        friendList = res[0].users;

        // Return Friend List object
        clientRes.send({
            friendList: friendList,
        });
    });
});

module.exports = router;