import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiBurningBook } from "react-icons/gi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Toaster } from "react-hot-toast";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkClass =
    "text-gray-300 hover:text-purple-400 font-medium transition-colors duration-300";
  const activeLink =
    "text-purple-400 font-semibold border-b-2 border-purple-500 pb-1 ";

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <header className='bg-linear-to-b from-[#0f0f1a] via-[#151527] to-[#1a1a2e] shadow-md sticky top-0 z-50'>
        <div className='max-w--7xl mx-auto flex justify-between items-center px-4 py-6'>
          <Link to='/' className='flex items-center space-x-2'>
            <GiBurningBook className='text-purple-500 text-3xl' />
            <h1 className='text-gray-200 font-extrabold text-3xl tracking-wide hover:text-purple-400 transition-all'>
              Book
              <span className='text-purple-500'>Vault</span>
            </h1>
          </Link>
          <nav className='hidden md:flex items-center space-x-8 '>
            {user === null ? (
              <>
                <NavLink
                  to='/home'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to='/explore'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Explore
                </NavLink>
                <NavLink
                  to='/about'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  About
                </NavLink>
                <Link
                  to='/login'
                  className='px-5 py-2 bg-purple-600 hover:bg-purple-500  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='px-5 py-2 bg-pink-500 hover:bg-pink-400  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  <button>SignUp</button>
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to='/library'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Library
                </NavLink>
                <NavLink
                  to='/explore'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Explore
                </NavLink>
                <NavLink
                  to='/wishlist'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Wishlist
                </NavLink>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `${navLinkClass} ${isActive ? activeLink : ""}`
                  }
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className='px-5 py-2 bg-red-600 hover:bg-red-500  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='md:hidden text-gray-300 hover:text-purple-400 text-2xl transition-all'
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <nav className='md:hidden bg-[#151527] border-t border-r-purple-700 flex flex-col items-center space-Y-4 py-4'>
            {user === null ? (
              <>
                <Link
                  to='/home'
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  Home
                </Link>
                <Link
                  to='/explore'
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  to='/about'
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to='/login'
                  onClick={() => setMenuOpen(false)}
                  className='px-5 py-2 bg-purple-600 hover:bg-purple-500  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  Login
                </Link>
                <Link
                  to='/signup'
                  onClick={() => setMenuOpen(false)}
                  className='px-5 py-2 bg-pink-500 hover:bg-pink-400  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  <button>SignUp</button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to='/library'
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  Library
                </Link>
                <Link
                  to='/explore'
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  Explore
                </Link>
                <Link
                  to='/wishlist'
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  Wishlist
                </Link>
                <Link
                  to='/profile'
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className='px-5 py-2 bg-red-600 hover:bg-red-500  text-white rounded-lg shadow-md font-semibold transition-all'
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
