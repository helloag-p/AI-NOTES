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
  <div className="w-full h-full bg-gray-950/80 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between relative z-20 font-sans">
      <div>
        <h1 className="text-3xl font-extrabold mb-1 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
    Memex AI
  </h1>
  <p className="text-xs text-slate-400/80 mb-10 font-medium tracking-wide uppercase">
    Turn chaos into clarity.
  </p>

        <div className="space-y-4">
          <button
            onClick={handleCreateNote}
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            New Note
          </button>
          
          <Link to="/analytics" className="block">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 p-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-medium">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Analytics
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <p className="text-sm font-medium text-slate-200 truncate">
            {user?.name || 'User'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 p-2.5 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
