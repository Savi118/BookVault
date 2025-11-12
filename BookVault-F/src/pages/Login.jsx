import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/login", data);

      if (res.data.success) {
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
        toast.success(`Welcome back, ${res.data.user.name}!`);
        reset();
        setTimeout(() => navigate("/library"), 1200);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center min-h-screen  text-gray-200'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-slate-900/60 backdrop-blur-md border border-s-lime-800 p-8  rounded-2xl shadow-xl w-full max-w-md space-y-6 '
        >
          <h2 className='text-3xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400'>
            Welcome to BookVault
          </h2>
          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Username or Email
            </label>
            <input
              type='text'
              placeholder='username or you@example.com'
              {...register("identifier", {
                required: "Username or email is required",
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition-all'
            />
            {errors.identifier && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters",
                },
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40 outline-none transition-all'
            />
            {errors.password && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-3 font-semibold text-black rounded-lg shadow-lg bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 hover:shadow-purple-500/30 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className='text-slate-400 text-sm text-center'>
            Don’t have an account?{" "}
            <a
              href='/signup'
              className='text-cyan-400 hover:text-cyan-300 underline'
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
