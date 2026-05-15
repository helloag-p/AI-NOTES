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
      <div
        className="
        flex-1
        flex
        items-center
        justify-center
        "
      >
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
    <div
      className="
      flex-1
      p-6
      overflow-y-auto
      "
    >
      {/* TOP BAR */}
      <div
        className="
        flex
        items-center
        justify-between
        mb-6
        "
      >
        <input
          type="text"
          value={selectedNote.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Note Title"
          className="
          text-4xl
          font-bold
          bg-transparent
          outline-none
          w-full
          "
        />

        <button
          onClick={generateAI}
          disabled={loadingAI}
          className="
          bg-purple-600
          hover:bg-purple-700
          px-5
          py-3
          rounded-xl
          font-semibold
          ml-4
          whitespace-nowrap
          "
        >
          {loadingAI ? "Generating AI..." : "Generate AI"}
        </button>
        {loadingAI && (
          <p
            className="
      text-sm
      text-purple-400
      mt-3
      "
          >
            Gemini is analyzing your note...
          </p>
        )}
        <button
          onClick={handleShare}
          className="
  bg-green-600
  hover:bg-green-700
  px-5
  py-3
  rounded-xl
  font-semibold
  ml-3
  whitespace-nowrap
  "
        >
          Share
        </button>
      </div>

      <p
        className="
  text-sm
  text-slate-400
  mb-4
  "
      >
        {saving ? "Saving..." : "Auto-saved"}
      </p>
      {selectedNote.isPublic && selectedNote.shareId && (
        <div
          className="
      bg-slate-800
      p-4
      rounded-xl
      mb-5
      "
        >
          <p className="mb-2 font-semibold">Public Share Link</p>

          <a
            href={`http://localhost:5173/shared/${selectedNote.shareId}`}
            target="_blank"
            className="
        text-blue-400
        break-all
        "
          >
            {`http://localhost:5173/shared/${selectedNote.shareId}`}
          </a>
        </div>
      )}
      <button
        onClick={handleDelete}
        className="
  bg-red-600
  hover:bg-red-700
  px-5
  mr-3
  py-3
  rounded-xl
  font-semibold
  ml-3
  whitespace-nowrap
  "
      >
        Delete
      </button>
      <button
        onClick={handleArchive}
        className="
  bg-yellow-600
  hover:bg-yellow-700
  px-5
  py-3
  rounded-xl
  font-semibold
  ml-3
  whitespace-nowrap
  "
      >
        Archive
      </button>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tagInput}
        onChange={(e) => {
          setTagInput(e.target.value);
        }}
        onBlur={() => {
          const tagsArray = tagInput
            .split(",")

            .map((tag) => tag.trim())

            .filter(Boolean);

          updateField("tags", tagsArray);
        }}
        className="
  w-full
  bg-slate-800
  my-4
  p-4
  rounded-xl
  outline-none
  mb-5
  "
      />
      {/* CONTENT */}
      <textarea
        value={selectedNote.content}
        onChange={(e) => updateField("content", e.target.value)}
        placeholder="Write your note..."
        className="
        w-full
        h-[500px]
        bg-slate-800
        rounded-xl
        p-5
        my-4
        outline-none
        resize-none
        text-lg
        mb-6
        "
      />

      {/* AI SUMMARY */}
      {selectedNote.summary && (
        <div
          className="
            bg-slate-800
            p-5
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

          <p className="text-slate-300">{selectedNote.summary}</p>
        </div>
      )}

      {/* ACTION ITEMS */}
      {selectedNote.actionItems?.length > 0 && (
        <div
          className="
            bg-slate-800
            p-5
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
            {selectedNote.actionItems.map((item, index) => (
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
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Editor;
