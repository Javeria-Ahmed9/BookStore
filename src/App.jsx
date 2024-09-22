import "bootstrap/dist/css/bootstrap.min.css";
import { SearchBook } from "./SearchBook";
import { Allbook } from "./Allbook";
import { useContext } from "react";
import { dataIs } from "./Provider";

function App() {
  let { FetchBooks } = useContext(dataIs);

  FetchBooks();
  return (
    <>
      {" "}
      <SearchBook />
      <Allbook />
    </>
  );
}

export default App;
