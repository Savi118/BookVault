import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiBurningBook } from "react-icons/gi";

const Home = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center px-6 text-gray-200'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex items-center justify-center space-x-3 mb-6'
      >
        <GiBurningBook className='text-purple-500 text-5xl drop-shadow-lg' />
        <h1 className='text-5xl md:text-6xl font-extrabold'>
          Book<span className='text-purple-400'>Vault</span>
        </h1>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='text-2xl md:text-3xl font-semibold text-slate-300 max-w-3xl'
      >
        Unlock a universe of books — store, explore, and cherish every story in
        one place. 📚✨
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className='text-slate-400 text-md md:text-lg mt-4 max-w-xl'
      >
        Your personal digital library — track your reads, build wishlists, and
        discover your next favorite book with{" "}
        <span className='text-purple-400 font-medium'>BookVault</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className='flex flex-wrap gap-4 justify-center mt-8'
      >
        <Link
          to='/login'
          className='px-6 py-3 bg-purple-500 hover:bg-purple-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all'
        >
          Login
        </Link>
        <Link
          to='/signup'
          className='px-6 py-3 bg-pink-600 hover:bg-pink-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all'
        >
          Sign Up
        </Link>
      </motion.div>
    </section>
  );
};

export default Home;
