import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
  cache,
  link
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant='h5'>My Reading List</Typography>
        <Divider style={{ margin: "20px 0px" }}></Divider>
        <BookList></BookList>
        <Divider style={{ margin: "20px 0px" }}></Divider>
        <AddBook />
      </Paper>
    </ApolloProvider>
  );
}
