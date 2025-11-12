import { motion } from "framer-motion";
import { GiBurningBook } from "react-icons/gi";
import { FaNodeJs, FaReact, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

const About = () => {
  return (
    <section className='min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 text-gray-200'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex items-center justify-center space-x-3 mb-8'
      >
        <GiBurningBook className='text-purple-500 text-5xl drop-shadow-lg' />
        <h1 className='text-5xl md:text-6xl font-extrabold'>
          About <span className='text-purple-400'>BookVault</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className='max-w-3xl text-slate-300 text-lg md:text-xl leading-relaxed mb-10'
      >
        BookVault is your personal digital library — built for readers,
        dreamers, and learners who want to keep their stories close and their
        shelves smarter. Whether you love collecting, exploring, or
        rediscovering books, BookVault makes it effortless, elegant, and fun
        📚💫
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='grid md:grid-cols-3 gap-8 max-w-6xl w-full'
      >
        <div className='bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-300'>
          <h3 className='text-purple-400 text-2xl font-semibold mb-3'>
            📖 Your Smart Library
          </h3>
          <p className='text-slate-400 text-sm leading-relaxed'>
            Organize all your books in one secure, searchable vault. From your
            favorite classics to the latest tech reads — everything stays
            accessible, anytime, anywhere.
          </p>
        </div>

        <div className='bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300'>
          <h3 className='text-cyan-400 text-2xl font-semibold mb-3'>
            🌍 Explore & Discover
          </h3>
          <p className='text-slate-400 text-sm leading-relaxed'>
            Find books you’ve never read, track what’s trending, and explore
            recommendations curated by community and categories. Discovery never
            felt this smooth.
          </p>
        </div>

        <div className='bg-slate-800/70 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 transition-all duration-300'>
          <h3 className='text-purple-400 text-2xl font-semibold mb-3'>
            ❤️ Wishlist & Progress
          </h3>
          <p className='text-slate-400 text-sm leading-relaxed'>
            Save what you love, track your reading progress, and set your next
            goal. BookVault keeps your reading life organized and motivating.
          </p>
        </div>
      </motion.div>

      <div className='w-24 h-1 mt-12 mb-8 bg-linear-to-r from-cyan-400 to-purple-500 rounded-full'></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className='max-w-4xl text-center space-y-4'
      >
        <h2 className='text-3xl font-bold text-purple-400'>🧩 Tech Stack</h2>
        <p className='text-slate-400 max-w-2xl mx-auto'>
          BookVault is powered by the MERN Stack — combining powerful backend
          logic with dynamic frontend performance for a seamless reading
          experience.
        </p>

        <div className='flex flex-wrap items-center justify-center gap-6 mt-6 text-4xl'>
          <FaReact className='text-cyan-400' title='ReactJS' />
          <SiExpress className='text-gray-300' title='ExpressJS' />
          <FaNodeJs className='text-green-500' title='NodeJS' />
          <SiMongodb className='text-green-400' title='MongoDB' />
          <FaDatabase className='text-purple-500' title='Mongoose ORM' />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className='mt-12 space-x-4'
      >
        <a
          href='/signup'
          className='px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all'
        >
          Get Started
        </a>
        <a
          href='/explore'
          className='px-6 py-3 bg-purple-500 hover:bg-purple-400 text-black font-semibold rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all'
        >
          Explore Library
        </a>
      </motion.div>
    </section>
  );
};

export default About;
