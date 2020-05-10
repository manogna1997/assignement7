/**
 * init express here
 */
const cors = require('cors')
var express = require('express');
const path = require('path');
var app = express();
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema.js')
const dotenv = require('dotenv');
const mongooseClient = require('./database.js');


dotenv.config();
/**
 * mongodb+srv://manu:manu4@cluster0-5n8in.mongodb.net/test?retryWrites=true&w=majority
 * use all static files
 */
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('../'));
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

app.use("/dist", express.static("dist"));
app.use("/css", express.static("css"));
app.use("/static", express.static("static"));

/**
 * start serving at root /
 */
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});


const server = new ApolloServer({
   typeDefs,
   resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });
/**
 * start server at port 3000
 */
app.listen(process.env.API_SERVER_PORT);