import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import BookCard from "../components/BookCard";
import api from "../utils/api";

const Explore = () => {
  const { user } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/api/book/all");
        const fetchedBooks = Array.isArray(res.data.books)
          ? res.data.books
          : [];
        const visibleBooks =
          user && user.readBooks?.length > 0
            ? fetchedBooks.filter((book) => !user.readBooks.includes(book._id))
            : fetchedBooks;
        setBooks(visibleBooks);
        setFiltered(visibleBooks);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load books.");
      }
    };
    fetchBooks();
  }, [user]);

  useEffect(() => {
    const filteredBooks = books.filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "all" || b.genre === genre;
      return matchSearch && matchGenre;
    });
    setFiltered(filteredBooks);
  }, [search, genre, books]);

  const handleWishlist = async (bookId) => {
    try {
      const isWishlisted = wishlist.includes(bookId);
      const endpoint = isWishlisted
        ? "/api/wishlist/remove"
        : "/api/wishlist/add";
      const res = await api.post(endpoint, { bookId });

      if (res.data.success) {
        toast.success(res.data.message);

        setWishlist((prev) =>
          isWishlisted ? prev.filter((id) => id !== bookId) : [...prev, bookId]
        );
      }
    } catch (err) {
      console.error(
        "❌ Wishlist Toggle Error:",
        err.response?.data || err.message
      );
      toast.error("Failed to update wishlist");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/api/wishlist/get");
        if (res.data.success) {
          const wishlistIds = res.data.wishlist.map((b) => b._id);
          setWishlist(wishlistIds);
        }
      } catch (err) {
        console.error(
          "❌ Fetch Wishlist Error:",
          err.response?.data || err.message
        );
      }
    };
    fetchWishlist();
  }, []);

  const handleMarkRead = async (bookId) => {
    try {
      const res = await api.post("/api/read/mark-read", { bookId });
      if (res.data.success) {
        toast.success("Book marked as read ✅");
        setBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
      } else {
        toast.error(res.data.message || "Failed to mark as read");
      }
    } catch (err) {
      toast.error("Failed to mark as read.");
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <section className='min-h-screen text-gray-200 px-6 py-16'>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center text-5xl font-extrabold mb-6'
        >
          Explore the <span className='text-purple-400'>Vault</span> 📚
        </motion.h1>

        <div className='flex flex-col md:flex-row items-center justify-center gap-4 mb-10'>
          <input
            type='text'
            placeholder='Search by title or author...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='px-4 py-3 w-full md:w-1/2 bg-slate-800 border border-slate-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-purple-400 outline-none'
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none'
          >
            <option value='all'>All Genres</option>
            <option value='fiction'>Fiction</option>
            <option value='fantasy'>Fantasy</option>
            <option value='technology'>Technology</option>
            <option value='history'>History</option>
            <option value='self-help'>Self Help</option>
          </select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {filtered.length > 0 ? (
            filtered.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                isUser={user}
                onWishlist={handleWishlist}
                onRead={handleMarkRead}
                wishlist={wishlist}
              />
            ))
          ) : (
            <p className='text-center text-slate-400 col-span-full'>
              No books found matching your search.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore;
