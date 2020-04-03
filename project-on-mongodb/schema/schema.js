const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Movies = require(`../models/movie`);
const Directors = require(`../models/director`);

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent) {
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return Movies.find({ directorId: parent._id });
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Movies.findById(args._id);
      },
    },
    director: {
      type: DirectorType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return Directors.findById(args._id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movies.findById({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Directors.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
