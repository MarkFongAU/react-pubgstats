/**
 * Server - app.js
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const Player = require('./routes/Player');
const SeasonStats = require('./routes/SeasonStats');
const RecentPlayedWith = require('./routes/RecentPlayedWith');
const RecentGames = require('./routes/RecentGames');
const Matches = require('./routes/Matches');

const app = express();

// Enable CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
// app.use(express.static(path.resolve(__dirname, '..', 'build')));

// API routing
app.use('/player', Player); // Direct to routes/Player.js
app.use('/seasonstats', SeasonStats); // Direct to routes/SeasonStats.js
app.use('/recentplayedwith', RecentPlayedWith); // Direct to routes/RecentPlayedWith.js
app.use('/recentgames', RecentGames); // Direct to routes/RecentGames.js
app.use('/matches', Matches); // Direct to routes/Matches.js

// Always return the main index.html, so react-router render the route in the client
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });

module.exports = app;