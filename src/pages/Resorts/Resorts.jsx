import { useContext, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaTree, FaUmbrellaBeach, FaWarehouse } from "react-icons/fa";
import { MdHouseboat } from "react-icons/md";
import { GiIsland } from "react-icons/gi";

import Cards from "../../components/Cards/Cards";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";


const Resorts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 9;

  const { hotelData } = useContext(AuthContext);

  useEffect(() => {
    if (hotelData && hotelData.length > 0) {
      setLoading(false);
    }
  }, [hotelData]);

  const selectedCategories = [
    "Tropical",
    "Beach",
    "Tiny homes",
    "Farms",
    "Islands",
  ];

  const categoryIcons = {
    Tropical: <FaTree />,
    Beach: <FaUmbrellaBeach />,
    "Tiny homes": <MdHouseboat />,
    Farms: <FaWarehouse />,
    Islands: <GiIsland />,
  };

  // Handle search input with sanitization
  const handleSearchInput = (e) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setSearchTerm(sanitizedInput);
  };

  const filteredData = hotelData
    ? hotelData.filter(
        (item) =>
          selectedCategory === "All" || item.category === selectedCategory
      )
        .filter(
          (item) =>
            (item.name &&
              item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.location &&
              item.location.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = Math.ceil(
    hotelData?.filter(
      (item) => selectedCategory === "All" || item.category === selectedCategory
    ).length / itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative mb-10 h-72 bg-cover bg-center" style={{ backgroundImage: "url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/600234276.jpg?k=604573baa332da82d384c12b12ac00941e7dcb8e309ed657dbcd9e5b0fea26a1&o=&hp=1')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white p-12">
          <h1 className="text-4xl font-semibold">Discover Your Next Dream Resort</h1>
          <p className="text-xl mt-4">Find the best resorts that suit your style and budget.</p>
        </div>
      </section>

      {/* Search bar with search icon */}
      <div className="flex justify-center items-center mt-5 mb-4">
        <div className="bg-white rounded-full  p-3 shadow w-full max-w-4xl mx-auto flex items-center">
          <BsSearch size={20} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by name or location..."
            className="w-full h-10 pl-4 rounded-full border-none outline-none"
            value={searchTerm}
            onChange={handleSearchInput} // Updated onChange handler
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col justify-center items-center mb-4 pt-10">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {selectedCategories.map((category, index) => (
            <button
              key={index}
              className={`flex items-center justify-center p-3 md:p-4 border rounded transition-colors duration-300 bg-white hover:bg-blue-500 hover:text-white ${
                selectedCategory === category ? "bg-blue-500 text-white" : "text-gray-700"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {categoryIcons[category]}
              <span className="ml-2 hidden md:inline">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 px-2">
        {filteredData.map((item, index) => (
          <Cards key={index} data={item} />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-center mt-4">
        <button
          className="mr-2 px-4 py-2 border rounded focus:outline-none"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="ml-2 px-4 py-2 border rounded focus:outline-none"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Bhromonkari. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Resorts;