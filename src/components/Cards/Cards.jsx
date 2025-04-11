import { Link } from "react-router";

const Cards = ({ data = {} }) => {
  // Ensure safe destructuring
  const { id, price, date, location, image } = data || {};

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
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden">
          {/* Resort Image */}
          <img
            src={image || "https://via.placeholder.com/300"}
            alt={`Resort ${id}`}
            className="w-full h-56 object-cover rounded-t-2xl"
          />

          {/* Resort Details */}
          <div className="p-4 space-y-2">
            <p className="text-lg font-semibold text-gray-700 flex items-center">
              📍 <span className="ml-1">{location || "Unknown Location"}</span>
            </p>
            <p className="text-gray-600 flex items-center">📅 {date || "No Date"}</p>
            <p className="text-gray-800 font-semibold">
              💰 <span className="text-blue-600">${price || "N/A"}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cards;