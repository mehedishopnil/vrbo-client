import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Upcoming from './FilterMenu/Upcoming';
import Complete from './FilterMenu/Complete';
import Canceled from './FilterMenu/Canceled';
import AllReservation from './FilterMenu/AllReservation';
;

const Reservations = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { hotelData = [], loading } = useContext(AuthContext);

  // Filter data based on selection
  const getFilteredData = () => {
    switch(selectedFilter) {
      case 'Upcoming':
        return hotelData.filter(item => item.status === 'upcoming');
      case 'Complete':
        return hotelData.filter(item => item.status === 'complete');
      case 'Canceled':
        return hotelData.filter(item => item.status === 'canceled');
      case 'All':
      default:
        return hotelData.filter(item => item.category === 'Farms');
    }
  };

  const filteredData = getFilteredData();

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center py-10">Loading reservations...</div>;
    }

    switch(selectedFilter) {
      case 'Upcoming':
        return <Upcoming data={filteredData} />;
      case 'Complete':
        return <Complete data={filteredData} />;
      case 'Canceled':
        return <Canceled data={filteredData} />;
      case 'All':
      default:
        return <AllReservation data={filteredData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Reservations</h2>

      {/* Filter Navigation */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
        {['All', 'Upcoming', 'Complete', 'Canceled'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFilter === filter 
                ? 'bg-blue-500 text-white font-medium' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="border-b border-gray-200 mb-8"></div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default Reservations;