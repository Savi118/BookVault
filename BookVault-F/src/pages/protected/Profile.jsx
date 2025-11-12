import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail, MdOutlineLogout } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { logout } from "../../redux/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-gray-300'>
        <h2 className='text-2xl font-bold mb-4'>You are not logged in!</h2>
        <button
          onClick={() => navigate("/login")}
          className='px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-purple-400/30 transition-all'
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    toast.success("You have been logged out 👋");
    navigate("/");
  };

  return (
    <div className='text-gray-200 pt-12 px-6'>
      <div className='max-w-3xl mx-auto bg-slate-900/70 border border-slate-700 rounded-3xl shadow-lg p-8 text-center space-y-6'>
        <div className='flex justify-center'>
          <FaUserCircle className='text-purple-500 text-8xl drop-shadow-lg' />
        </div>

        <div>
          <h1 className='text-3xl font-bold text-white'>
            {user.name || "Unnamed User"}
          </h1>
          <p className='text-slate-400 text-sm'>
            @{user.username || "Unknown"}
          </p>
        </div>

        <div className='bg-slate-800/50 rounded-2xl p-6 text-left space-y-4'>
          <div className='flex items-center gap-3'>
            <MdEmail className='text-cyan-400 text-xl' />
            <p className='text-gray-300'>{user.email}</p>
          </div>

          <div className='flex items-center gap-3'>
            <BsCalendarDate className='text-purple-400 text-xl' />
            <p className='text-gray-300'>
              Joined:{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 text-center'>
          <div className='bg-slate-800/50 rounded-xl p-4'>
            <h3 className='text-2xl font-bold text-purple-400'>
              {user?.wishlist?.length || 0}
            </h3>
            <p className='text-slate-400 text-sm'>Wishlist Books</p>
          </div>

          <div className='bg-slate-800/50 rounded-xl p-4'>
            <h3 className='text-2xl font-bold text-cyan-400'>
              {user?.readBooks?.length || 0}
            </h3>
            <p className='text-slate-400 text-sm'>Read Books</p>
          </div>

          <div className='bg-slate-800/50 rounded-xl p-4 hidden sm:block'>
            <h3 className='text-2xl font-bold text-pink-400'>⭐</h3>
            <p className='text-slate-400 text-sm'>Member</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className='mt-6 flex items-center justify-center gap-2 mx-auto bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-red-400/30 transition-all'
        >
          <MdOutlineLogout className='text-xl' /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
