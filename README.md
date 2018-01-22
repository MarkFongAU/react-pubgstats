Pubgstats is a website that displays player's stats from Player's Unknown Battleground. The project is build with Express Node Backend + React Frontend + Material UI framework and the API originates from [PUBG op.gg](https://pubg.op.gg/).

To run the application, open 2 terminals, the first one run `npm install` and `node server` to start the NodeJS server.
 
On the second terminals, run `npm start` to start the react app.

Access the web application at `http://localhost:3000`.

Some Screenshots of the webpage (not complete, so the design is horrible):

Home Page

![alt text](./src/image/Screenshot-1.jpg)

About Page

![alt text](./src/image/Screenshot-2.jpg)

Stats Page

![alt text](./src/image/Screenshot-3.jpg)

Stats Page (Scroll down)

![alt text](./src/image/Screenshot-4.jpg)

Note: 

1. Express Node integrated successfully with the React app created from [Create React App](https://github.com/facebookincubator/create-react-app).

2. Currently there are only a few endpoints to retrieve data from [PUBG op.gg API](https://pubg.op.gg/api):

```
Returns player profile details 
- /users/<PUBG op.gg's data user ID>/       
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/ 

Returns player's stats for the particular server, season, mode, queue size
- /users/<PUBG op.gg's data user ID>/ranked-stats?server=<server name>&season=<season>&mode=<game mode>&queue_size=<queue size>       
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/ranked-stats?server=as&season=2018-01&mode=tpp&queue_size=4

Returns player's recent played friendlist
- /users/<PUBG op.gg's data user ID>/matches/summary-played-with?server=<server name>&season=<season> 
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/summary-played-with?server=as&season=2018-01
     
Returns player's recent games (20)
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name> 
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&after=<offset of games>  
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&mode=<game mode>&queue_size=<queue size>  
- /users/<PUBG op.gg's data user ID>/matches/recent?season=<season>&server=<server name>&mode=<game mode>&queue_size=<queue size>&after=<offset of games>
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&after=19
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&mode=tpp&queue_size=4
- Example: https://pubg.op.gg/api/users/59fe3604465dcc0001b82b45/matches/recent?season=2018-01&server=as&mode=tpp&queue_size=4&after=19

Returns match details 
- /users/<PUBG op.gg's data user ID>/       
- Example: https://pubg.op.gg/api/matches/2U4GBNA0Yml_fdeqrDDqxho56ZwCV4jz6tX-0lvOAlhz7qIPN280fRMwcwmCQ3F1
```

3. The search functionality of the website is not working, because I can't find the searching API. Enter `http://localhost:3000/player/59fe3604465dcc0001b82b45` in the browser to view the page.

4. Functionality 100% done. Web appearance will be improved.
