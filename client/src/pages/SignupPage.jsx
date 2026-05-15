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
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
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
          Signup
        </button>

        <p className="text-center">

          Already have account?

          <Link
            to="/login"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default SignupPage;