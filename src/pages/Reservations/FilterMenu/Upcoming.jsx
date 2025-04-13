import React, { useEffect, useState } from 'react';
import InfoCard from '../../../components/InfoCard/InfoCard';

const STORAGE_KEY = 'userResortsCache';

const Upcoming = () => {
    const [cachedResorts, setCachedResorts] = useState([]);

    console.log(cachedResorts);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setCachedResorts(parsedData.slice(0, 7)); // Show first 7 resorts
            }
        } catch (error) {
            console.error("Error reading cached resorts:", error);
        }
    }, []);

    if (!cachedResorts || cachedResorts.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-lg text-gray-500">No upcoming reservations found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Reservations</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {cachedResorts.map((resort, index) => (
                    <InfoCard 
                        key={`${resort.id}-${index}`} 
                        data={resort} 
                        isCached={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Upcoming;
