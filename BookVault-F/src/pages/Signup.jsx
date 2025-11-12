import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/api/user/register", data);
      console.log("server response:", res.data);
      if (res.data.success) {
        toast.success("Account created successfully! 🎉");
        reset();
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message ||
          "Signup failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center min-h-screen text-gray-200 lg:mt-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-slate-900/60 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6'
        >
          <h2 className='text-3xl font-extrabold text-center text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400'>
            Create Your Account
          </h2>

          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Full Name
            </label>
            <input
              type='text'
              placeholder='John Doe'
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition-all'
            />
            {errors.name && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Username
            </label>
            <input
              type='text'
              placeholder='username123'
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "Username can only contain letters or numbers",
                },
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition-all'
            />
            {errors.username && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Email
            </label>
            <input
              type='email'
              placeholder='you@example.com'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 outline-none transition-all'
            />
            {errors.email && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.email.message}
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
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
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

          <div>
            <label className='block mb-1 text-slate-300 font-medium'>
              Confirm Password
            </label>
            <input
              type='password'
              placeholder='Re-enter your password'
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className='w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/40 outline-none transition-all'
            />
            {errors.confirmPassword && (
              <p className='text-pink-400 text-sm mt-1'>
                {errors.confirmPassword.message}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className='text-slate-400 text-sm text-center'>
            Already have an account?{" "}
            <a
              href='/login'
              className='text-cyan-400 hover:text-cyan-300 underline'
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
