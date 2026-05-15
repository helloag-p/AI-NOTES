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
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-900
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
        bg-slate-800
        p-8
        rounded-xl
        w-[400px]
        space-y-4
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-center
          "
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="
          w-full
          p-3
          rounded
          bg-slate-700
          outline-none
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="
          w-full
          p-3
          rounded
          bg-slate-700
          outline-none
          "
        />

        <button
          className="
          w-full
          bg-blue-600
          p-3
          rounded
          font-semibold
          "
        >
          Login
        </button>

        <p className="text-center">

          Don't have account?

          <Link
            to="/signup"
            className="text-blue-400 ml-2"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>
  );
}

export default LoginPage;