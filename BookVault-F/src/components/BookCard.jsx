import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

const BookCard = ({
  book,
  isUser,
  onWishlist,
  showWishlist = true,
  showMarkAsRead = false,
  onRemoveRead,
  onRead,
  wishlist,
}) => {
  const isWishlisted = wishlist?.includes(book._id);

  return (
    <div className='bg-slate-800/70 border border-slate-700 rounded-2xl shadow-md hover:shadow-purple-500/30 hover:scale-[1.02] transition-all duration-300 overflow-hidden'>
      <img
        src={book.cover}
        alt={book.title}
        className='w-full h-60 object-cover'
      />
      <div className='p-4 text-left space-y-2'>
        <h3 className='text-xl font-semibold text-gray-100 truncate'>
          {book.title}
        </h3>
        <p className='text-sm text-slate-400 italic'>by {book.author}</p>
        <p className='text-xs text-slate-500'>{book.genre}</p>

        {isUser ? (
          <div className='flex gap-3 pt-3'>
            {showWishlist && (
              <button
                onClick={() => onWishlist(book._id)}
                className='text-lg text-pink-400 hover:text-pink-300 hover:scale-110 transition-all'
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>
            )}

            <button
              onClick={() => {
                showMarkAsRead ? onRemoveRead(book._id) : onRead(book._id);
              }}
              className='text-lg text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all'
              title={showMarkAsRead ? "Remove from Read" : "Mark as Read"}
            >
              {showMarkAsRead ? <MdBookmark /> : <MdBookmarkBorder />}
            </button>
          </div>
        ) : (
          <p className='text-slate-500 text-sm pt-3 italic'>
            Login to save or mark books 📖
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
