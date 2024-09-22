import { useContext } from "react";
import { dataIs } from "./Provider";
import { Book } from "./Book";

export function Allbook() {
  let { books } = useContext(dataIs);
  return (
    <div id="allbook">
      {books.map((val, ind) => (
        <Book key={ind} book={val} />
      ))}
    </div>
  );
}
