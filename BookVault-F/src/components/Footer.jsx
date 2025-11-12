const Footer = () => {
  return (
    <footer className='bg-linear-to-b from-[#0f0f1a] via-[#151527] to-[#1a1a2e] border-t border-purple-700/30 text-center py-8 mt-16 relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-60'></div>

      <div className='absolute inset-0 blur-3xl opacity-10 bg-linear-to-r from-purple-600 via-pink-500 to-cyan-400'></div>

      <div className='relative z-10'>
        <h2 className='text-gray-300 font-semibold text-lg mb-2 tracking-wide'>
          © {new Date().getFullYear()} — Developed with ❤️ by{" "}
          <span className='text-purple-400 font-bold hover:text-pink-400 transition-all duration-300'>
            Saksham Viraj
          </span>
        </h2>

        <p className='text-sm text-slate-400 tracking-wide'>
          Powered by{" "}
          <span className='text-cyan-400 font-semibold'>MongoDB</span>,{" "}
          <span className='text-purple-400 font-semibold'>Express</span>,{" "}
          <span className='text-pink-400 font-semibold'>React</span>, and{" "}
          <span className='text-emerald-400 font-semibold'>Node.js</span> 🚀
        </p>

        <p className='text-xs text-slate-500 mt-2 italic'>
          Building experiences that connect creativity and code ✨
        </p>
      </div>
    </footer>
  );
};

export default Footer;
