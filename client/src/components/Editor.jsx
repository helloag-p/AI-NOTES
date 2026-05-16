import { useState, useEffect } from "react";

import API from "../api/axios";
import toast from "react-hot-toast";
import { useNotes } from "../context/NotesContext";

function Editor() {
  const { selectedNote, setSelectedNote, notes, setNotes } = useNotes();

  const [saving, setSaving] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [tagInput, setTagInput] = useState("");
  useEffect(() => {
    if (selectedNote) {
      setTagInput(selectedNote.tags?.join(", ") || "");
    }
  }, [selectedNote]);

  if (!selectedNote) {
    return (
      <div className="w-full h-full p-4 md:p-8 overflow-y-auto font-sans relative bg-transparent backdrop-blur-sm">
        <h1 className="text-2xl text-slate-500">Select a note</h1>
      </div>
    );
  }

  // update note fields
  const updateField = async (field, value) => {
    const updatedNote = {
      ...selectedNote,
      [field]: value,
    };

    setSelectedNote(updatedNote);

    const updatedNotes = notes.map((note) =>
      note._id === selectedNote._id ? updatedNote : note,
    );

    setNotes(updatedNotes);

    try {
      setSaving(true);
      await API.patch(`/notes/${selectedNote._id}`, {
        [field]: value,
      });
      setSaving(false);
    } catch (error) {
      console.log(error);
    }
  };

  // AI generation
  const generateAI = async () => {
    try {
      setLoadingAI(true);

      const res = await API.post(`/ai/${selectedNote._id}/generate`);

      const updatedNote = {
        ...selectedNote,
        summary: res.data.summary,
        actionItems: res.data.actionItems,
        title:
          selectedNote.title === "Untitled"
            ? res.data.suggestedTitle
            : selectedNote.title,
      };

      setSelectedNote(updatedNote);

      const updatedNotes = notes.map((note) =>
        note._id === selectedNote._id ? updatedNote : note,
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);

      alert("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };
  const handleShare = async () => {
    try {
      const res = await API.post(`/notes/${selectedNote._id}/share`);

      const shareId = res.data.shareLink.split("/").pop();

      const updatedNote = {
        ...selectedNote,
        shareId,
        isPublic: true,
      };

      setSelectedNote(updatedNote);

      const updatedNotes = notes.map((note) =>
        note._id === selectedNote._id ? updatedNote : note,
      );

      setNotes(updatedNotes);

      navigator.clipboard.writeText(res.data.shareLink);

      toast.success("Share link copied");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await API.delete(`/notes/${selectedNote._id}`);

      const filteredNotes = notes.filter(
        (note) => note._id !== selectedNote._id,
      );

      setNotes(filteredNotes);

      setSelectedNote(filteredNotes[0] || null);

      toast.success("Note deleted");
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };
  const handleArchive = async () => {
    try {
      await API.post(`/notes/${selectedNote._id}/archive`);

      const filteredNotes = notes.filter(
        (note) => note._id !== selectedNote._id,
      );

      setNotes(filteredNotes);

      setSelectedNote(filteredNotes[0] || null);

      toast.success("Note archived");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto font-sans relative bg-gray-950/30 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          value={selectedNote.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Note Title"
          className="text-3xl md:text-4xl font-extrabold bg-transparent outline-none w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-white placeholder-slate-600 transition-all focus:from-indigo-400 focus:to-cyan-400"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={generateAI}
            disabled={loadingAI}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap flex items-center gap-2"
          >
            {loadingAI ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating AI...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Generate AI
              </>
            )}
          </button>
          
          <button
            onClick={handleShare}
            className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 px-5 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap"
          >
            Share
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${saving ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
          <p className="text-sm font-medium text-slate-400">
            {saving ? "Saving changes..." : "Auto-saved"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleArchive}
            className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm"
          >
            Archive
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {loadingAI && (
        <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl mb-6 flex items-center gap-3">
          <div className="w-5 h-5 border-t-2 border-r-2 border-purple-400 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-purple-300">
            Gemini is analyzing your note and generating insights...
          </p>
        </div>
      )}

      {selectedNote.isPublic && selectedNote.shareId && (
        <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 flex items-center justify-between group">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Public Share Link</p>
            <a
              href={`https://ai-notes-2te8.vercel.app/shared/${selectedNote.shareId}`}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors break-all"
            >
              {`https://ai-notes-2te8.vercel.app/shared/${selectedNote.shareId}`}
            </a>
          </div>
          <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </div>
      )}

      <input
        type="text"
        placeholder="Add tags... (comma separated)"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onBlur={() => {
          const tagsArray = tagInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
          updateField("tags", tagsArray);
        }}
        className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none mb-6 text-slate-200 placeholder-slate-500 focus:border-indigo-500/50 focus:bg-white/10 transition-all"
      />

      <textarea
        value={selectedNote.content}
        onChange={(e) => updateField("content", e.target.value)}
        placeholder="Start typing your note here..."
        className="w-full min-h-[400px] bg-white/5 border border-white/10 rounded-2xl p-6 outline-none resize-y text-lg text-slate-200 leading-relaxed placeholder-slate-600 focus:border-indigo-500/30 transition-all mb-8 shadow-inner"
      />

      {selectedNote.summary && (
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 p-8 rounded-3xl shadow-xl mb-8">
          <div className="absolute top-0 left-8 transform -translate-y-1/2">
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/20">
              AI Summary
            </span>
          </div>
          <p className="text-indigo-100/90 leading-relaxed text-lg mt-2">
            {selectedNote.summary}
          </p>
        </div>
      )}

      {selectedNote.actionItems?.length > 0 && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl mb-8">
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            Action Items
          </h2>
          <ul className="space-y-3">
            {selectedNote.actionItems.map((item, index) => (
              <li
                key={index}
                className="group flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 p-4 rounded-xl transition-all duration-200"
              >
                <div className="mt-1 w-5 h-5 rounded-md border-2 border-cyan-500/50 flex-shrink-0 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all duration-200"></div>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Editor;
