const express = require('express');
const path = require('path');
const http = require('http');
// const bodyParser = require('body-parser');

import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { SubscriptionManager } from 'graphql-subscriptions';
import Schema from './server/graphql/schema/schema';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';


//API routes
const api = require('./server/routes/api');

const app = express();

// // Enable cors support for cross origin api requests (ONLY FOR DEV)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


//Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setting static path to client's dist folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));


//Setting API routes
// app.options('*', cors()); // include before other routes
app.use('/api', api);
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: Schema }));
export const pubsub = new PubSub();

const subscriptionManager = new SubscriptionManager({
  schema: Schema,
  pubsub: pubsub,
  setupFunctions: {
    hi_s:(options, args) => ({
      newHiMessageChannel: {
        filter: comment => console.log("Server responding to the setupfunction")
      }
    })
  },
});

//Catch all other routes and return index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Get port from environment and store in Express.
const port = process.env.PORT || '3000';
app.set('port', port);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create HTTP server
const server = http.createServer(app);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Listen on port, on all network interfaces.
server.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
  new SubscriptionServer({
      subscriptionManager: subscriptionManager,
    }, {
      server: server,
      path: '/subscriptions',
    });
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
