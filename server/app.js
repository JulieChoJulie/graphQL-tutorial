const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

// allow cross origin request
app.use(cors());

const password = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://dbUser:${password}@cluster0-igs2x.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening on port 4000')
});
