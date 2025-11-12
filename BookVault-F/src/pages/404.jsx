import { TbError404 } from "react-icons/tb";
import { FaRedditAlien } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Error = () => {
  return (
    <>
      <section className='flex flex-col items-center justify-center text-center min-h-[80vh]  text-gray-200 px-6'>
        <div className='relative'>
          <TbError404 className='text-8xl md:text-9xl text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse' />
          <FaRedditAlien className='absolute -top-6 -right-8 text-5xl text-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.5)] animate-bounce' />
        </div>

        <h1 className='text-3xl md:text-4xl font-extrabold mt-6 tracking-wide'>
          Oops! Page Not Found 👽
        </h1>
        <p className='text-slate-400 mt-3 max-w-md'>
          Looks like this page wandered off into another galaxy. Don’t worry,
          our alien friend is already searching for it!
        </p>

        <Link
          to='/'
          className='mt-8 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300'
        >
          🚀 Back to Home
        </Link>

        <div className='absolute bottom-10 opacity-20 blur-3xl bg-purple-500 w-40 h-40 rounded-full'></div>
      </section>
    </>
  );
};

export default Error;
