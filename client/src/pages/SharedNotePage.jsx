import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import API from "../api/axios";

function SharedNotePage() {

  const { shareId } = useParams();

  const [note, setNote] =
    useState(null);


  const fetchSharedNote = async () => {

    try {

      const res = await API.get(
        `/notes/shared/${shareId}`
      );

      setNote(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchSharedNote();
  }, []);


  if (!note) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }


  return (
    <div
      className="
      min-h-screen
      bg-slate-900
      text-white
      p-10
      "
    >

      <div
        className="
        max-w-4xl
        mx-auto
        "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-6
          "
        >
          {note.title}
        </h1>


        <div
          className="
          bg-slate-800
          p-6
          rounded-xl
          whitespace-pre-wrap
          mb-6
          "
        >
          {note.content}
        </div>


        {
          note.summary && (

            <div
              className="
              bg-slate-800
              p-6
              rounded-xl
              mb-6
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-3
                "
              >
                AI Summary
              </h2>

              <p>{note.summary}</p>

            </div>

          )
        }


        {
          note.actionItems?.length > 0 && (

            <div
              className="
              bg-slate-800
              p-6
              rounded-xl
              "
            >

              <h2
                className="
                text-2xl
                font-bold
                mb-3
                "
              >
                Action Items
              </h2>

              <ul className="space-y-2">

                {
                  note.actionItems.map(
                    (item, index) => (

                      <li
                        key={index}

                        className="
                        bg-slate-700
                        p-3
                        rounded-lg
                        "
                      >
                        {item}
                      </li>

                    )
                  )
                }

              </ul>

            </div>

          )
        }

      </div>

    </div>
  );
}

export default SharedNotePage;