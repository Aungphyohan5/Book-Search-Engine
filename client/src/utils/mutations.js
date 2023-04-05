import { gql } from '@apollo/client';


export const CREATE_USER = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    username
    _id
    email
    bookCount
    savedBooks {
      bookId
      authors
      image
      link
      title
      description
    }
  }
}`

export const DELETE_BOOK = gql`
mutation Mutation($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    bookCount
    email
    username
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}`