const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET match details
router.get('/:id', (clientReq, clientRes)=> {
    let matchID = clientReq.params.id;

    console.log('MatchID: ' + matchID);

    // Initial API request option
    const APIOption = {
        url: 'https://pubg.op.gg/api/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };

    // Match request function
    function matchRequestOptions(matchID) {
        let option = {
            url: APIOption.url,
            method: APIOption.method,
            headers: APIOption.headers,
            json: APIOption.json,
        };

        option.url += 'matches' + '/' + matchID ;

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

    // Match request option
    let matchOption = matchRequestOptions(matchID);

    // Async HTTP - Match request option
    let APIMatchRequests = [matchOption];

    // Async - Match request
    async.map(APIMatchRequests, multipleGetRequest, (err, res) => {
        if (err) return console.log(err);

        // // Check for invalid input (playerID, server, season)
        // if(res[0].users === undefined){
        //     // Check if the invalid input is for server and season or playerID
        //     if(res[0].message){
        //         // Return error message back to the React front-end
        //         clientRes.send({
        //             friendList: 'Invalid server/season',
        //         });
        //     } else {
        //         // Return error message object back to the React front-end
        //         clientRes.send({
        //             friendList: 'Invalid playerID',
        //         });
        //     }
        //     return;
        // }

        // Match Object
        let match = {
            queue_size: res[0].queue_size,
            mode: res[0].mode,
            started_at: res[0].started_at,
            total_rank: res[0].total_rank,
            teams: res[0].teams,
        };

        // Return Match object
        clientRes.send({
            match: match,
        });
    });
});

module.exports = router;