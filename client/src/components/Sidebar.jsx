import { useAuth } from "../context/AuthContext";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

import { useNotes } from "../context/NotesContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const { notes, setNotes, setSelectedNote } = useNotes();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };
  const handleCreateNote = async () => {
    try {
      const res = await API.post("/notes", {
        title: "Untitled",
        content: "",
      });

      setNotes([res.data, ...notes]);

      setSelectedNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      w-[260px]
      bg-slate-800
      p-5
      border-r
      border-slate-700
      flex
      flex-col
      justify-between
      "
    >
      <div>
        <h1
          className="
          text-2xl
          font-bold
          mb-10
          "
        >
          Peblo AI
        </h1>

        <div className="space-y-2">
          <button
            onClick={handleCreateNote}
            className="
            w-full
            bg-blue-600
            p-3
            rounded-lg
            "
          >
            + New Note
          </button>
          <Link to="/analytics">
            <button
              className="
    w-full
    bg-slate-700
    p-3
    rounded-lg
    mt-3
    "
            >
              Analytics
            </button>
          </Link>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm text-slate-300">{user?.name}</p>

        <button
          onClick={handleLogout}
          className="
          w-full
          bg-red-600
          p-3
          rounded-lg
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
