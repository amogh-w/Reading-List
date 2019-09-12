import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOK } from "../queries/queries";

const BookDetails = ({ selectedBookId }) => {
  const values = { id: selectedBookId };

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: values
  });

  if (selectedBookId) {
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error...</Typography>;

    if (data) {
      return (
        <React.Fragment>
          <List>
            <ListItem>
              <Typography>Name: {data.book.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Genre: {data.book.genre}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Author: {data.book.author.name}</Typography>
            </ListItem>
            <ListItem style={{ padding: "0px 16px" }}>
              <List style={{ paddingBottom: "0px" }}>
                <Typography>Author Books:</Typography>
                {data.book.author.books.map(book => {
                  return (
                    <ListItem key={book.id}>
                      <Typography>{book.name}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </ListItem>
          </List>
        </React.Fragment>
      );
    }
  } else {
    return <Typography>Select a Book!</Typography>;
  }
};

export default BookDetails;
