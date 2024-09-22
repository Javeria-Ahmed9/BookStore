import { useContext, useState } from "react";
import { dataIs } from "./Provider";
export function SearchBook() {
  let { searchTerm } = useContext(dataIs);
  let [name, setName] = useState("");
  let handleinput = (event) => {
    setName(event.target.value);
  };
  let handlesubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      searchTerm(name);
      setName("");
    }
  };

  let handleclick = () => {
    if (name.trim() !== "") {
      searchTerm(name);
      setName("");
    }
  };
  return (
    <div className="container text-center  ">
      <h2>Add a book</h2>
      <div className="container">
        <form className="mt-8" onSubmit={handlesubmit}>
          <input
            value={name}
            onChange={handleinput}
            className="shadow-xl border border-success p-2 mb-0.5"
            type="text"
            placeholder="Enter name of book"
          />
        </form>
      </div>
      <button onClick={handleclick} type="button" className="btn btn-info">
        Create
      </button>
    </div>
  );
}
