import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  CardContent
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { GET_BOOKS } from "../queries/queries";

import BookDetails from "./BookDetails";

export default function BookList() {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error...</Typography>;

  //console.log(data);

  return (
    <div>
      <List>
        {data.books.map(book => {
          return (
            <ListItem key={book.id}>
              <Typography onClick={() => setSelectedBookId(book.id)}>
                {book.name}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      <Divider style={{ margin: "20px 0px" }}></Divider>
      <Card>
        <CardContent>
          <Typography variant="h6" style={{ padding: "8px 0px"}}>Book Details</Typography>
          <BookDetails selectedBookId={selectedBookId}></BookDetails>
        </CardContent>
      </Card>
    </div>
  );
}
