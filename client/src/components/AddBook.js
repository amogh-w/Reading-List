import React, { useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries/queries";

export default function AddBook() {
  const [values, setValues] = useState({ name: "", genre: "", authorId: "" });
  const [addBook] = useMutation(ADD_BOOK_MUTATION, {
    refetchQueries: [{ query: GET_BOOKS }]
  });

  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error...</Typography>;

  //console.log(data);

  const handleAdd = () => {
    try {
      //console.log(values);
      addBook({ variables: values });
    } catch (error) {
      alert(error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Add Book</Typography>
      <TextField
        name="name"
        value={values.name}
        onChange={handleInputChange}
        label="Name"
        margin="normal"
      />
      <TextField
        name="genre"
        value={values.genre}
        onChange={handleInputChange}
        label="Genre"
        margin="normal"
      />
      <br></br>
      <FormControl margin="normal" fullWidth>
        <InputLabel>Author</InputLabel>
        <Select
          name="authorId"
          value={values.authorId}
          onChange={handleInputChange}
        >
          {data.authors.map(author => {
            return (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        color="primary"
        variant="contained"
        onClick={handleAdd}
        style={{ marginTop: "16px", marginBottom: "8px" }}
      >
        +
      </Button>
    </React.Fragment>
  );
}
