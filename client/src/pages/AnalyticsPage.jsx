import {
  useEffect,
  useState
} from "react";

import API from "../api/axios";

function AnalyticsPage() {

  const [stats, setStats] =
    useState(null);


  const fetchStats = async () => {

    try {

      const res = await API.get(
        "/analytics/dashboard"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchStats();
  }, []);


  if (!stats) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-950 text-slate-200 p-6 md:p-12 relative overflow-hidden font-sans">
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-10">
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
              Total Notes
            </h2>
            <p className="text-4xl font-bold mt-3 text-white">
              {stats.totalNotes}
            </p>
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-indigo-300 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              ✨ AI Generated
            </h2>
            <p className="text-4xl font-bold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {stats.aiGeneratedNotes}
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
              Archived Notes
            </h2>
            <p className="text-4xl font-bold mt-3 text-white">
              {stats.archivedNotes}
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
              Weekly Activity
            </h2>
            <p className="text-4xl font-bold mt-3 text-white">
              {stats.weeklyActivity}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Recent Notes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.recentNotes.map((note) => (
              <div
                key={note._id}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 p-6 rounded-2xl transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors duration-300">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed line-clamp-2">
                  {note.summary || note.content.slice(0, 80)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Most Used Tags
          </h2>

          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.mostUsedTags).map(([tag, count]) => (
              <div
                key={tag}
                className="backdrop-blur-xl bg-indigo-500/10 border border-indigo-500/20 px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-indigo-500/20 transition-colors cursor-default"
              >
                <span className="text-cyan-400 font-medium tracking-wide">
                  #{tag}
                </span>
                <span className="bg-white/10 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;