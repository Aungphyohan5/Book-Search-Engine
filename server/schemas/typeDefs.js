const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    image: String
    link: String
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book!]!
}

type Query {
    book: [Book]!
}


type Auth {
    token: ID!
    user: User
  }

type Query {
    users: [User]!
    user(id: ID!): User
    me: User
}

type Mutation {
    createUser(username: String!, email:String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(
        bookId: ID!,
        authors: [String],
        description: String!,
        title: String,
        image: String, 
        link: String ): User
    deleteBook(userId: ID!, bookId: ID!): User
}

`;

module.exports = typeDefs;