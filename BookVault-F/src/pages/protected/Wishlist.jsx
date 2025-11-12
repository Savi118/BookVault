import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../../utils/api";
import BookCard from "../../components/BookCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user } = useSelector((state) => state.auth);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistBooks = async () => {
      try {
        const res = await api.get("/api/wishlist/get");
        const fetchedBooks = Array.isArray(res.data.wishlist)
          ? res.data.wishlist
          : [];

        const visibleBooks =
          user && user.readBooks?.length > 0
            ? fetchedBooks.filter((book) => !user.readBooks.includes(book._id))
            : fetchedBooks;

        setWishlistBooks(visibleBooks);
        setFilteredBooks(visibleBooks);
      } catch (err) {
        console.error("❌ Error fetching wishlist books:", err);
        toast.error("Failed to load your wishlist 😢");
      }
    };

    fetchWishlistBooks();
  }, [user]);

  useEffect(() => {
    const filtered = wishlistBooks.filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = genre === "all" || b.genre === genre;
      return matchSearch && matchGenre;
    });
    setFilteredBooks(filtered);
  }, [searchTerm, genre, wishlistBooks]);

  const handleRemoveWishlist = async (bookId) => {
    try {
      const res = await api.post("/api/wishlist/remove", { bookId });
      if (res.data.success) {
        toast.success(res.data.message || "Removed from wishlist ❤️");

        const updatedList = wishlistBooks.filter((b) => b._id !== bookId);
        setWishlistBooks(updatedList);
        setFilteredBooks(updatedList);
      }
    } catch (err) {
      console.error(
        "❌ Wishlist Remove Error:",
        err.response?.data || err.message
      );
      toast.error("Couldn't remove from wishlist 😢");
    }
  };

  const handleMarkRead = async (bookId) => {
    try {
      const res = await api.post("/api/read/mark-read", { bookId });

      if (res.data.success) {
        toast.success(res.data.message || "Book marked as read ✅");
        await api.post("/api/wishlist/remove", { bookId });
        setWishlistBooks((prev) => prev.filter((b) => b._id !== bookId));
        setFilteredBooks((prev) => prev.filter((b) => b._id !== bookId));
      } else {
        toast.error(res.data.message || "Failed to mark as read");
      }
    } catch (err) {
      console.error("❌ Mark Read Error:", err);
      toast.error("Failed to mark as read.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className='min-h-screen text-gray-100 p-6 relative'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
          <h1 className='text-3xl font-bold text-pink-400'>💖 My Wishlist</h1>

          <div className='flex gap-3 items-center w-full sm:w-auto'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearch}
              placeholder='Search by title or author...'
              className='w-full sm:w-64 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 placeholder-slate-500 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all'
            />

            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className='px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-pink-400 outline-none'
            >
              <option value='all'>All Genres</option>
              <option value='fiction'>Fiction</option>
              <option value='fantasy'>Fantasy</option>
              <option value='technology'>Technology</option>
              <option value='history'>History</option>
              <option value='self-help'>Self Help</option>
            </select>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                isUser={!!user}
                showWishlist={true}
                onWishlist={() => handleRemoveWishlist(book._id)}
                wishlist={wishlistBooks.map((b) => b._id)}
                onRead={() => handleMarkRead(book._id)}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-slate-400 mt-12 text-lg'>
            😕 No books in your wishlist yet.
          </p>
        )}
      </div>

      <button
        className='fixed bottom-6 right-6 text-pink-500 hover:text-pink-400 transition-all duration-300'
        title='Add new book'
        onClick={async () => {
          await toast("📚 Discover more books in Explore!");
          navigate("/explore");
        }}
      >
        <IoAddCircle className='text-6xl drop-shadow-lg' />
      </button>
    </div>
  );
};

export default Wishlist;
