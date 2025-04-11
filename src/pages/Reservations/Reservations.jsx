import { useContext, useEffect, useState } from 'react';

import InfoCard from '../../components/InfoCard/InfoCard';
import { AuthContext } from '../../providers/AuthProvider';

const Reservations = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const { hotelData = [], loading } = useContext(AuthContext);

  useEffect(() => {
    // Initial rendering with 'All' filter
    filterData('All');
  }, [hotelData]);

  const filterData = (filter) => {
    let filteredData;

    if (filter === 'All') {
      // Filter for 'Farmer' category
      filteredData = hotelData.filter((item) => item.category === 'Farms');
    } else {
      // Filter data based on other filters
      filteredData = hotelData.filter((item) => item.category === filter);
    }

    setFilteredData(filteredData);
    setSelectedFilter(filter);
  };

  const renderFilteredData = () => {
    if (loading) {
      // Show loading indicator while data is being fetched
      return <div>Loading...</div>;
    }

    if (filteredData.length === 0) {
      // No results found
      if (selectedFilter === 'Upcoming') {
        return <div className='flex justify-center md:justify-center mt-10'>
          <p className='text-lg font-semibold text-center'>You have no upcoming reservations.</p>
        </div>
      } else {
        return <div className='flex justify-center mt-10'>
          <p className='text-lg font-semibold text-center'>No results found.<br></br><span className='font-normal text-gray-600'> Please try a different filter.</span></p>
        </div>
      }
    }

    return filteredData.map((item, index) => (
      <InfoCard key={index} data={item} />
    ));
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center md:ml-10 mt-5">
      <h2 className="text-xl md:text-3xl font-bold mb-4">Reservations</h2>

      {/* Filter Section */}
      <div className="flex items-center justify-center gap-10 mb-4">
        <button
          className={`cursor-pointer ${selectedFilter === 'Upcoming' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`cursor-pointer ${selectedFilter === 'Complete' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Complete')}
        >
          Complete
        </button>
        <button
          className={`cursor-pointer ${selectedFilter === 'Canceled' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Canceled')}
        >
          Canceled
        </button>
        <button
          className={`cursor-pointer ${selectedFilter === 'All' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('All')}
        >
          All
        </button>
      </div>
      <div className='flex justify-center '>
        <span className='w-[400px] border border-gray-300'></span>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center gap-5">
        {renderFilteredData()}
      </div>
    </div>
  );
};

export default Reservations;