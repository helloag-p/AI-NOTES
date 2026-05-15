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
   <div className="min-h-screen bg-gray-950 text-slate-200 p-6 md:p-12 relative overflow-hidden font-sans">
      
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        
        
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            {note.title}
          </h1>
        </header>

       
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl leading-relaxed whitespace-pre-wrap text-slate-300 text-lg">
          {note.content}
        </div>

       
        {note.summary && (
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 p-8 rounded-3xl shadow-xl mt-12">
        
            <div className="absolute top-0 left-8 transform -translate-y-1/2">
              <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-indigo-500/20">
                AI Generated
              </span>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              ✨ Summary
            </h2>
            <p className="text-indigo-100/90 leading-relaxed text-lg">
              {note.summary}
            </p>
          </div>
        )}

        {note.actionItems?.length > 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl mt-8">
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              ✅ Action Items
            </h2>
            
            <ul className="space-y-3">
              {note.actionItems.map((item, index) => (
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
    </div>
  );
}

export default SharedNotePage;