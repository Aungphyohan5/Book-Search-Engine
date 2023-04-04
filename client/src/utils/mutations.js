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
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const SAVE_BOOK = gql`
 mutation SaveBook($bookId: ID!, $description: String!, $authors: [String], $title: String, $image: String, $link: String) {
    saveBook(bookId: $bookId, description: $description, authors: $authors, title: $title, image: $image, link: $link) {
      _id
      email
      password
      username
      savedBooks {
        _id
        authors
        description
        image
        link
        title
      }
    }
  }`

export const DELETE_BOOK = gql`
 


mutation DeleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
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