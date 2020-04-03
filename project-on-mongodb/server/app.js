const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("../schema/schema");

const app = express();
const PORT = 3010;

// mongoose.connect(
//   'mongodb+srv://Svyatoslavtt:01291997svjat@graphql-test-ejevh.mongodb.net/test?retryWrites=true&w=majority',
//   {useNewUrlParser: true, useUnifiedTopology: true}
// )

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Svyatoslavtt:01291997svjat@graphql-test-ejevh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  client.close();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// const dbConnection = mongoose.connection
// dbConnection.on('error', err => console.log(`Connection error: ${err}`))
// dbConnection.once('open', () => console.log(`Connected to DB!`))

app.listen(PORT, (err) => {
  err ? console.log(error) : console.log("Server started...");
});
