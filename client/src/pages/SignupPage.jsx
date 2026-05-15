import {
  useState
} from "react";
import toast from "react-hot-toast";
import {
  useNavigate,
  Link
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function SignupPage() {

  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: ""
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/signup",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
      setUser(res.data.user);
      toast.success("Signup successful");
      navigate("/");

    } catch (error) {

      toast.error(
  error.response.data.message
);

    }
  };


  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden font-sans">
      
      {/* Decorative AI-themed background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-xl bg-white/5 p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            AI Notes
          </h1>
          <p className="text-slate-400 text-sm">Create an account to amplify your thoughts.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Get Started
        </button>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?
          <Link
            to="/login"
            className="text-cyan-400 font-semibold ml-1.5 hover:text-cyan-300 transition-colors"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;