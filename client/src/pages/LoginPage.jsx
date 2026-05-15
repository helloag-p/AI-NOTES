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

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });
   const { setUser } = useAuth();

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
        "/auth/login",
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
toast.success("Login successful");
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
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-xl bg-white/5 p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">Log in to continue to AI Notes.</p>
        </div>

        <div className="space-y-4">
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
            <div className="flex justify-between items-center mb-1 ml-1 mr-1">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
            </div>
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
          Log In
        </button>

        <p className="text-center text-slate-400 text-sm">
          Don't have an account?
          <Link
            to="/signup"
            className="text-cyan-400 font-semibold ml-1.5 hover:text-cyan-300 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;