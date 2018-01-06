const express = require('express');
const async = require('async');
const request = require('request');
let router = express.Router();

// GET player stats page
router.get('/:id', (clientReq, clientRes) => {
    let playerID = clientReq.params.id;

    let APIOption = {
        url: 'https://pubg.op.gg/api/',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };

    function profileRequestOptions(category, playerID) {
        let option = APIOption;
        option.url += category + '/' + playerID;
        return option;
    }

    let profileOption = profileRequestOptions('users', playerID);
    console.log(profileOption);

    const APIRequests = [profileOption];

    function multipleGetRequest(options, callback) {
        request(options,
            function (err, res, body) {
                callback(err, body);
            }
        );
    }

    async.map(APIRequests, multipleGetRequest, function (err, res) {
        if (err) {
            return console.log(err);
        } else {
            console.log(res);

            let playerProfile = {
                id: res[0]._id,
                nickname: res[0].nickname,
                servers: res[0].servers,
                seasons: res[0].seasons,
            };

            clientRes.send({
                playerProfile: playerProfile,
            });
        }
    });
});

module.exports = router;