import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

import { useNotes }
from "../context/NotesContext";

function NotesList() {

  const {
    notes,
    setNotes,
    selectedNote,
    setSelectedNote
  } = useNotes();
  const [search, setSearch] =
  useState("");
  const [sort, setSort] =
  useState("latest");
  const [loading, setLoading] =
  useState(false);

  // fetch notes
  const fetchNotes = async () => {

    try {
        setLoading(true);
      const res = await API.get(
  `/notes?search=${search}&sort=${sort}`
);
setLoading(false);
      setNotes(res.data);

      // auto select first note
      if (
        res.data.length > 0 &&
        !selectedNote
      ) {
        setSelectedNote(res.data[0]);
      }

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

  const timeout = setTimeout(() => {
    fetchNotes();
  }, 400);

  return () => clearTimeout(timeout);

}, [search, sort]);


  return (
    <div
      className="
      w-[350px]
      border-r
      border-slate-700
      p-5
      overflow-y-auto scrollbar-hide
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        mb-5
        "
      >
        Notes
      </h2>
      <input
  type="text"

  placeholder="Search notes..."

  value={search}

  onChange={(e) =>
    setSearch(e.target.value)
  }

  className="
  w-full
  p-3
  rounded-xl
  bg-slate-800
  outline-none
  mb-5
  "
/>
<select
  value={sort}

  onChange={(e) =>
    setSort(e.target.value)
  }

  className="
  w-full
  p-3
  rounded-xl
  bg-slate-800
  outline-none
  mb-5
  "
>

  <option value="latest">
    Latest First
  </option>

  <option value="oldest">
    Oldest First
  </option>

</select>
{
  notes.length === 0 && (

    <div
      className="
      text-center
      text-slate-500
      mt-20
      "
    >

      <h2 className="text-xl">
        No notes yet
      </h2>

      <p className="mt-2">
        Create your first note
      </p>

    </div>

  )
}
{
  loading && (

    <div
      className="
      text-center
      text-slate-400
      mt-10
      "
    >
      Loading notes...
    </div>

  )
}

      {
        notes.map((note) => (

          <div
            key={note._id}

            onClick={() =>
              setSelectedNote(note)
            }

            className={`
            p-4
            rounded-xl
            cursor-pointer
            mb-3
            transition

            ${
              selectedNote?._id === note._id
                ? "bg-blue-600"
                : "bg-slate-800"
            }
            `}
          >

            <h3 className="font-semibold">
              {note.title}
            </h3>

            <p
              className="
              text-sm
              text-slate-300
              mt-2
              "
            >
              {
  note.summary
    ? note.summary.slice(0, 50)
    : note.content.slice(0, 50)
}
...
              ...
            </p>
            <div
  className="
  flex
  flex-wrap
  gap-2
  mt-3
  "
>

  {
    note.tags?.map((tag, index) => (

      <span
        key={index}

        className="
        bg-slate-700
        px-2
        py-1
        rounded-lg
        text-xs
        "
      >
        #{tag}
      </span>

    ))
  }

</div>
            

          </div>

        ))
      }

    </div>
  );
}

export default NotesList;