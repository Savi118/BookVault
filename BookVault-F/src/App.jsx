import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/404";

// Protected Pages
import Library from "./pages/protected/library";
import Wishlist from "./pages/protected/wishlist";
import Profile from "./pages/protected/profile";

// utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-linear-to-b from-[#0f0f1a] via-[#151527] to-[#1a1a2e] text-gray-200 flex flex-col justify-between transition-all duration-500'>
        <div className='grow'>
          <Routes>
            <Route path='/' element={user ? <Library /> : <Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {user && (
              <>
                <Route
                  path='/library'
                  element={
                    <ProtectedRoute>
                      <Library />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/wishlist'
                  element={
                    <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </>
            )}
            <Route path='*' element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
