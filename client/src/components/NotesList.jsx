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
    <div className="w-full h-full bg-transparent p-4 md:p-6 flex flex-col overflow-hidden font-sans relative z-10">
      
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
          My Notes
        </h2>
        <span className="bg-white/10 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-full">
          {notes.length}
        </span>
      </div>

      <div className="space-y-4 mb-6 shrink-0">
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 outline-none text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:bg-white/10 transition-all text-sm"
          />
        </div>
        
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none text-slate-300 appearance-none focus:border-indigo-500/50 transition-all text-sm cursor-pointer"
          >
            <option value="latest" className="bg-slate-900 text-slate-200">Latest First</option>
            <option value="oldest" className="bg-slate-900 text-slate-200">Oldest First</option>
          </select>
          <svg className="w-4 h-4 absolute right-4 top-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3 pr-2 -mr-2">
        {notes.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-40 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
            <svg className="w-10 h-10 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <h2 className="text-sm font-semibold text-slate-300">No notes yet</h2>
            <p className="text-xs text-slate-500 mt-1">Create your first note to begin</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-slate-400">Loading notes...</span>
          </div>
        )}

        {notes.map((note) => {
          const isSelected = selectedNote?._id === note._id;
          return (
            <div
              key={note._id}
              onClick={() => setSelectedNote(note)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? "bg-gradient-to-br from-indigo-600/20 to-cyan-600/10 border-indigo-500/40 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
              }`}
            >
              <h3 className={`font-bold text-base mb-2 truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {note.title || "Untitled Note"}
              </h3>
              
              <p className={`text-sm line-clamp-2 leading-relaxed ${isSelected ? 'text-indigo-200/80' : 'text-slate-400'}`}>
                {note.summary ? note.summary.slice(0, 80) : note.content.slice(0, 80) || "Empty note..."}
              </p>
              
              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isSelected 
                        ? "bg-indigo-500/30 text-indigo-200 border border-indigo-500/20" 
                        : "bg-black/20 text-cyan-400/80 border border-white/5"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${isSelected ? "bg-indigo-500/30 text-indigo-200" : "bg-black/20 text-slate-400"}`}>
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotesList;