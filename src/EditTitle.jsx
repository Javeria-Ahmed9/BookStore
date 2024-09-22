import { useContext, useState } from "react";
import { dataIs } from "./Provider";

export function EditTitle({ data, hide }) {
  let { editbook } = useContext(dataIs);
  let [newtit, setNewtit] = useState(data.title);

  let newtithandle = (event) => {
    setNewtit(event.target.value);
  };
  let handlesubmit = (event) => {
    event.preventDefault();
    setNewtit(newtit);
    editbook(data.id, newtit);
    hide();
  };
  let handletit = () => {
    setNewtit(newtit);
    editbook(data.id, newtit);
    hide();
  };

  return (
    <div id="editdiv">
      <h1 className="mb-0 text-zinc-300">Title</h1>
      <form onSubmit={handlesubmit}>
        <input
          value={newtit}
          onChange={newtithandle}
          id="editTit"
          placeholder="Enter new title.."
        />
      </form>
      <button id="savebtn" className="text-zinc-300" onClick={handletit}>
        save
      </button>
    </div>
  );
}
