import { FaCheck, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import image1 from "../../assets/images/Home-page_standard.avif";
import image2 from "../../assets/images/Home-page_standard.webp";



const Home = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
      {/* Title */}
      <h1 className="w-3/5 md:w-full text-3xl md:text-4xl font-bold  pl-5 text-gray-900">
        Search vacation rentals
      </h1>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Location Input */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 ring-blue-200">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Going to"
            className="w-full bg-transparent border-hidden outline-none"
          />
        </div>

        {/* Check-in & Check-out Inputs */}
        <div className="flex w-full gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 ring-blue-200 w-full">
            <MdDateRange className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Check-in"
              className="w-full bg-transparent border-hidden outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 ring-blue-200 w-full">
            <MdDateRange className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Check-out"
              className="w-full bg-transparent border-hidden outline-none"
            />
          </div>
        </div>

        {/* Guests Input */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 ring-blue-200">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Guests - 2 travelers, 1 room"
            className="w-full bg-transparent border-hidden  outline-none"
          />
        </div>

        {/* Search Button */}
        <button className="w-full md:w-auto bg-[#1668e3] text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-500 transition-all">
          Search
        </button>
      </div>

      {/* Membership Info */}
      <div className="flex gap-3 items-center text-gray-700 px-2 mt-8 text-lg">
      <FaCheck className="text-3xl"/> <p>As a <span className="font-semibold text-blue-600">One Key</span> member, you can save 10% or more on over 100,000 hotels worldwide.</p>
      </div>

      {/* Card Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sample Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
          <img src={image1} alt="Destination" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Feel right at home as you explore the world</h3>
            <div className="text-gray-600 mt-2">
              <p className="font-semibold">The perfect vacation rental awaits</p>
              <p>Beachfront villas, city apartments or mountain cabins — whatever, wherever your heart desires.</p>
              <p className="font-semibold">More value for your money</p>
              <p className="">Rent an entire home for half the price of a hotel. Then add the savings of not always eating out at restaurants.</p>
              <p className="font-semibold">Amenities, amenities, amenities</p>
              <p className="">Kick back and relax. Everything you need is at your fingertips — the comforts of spacious living, privacy and fully-stocked kitchens</p>
              </div>
          </div>
        </div>
      </div>


      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sample Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
          <img src={image2} alt="Destination" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900">Enjoy the comforts of home when you travel for work</h3>
            <div className="text-gray-600 mt-2">
              <p className="font-semibold">Convenience</p>
              <p>Choose from rentals in all the best parts of town — near the office or your favorite park and a morning run.</p>
              <p className="font-semibold">Amenities</p>
              <p className="">Wi-Fi and work spaces make it business as usual, yet comfortable and relaxed in your own place.</p>
              <p className="font-semibold">Value</p>
              <p className="">Stretch your travel dollar with lower nightly rates and home-cooked meals just the way you like them.</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;