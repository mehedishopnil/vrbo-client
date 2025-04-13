import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router"; // Make sure it's from react-router-dom
import { BsSearch } from "react-icons/bs";
import ListingCard from "../../components/ListingCard/ListingCard";
import { AuthContext } from "../../providers/AuthProvider";

const Listings = () => {
  const { hotelListData, hotelData, loading, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  

  useEffect(() => {
    if (!loading && hotelData && hotelListData) {
      const matchedData = hotelData.filter((hotel) =>
        hotelListData.some((listItem) => listItem.name === hotel.title)
      );

      const filteredData = matchedData.filter((item) => {
        const itemName = item.title?.toLowerCase() || "";
        const itemLocation = item.location?.toLowerCase() || "";
        const search = searchTerm.toLowerCase();
        return itemName.includes(search) || itemLocation.includes(search);
      });

      setFilteredListings(filteredData);
    }
  }, [hotelListData, hotelData, searchTerm, loading]);

  

  return (
    <div className="mt-8">
      {/* Search input */}
      <div className="flex justify-center items-center relative w-4/5 md:w-1/2 mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full p-2 pr-10 rounded-full border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BsSearch size={20} color="#777" className="absolute right-3" />
      </div>

      {/* Listings count */}
      <div className="flex justify-start ml-10 md:ml-[280px]">
        <h2 className="text-xl font-semibold mb-5">
          {user
            ? loading
              ? "Loading..."
              : `${filteredListings.length} Listings`
            : "Please log in to view listings"}
        </h2>
      </div>

      {/* Listing cards */}
      <div className="w-4/5 md:w-2/3 mx-auto">
        {user ? (
          loading ? (
            <p>Loading...</p>
          ) : filteredListings.length ? (
            filteredListings.map((item) => (
              <div
                key={item.id}
                
                className="cursor-pointer hover:shadow-md transition-shadow duration-200 mb-4"
              >
                <ListingCard item={item} />
              </div>
            ))
          ) : (
            <p>No listings found.</p>
          )
        ) : (
          <p>Please log in to view listings.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
