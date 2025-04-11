import { useState, useContext, useEffect } from "react";

import { BsSearch } from "react-icons/bs";
import ListingCard from "../../components/ListingCard/ListingCard";
import { AuthContext } from "../../providers/AuthProvider";

const Listings = () => {
  const { hotelListData, hotelData, loading, user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);


  useEffect(() => {
    if (!loading) {
      // Filter hotelData based on names present in hotelListData
      const matchedData = hotelData.filter((hotel) =>
        hotelListData.some((listItem) => listItem.name === hotel.title)
      );

      // Apply search filtering on the matched data
      const filteredData = matchedData.filter((item) => {
        const itemName = item.title ? item.title.toLowerCase() : "";
        const itemLocation = item.location ? item.location.toLowerCase() : "";
        return (
          itemName.includes(searchTerm.toLowerCase()) ||
          itemLocation.includes(searchTerm.toLowerCase())
        );
      });

      setFilteredListings(filteredData);
    }
  }, [hotelListData, hotelData, searchTerm, loading]);

  return (
    <div className="mt-8">
      {/* Search bar with search icon */}
      <div className="flex justify-center items-center relative w-4/5 md:w-1/2 mx-auto mb-4">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full p-2 pr-10 rounded-full border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute top-0 right-0 h-full flex items-center pr-2">
          <BsSearch size={20} color="#777" />
        </div>
      </div>
      <div className="flex justify-start ml-10 md:ml-[280px]">
        <h2 className="text-xl font-semibold mb-5">
          {user ? (loading ? "Loading..." : `${filteredListings.length} Listings`) : "Please log in to view listings"}
        </h2>
      </div>
      <div className="w-4/5 md:w-2/3 mx-auto">
        {user ? (
          loading ? (
            <p>Loading...</p>
          ) : filteredListings.length ? (
            filteredListings.map((item, index) => (
              <ListingCard key={item.id} item={item} index={index} />
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