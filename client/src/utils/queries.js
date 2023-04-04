import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query User($userId: ID!) {
    user(id: $userId) {
      email
      password
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
`

export const QUERY_SINGLEUSER = gql`
query User($userId: ID!) {
    user(id: $userId) {
      _id
      email
      password
      username
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }`


export const QUERY_ME = gql`
     {
    me {
      _id
      username
      email
      password
      savedBooks {
        _id
        title
        authors
        description
        image
        link
      }
    }
  }
  `

