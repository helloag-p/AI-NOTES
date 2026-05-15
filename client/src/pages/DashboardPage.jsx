import Sidebar from "../components/Sidebar";

import NotesList from "../components/NotesList";

import Editor from "../components/Editor";

function DashboardPage() {

  return (
    <div
  className="
  flex
  h-screen
  bg-slate-900
  text-white
  overflow-hidden
  "
>

      <Sidebar />

      <NotesList />

      <Editor />

    </div>
  );
}

export default DashboardPage;