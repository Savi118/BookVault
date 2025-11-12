import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../../utils/api";
import BookCard from "../../components/BookCard";
import { useSelector } from "react-redux";

const Library = () => {
  const { user } = useSelector((state) => state.auth);
  const [readBooks, setReadBooks] = useState([]); // ✅ consistent name
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    const fetchReadBooks = async () => {
      try {
        const res = await api.get("/api/read/get-read");
        const fetchedReadBooks = Array.isArray(res.data.readBooks)
          ? res.data.readBooks
          : [];
        const visibleBooks =
          user && user.wishlist?.length > 0
            ? fetchedReadBooks.filter(
                (book) => !user.wishlist.includes(book._id)
              )
            : fetchedReadBooks;
        setReadBooks(visibleBooks);
        setFilteredBooks(visibleBooks);
      } catch (err) {
        console.error("❌ Error fetching read books:", err);
        toast.error("Failed to load your library 😢");
      }
    };
    fetchReadBooks();
  }, [user]);

  useEffect(() => {
    const filtered = readBooks.filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = genre === "all" || b.genre === genre;
      return matchSearch && matchGenre;
    });
    setFilteredBooks(filtered);
  }, [searchTerm, genre, readBooks]);

  const handleRemoveRead = async (bookId) => {
    try {
      const res = await api.post("/api/read/remove", { bookId });

      if (res.data.success) {
        toast.success(res.data.message);

        setReadBooks((prev) => prev.filter((b) => b._id !== bookId));
        setFilteredBooks((prev) => prev.filter((b) => b._id !== bookId));
      }
    } catch (err) {
      console.error("❌ Remove Read Error:", err.response?.data || err.message);
      toast.error("Couldn't remove book from read list.");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = readBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className='min-h-screen  text-gray-100 p-6 relative'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-purple-400'>📚 My Library</h1>
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
                showWishlist={false}
                showMarkAsRead={true}
                onRemoveRead={() => handleRemoveRead(book._id)}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-slate-400 mt-12 text-lg'>
            😕 No books found in your library.
          </p>
        )}
      </div>

      <button
        className='fixed bottom-6 right-6 text-purple-500 hover:text-purple-400 transition-all duration-300'
        title='Add new book'
        onClick={() => toast("📖 Add new book coming soon!")}
      >
        <IoAddCircle className='text-6xl drop-shadow-lg' />
      </button>
    </div>
  );
};

export default Library;
