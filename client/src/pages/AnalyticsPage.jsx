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
    <div
      className="
      min-h-screen
      bg-slate-900
      text-white
      p-10
      "
    >

      <h1
        className="
        text-4xl
        font-bold
        mb-10
        "
      >
        Analytics Dashboard
      </h1>


      <div
        className="
        grid
        grid-cols-2
        gap-6
        "
      >

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2>Total Notes</h2>
          <p className="text-4xl mt-3">
            {stats.totalNotes}
          </p>
        </div>


        <div className="bg-slate-800 p-6 rounded-xl">
          <h2>AI Generated</h2>
          <p className="text-4xl mt-3">
            {stats.aiGeneratedNotes}
          </p>
        </div>


        <div className="bg-slate-800 p-6 rounded-xl">
          <h2>Archived Notes</h2>
          <p className="text-4xl mt-3">
            {stats.archivedNotes}
          </p>
        </div>


        <div className="bg-slate-800 p-6 rounded-xl">
          <h2>Weekly Activity</h2>
          <p className="text-4xl mt-3">
            {stats.weeklyActivity}
          </p>
        </div>

      </div>
      <div className="mt-10">

  <h2
    className="
    text-3xl
    font-bold
    mb-5
    "
  >
    Recent Notes
  </h2>


  <div className="space-y-3">

    {
      stats.recentNotes.map(
        (note) => (

          <div
            key={note._id}

            className="
            bg-slate-800
            p-4
            rounded-xl
            "
          >

            <h3 className="font-semibold">
              {note.title}
            </h3>

            <p
              className="
              text-sm
              text-slate-400
              mt-2
              "
            >
              {
                note.summary
                  || note.content.slice(0, 80)
              }
            </p>

          </div>

        )
      )
    }

  </div>

</div>
<div className="mt-10">

  <h2
    className="
    text-3xl
    font-bold
    mb-5
    "
  >
    Most Used Tags
  </h2>


  <div
    className="
    flex
    flex-wrap
    gap-3
    "
  >

    {
      Object.entries(
        stats.mostUsedTags
      ).map(([tag, count]) => (

        <div
          key={tag}

          className="
          bg-slate-800
          px-4
          py-3
          rounded-xl
          "
        >

          #{tag} ({count})

        </div>

      ))
    }

  </div>

</div>

    </div>
  );
}

export default AnalyticsPage;