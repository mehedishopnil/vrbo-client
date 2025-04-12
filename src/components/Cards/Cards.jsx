import { Link } from "react-router";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

const Cards = ({ data = {} }) => {
  // Ensure safe destructuring with additional resort fields
  const { id, price, title, date, location, image, reviews_amount } = data || {};

  console.log(data)

  // Generate random rating between 7 and 10 (with one decimal place)
  const rating = (Math.random() * 3 + 7).toFixed(1);
  
  // Determine comment based on rating
  let comment;
  if (rating < 8) {
    comment = "Good";
  } else if (rating < 9) {
    comment = "Excellent";
  } else {
    comment = "Wonderful";
  }

  // Handle missing data
  if (!id) {
    return (
      <div className="w-full max-w-sm mx-auto p-4 text-center bg-gray-100 rounded-xl">
        <p className="text-gray-500">Resort details not available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/resort/${id}`} className="block">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] overflow-hidden">
          {/* Resort Image with Like Button */}
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/300"}
              alt={`Resort ${id}`}
              className="w-full h-56 object-cover"
            />
            {/* Like Button */}
            <button
              className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-white transition-all"
              onClick={(e) => {
                e.preventDefault();
                console.log("Liked resort:", id);
              }}
            >
              <FaHeart className="text-red-500" />
            </button>
          </div>

          {/* Resort Details */}
          <div className="p-4 space-y-3">
            {/* Resort Title */}
            <h2 className="text-xl font-semibold text-gray-800">{title || "Unknown Resort"}</h2>

            {/* Location and Date */}
            {/* Location */}
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="font-medium">{location || "Unknown Location"}</span>
            </div>

            {/* Date
            <p className="text-gray-600 flex items-center">
              <span className="mr-1">📅</span> {date || "No Date"}
            </p> */}

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                <FaStar className="mr-1" />
                <span className="font-semibold">{rating}</span>
              </div>
              <span className="text-gray-500">{comment}</span>
              {reviews_amount && (
                <span className="text-gray-500 ml-2">({reviews_amount} reviews)</span>
              )}
            </div>

            {/* Price */}
            {/* <p className="text-gray-800 font-semibold text-lg">
              <span className="text-blue-600">${price || "N/A"}</span> night
            </p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;