import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SingleResortPage = () => {
  const { id } = useParams();
  const { hotelData } = useContext(AuthContext);

  const resort = hotelData.find((item) => item.id === parseInt(id));

  if (!resort) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Resort Not Found</h1>
          <p className="text-gray-600">Please check the URL or try another listing.</p>
        </div>
      </div>
    );
  }

  const images = Array.isArray(resort.image) ? resort.image : [resort.image];

  const pricePerNight = parseFloat(resort.price.replace(/[^0-9.]/g, ""));
  const pricePerWeek = pricePerNight * 7;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Carousel */}
      <div className="carousel w-full rounded-xl overflow-hidden mb-6 shadow-lg">
        {images.map((img, index) => (
          <div
            key={index}
            id={`slide${index}`}
            className="carousel-item relative w-full h-[400px]"
          >
            <img
              src={img}
              className="w-full object-cover"
              alt={`Image ${index + 1}`}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${(index - 1 + images.length) % images.length}`}
                className="btn btn-circle bg-white text-gray-700 hover:bg-gray-200"
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % images.length}`}
                className="btn btn-circle bg-white text-gray-700 hover:bg-gray-200"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Title & Location */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">{resort.title}</h1>
        <p className="text-gray-500 text-lg mt-2">{resort.location}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">About this property</h2>
            <p className="text-gray-700 leading-relaxed">{resort.description}</p>
          </div>

          {/* Info Box */}
          <div className="bg-gray-100 rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Category:</strong> {resort.category}</li>
              <li><strong>Date Listed:</strong> {new Date(resort.date).toLocaleDateString()}</li>
              <li><strong>Price per night:</strong> ${pricePerNight.toFixed(2)}</li>
              <li><strong>Price per week:</strong> <span className="text-green-600 font-bold">${pricePerWeek.toFixed(2)}</span></li>
            </ul>
          </div>
        </div>

        {/* Right - Booking */}
        <div className="bg-white rounded-lg p-6 shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Book this resort</h3>
          <p className="text-3xl font-bold text-green-600 mb-6">${pricePerWeek.toFixed(2)} / week</p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleResortPage;
