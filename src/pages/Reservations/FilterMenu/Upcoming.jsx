import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../../../components/InfoCard/InfoCard";
import { AuthContext } from "../../../providers/AuthProvider";

const STORAGE_KEY = "userResortsCache";

const Upcoming = () => {
  const [cachedResorts, setCachedResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025"); // Default to 2025
  const [julyResort, setJulyResort] = useState(null);
  const [christmasResorts, setChristmasResorts] = useState([]);

  const { hotelData } = useContext(AuthContext);

  useEffect(() => {
    const fetchAndValidateResorts = () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedYear === "2026") {
          // For 2026, handle special resort displays
          if (!hotelData || hotelData.length === 0) {
            throw new Error("No hotel data available for 2026 resorts");
          }

          // Find resort with id 3 for July 2026
          const julyResortData = hotelData.find((hotel) => hotel.id === 3);
          if (julyResortData) {
            setJulyResort({
              ...julyResortData,
              name: "July 2026 Reservation",
              status: "upcoming",
              price: "$1200/night",
              beds: 2,
              nights: 7,
              isSpecial: true,
            });
          } else {
            throw new Error("July 2026 resort not found");
          }

          // Find resorts with id 3 and 8 for Christmas Week 2026
          const christmasResortsData = hotelData.filter((hotel) => 
            hotel.id === 3 || hotel.id === 8
          ).map(resort => ({
            ...resort,
            name: resort.id === 3 ? "Resort A" : "Resort B",
            status: "upcoming",
            price: "$1200/night",
            beds: 2,
            nights: 7,
            isSpecial: true,
          }));

          if (christmasResortsData.length === 0) {
            throw new Error("Christmas Week resorts not found");
          }

          setChristmasResorts(christmasResortsData);
          setCachedResorts([]); // Clear regular resorts for 2026 view
        } else {
          // For 2025, show regular cached resorts
          const storedData = localStorage.getItem(STORAGE_KEY);

          if (!storedData) {
            throw new Error("No cached resorts found");
          }

          const parsedData = JSON.parse(storedData);

          // Handle both old and new storage formats
          const resorts = parsedData.data ? parsedData.data : parsedData;

          if (!Array.isArray(resorts) || resorts.length === 0) {
            throw new Error("Invalid cached data format");
          }

          // Filter for upcoming resorts (if they have a status field)
          const upcomingResorts = resorts.filter(
            (resort) =>
              resort.status?.toLowerCase() === "upcoming" ||
              resort.bookingStatus?.toLowerCase() === "upcoming"
          );

          // If we have upcoming resorts, use them, otherwise use cached resorts
          const displayResorts =
            upcomingResorts.length > 0
              ? upcomingResorts.slice(0, 7)
              : resorts.slice(0, 7);

          setCachedResorts(displayResorts);
          setJulyResort(null);
          setChristmasResorts([]);
        }
      } catch (err) {
        console.error("Error processing resorts:", err);
        setError(err.message);
        setCachedResorts([]);
        setJulyResort(null);
        setChristmasResorts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndValidateResorts();
  }, [selectedYear, hotelData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-2">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-500">
          Could not load reservations
        </p>
        <p className="text-sm text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Upcoming Reservations
      </h2>

      {/* Year selection dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2025">2025 Upcoming Resort</option>
          <option value="2026">2026 Upcoming Resort</option>
        </select>
      </div>

      {selectedYear === "2025" ? (
        !cachedResorts || cachedResorts.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 gap-2">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium text-gray-500">
              No upcoming reservations
            </p>
            <p className="text-sm text-gray-400">Try checking back later</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cachedResorts.map((resort) => (
                <InfoCard
                  key={`${resort.id}-2025`}
                  data={resort}
                  isCached={true}
                  showBadge={
                    resort.status?.toLowerCase() === "upcoming" ||
                    resort.bookingStatus?.toLowerCase() === "upcoming"
                  }
                />
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Showing {cachedResorts.length} upcoming reservations for 2025</p>
            </div>
          </>
        )
      ) : (
        <div className="space-y-12">
          {/* July 2026 Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">July 2026 Reservation</h3>
            {julyResort ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                <InfoCard
                  key={`${julyResort.id}-july`}
                  data={julyResort}
                  isCached={false}
                  showBadge={true}
                />
              </div>
            ) : (
              <p className="text-gray-500">No July 2026 reservation available</p>
            )}
          </div>

          {/* Christmas Week 2026 Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Christmas Week 2026</h3>
            {christmasResorts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {christmasResorts.map((resort) => (
                  <InfoCard
                    key={`${resort.id}-christmas`}
                    data={resort}
                    isCached={false}
                    showBadge={true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No Christmas Week reservations available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upcoming;