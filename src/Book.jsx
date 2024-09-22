import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { dataIs } from "./Provider";
import { EditTitle } from "./EditTitle";
export function Book({ book }) {
  Book.propTypes = {
    book: PropTypes.object.isRequired,
  };
  let { deletebook } = useContext(dataIs);
  let editfun = () => {
    setShow(true);
  };
  let deletefun = (id) => {
    deletebook(id);
  };
  let hide = () => {
    setShow(false);
  };
  let [show, setShow] = useState(false);
  let content = <h1>{book.title}</h1>;
  if (show) {
    content = <EditTitle data={book} hide={hide} />;
  }
  return (
    <div id="bookdiv" className="border-3 border-black-600  bg-stone-300">
      <div id="icon">
        <CiEdit className="mr-1" onClick={editfun} />
        <MdDeleteOutline onClick={() => deletefun(book.id)} />
      </div>

      <img src={`https://picsum.photos/seed/${book.id}/200/300`} />
      {content}
    </div>
  );
}
