import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export let dataIs = createContext();
export function Provider({ children }) {
  Provider.propTypes = {
    children: PropTypes.element.isRequired,
  };

  let [books, setBook] = useState([]);
  let FetchBooks = async () => {
    let allbooks = await axios.get("http://localhost:3001/books");
    setBook(allbooks.data);
  };

  let searchTerm = async (term) => {
    let booksdata = await axios.post("http://localhost:3001/books", {
      title: term,
    });
    setBook([...books, booksdata.data]);
  };
  let deletebook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    books.filter((val) => val.id !== id);
  };
  let editbook = async (id, newTitle) => {
    await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });
  };

  let valuetoshare = {
    searchTerm,
    books,
    FetchBooks,
    deletebook,
    editbook,
  };
  return <dataIs.Provider value={valuetoshare}>{children}</dataIs.Provider>;
}
