const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
require('dotenv').config();

const password = process.env.MONGO_PASSWORD;

const app = express();
mongoose.connect(`mongodb+srv://dbUser:${password}@cluster0-igs2x.mongodb.net/test?retryWrites=true&w=majority`);
mongoose.connection('open', () => {
   console.log('connected to db');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening on port 4000')
});
