import { gql } from "apollo-boost";

const GET_BOOKS = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const GET_BOOK = gql`
  query getBook($id: ID) {
    book(id: $id) {
      name
      genre
      author {
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

const ADD_BOOK_MUTATION = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

export { GET_BOOKS, GET_BOOK, GET_AUTHORS, ADD_BOOK_MUTATION };
