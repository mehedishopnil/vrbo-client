import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import InfoCard from '../../../components/InfoCard/InfoCard';

// Local storage key
const STORAGE_KEY = 'userResortsCache';
// Cache expiration time (1 hour in milliseconds)
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

const AllReservation = () => {
    const { hotelData } = useContext(AuthContext);
    const [randomResorts, setRandomResorts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get or generate and store random resorts
    useEffect(() => {
        if (!hotelData || hotelData.length === 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        
        try {
            // Check if we need to update the cache
            const shouldUpdateCache = () => {
                const cachedData = localStorage.getItem(STORAGE_KEY);
                if (!cachedData) return true;
                
                try {
                    const { timestamp, data } = JSON.parse(cachedData);
                    // Update if cache is expired or data length doesn't match
                    return Date.now() - timestamp > CACHE_EXPIRATION_TIME || 
                           data.length !== hotelData.length;
                } catch {
                    return true;
                }
            };

            if (shouldUpdateCache()) {
                // Generate fresh random selection
                const shuffled = [...hotelData].sort(() => 0.5 - Math.random());
                const selectedResorts = shuffled.slice(0, 10);
                
                // Store with timestamp
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: selectedResorts
                }));
                
                setRandomResorts(selectedResorts.slice(0, 8));
            } else {
                // Use cached data but verify against current hotelData
                const cached = JSON.parse(localStorage.getItem(STORAGE_KEY));
                const validResorts = cached.data.filter(cachedResort => 
                    hotelData.some(resort => resort.id === cachedResort.id)
                );
                
                // Fill any missing spots with fresh random resorts
                if (validResorts.length < 8) {
                    const remainingResorts = hotelData.filter(resort => 
                        !validResorts.some(r => r.id === resort.id)
                    );
                    const shuffled = [...remainingResorts].sort(() => 0.5 - Math.random());
                    const needed = 8 - validResorts.length;
                    const combinedResorts = [
                        ...validResorts,
                        ...shuffled.slice(0, needed)
                    ];
                    
                    setRandomResorts(combinedResorts);
                    
                    // Update cache with the new combined data
                    localStorage.setItem(STORAGE_KEY, JSON.stringify({
                        timestamp: Date.now(),
                        data: combinedResorts.concat(shuffled.slice(needed, 10 - validResorts.length))
                    }));
                } else {
                    setRandomResorts(validResorts.slice(0, 8));
                }
            }
        } catch (error) {
            console.error("Error processing resort data:", error);
            // Fallback to fresh random selection
            const shuffled = [...hotelData].sort(() => 0.5 - Math.random());
            setRandomResorts(shuffled.slice(0, 8));
        } finally {
            setLoading(false);
        }
    }, [hotelData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!hotelData || hotelData.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">No resort data available</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Resorts</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {randomResorts.map((resort) => (
                    <InfoCard 
                        key={resort.id} 
                        data={resort}
                        isCached={hotelData.some(r => r.id === resort.id && 
                            JSON.stringify(r) === JSON.stringify(resort))}
                    />
                ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Featured selections update periodically</p>
            </div>
        </div>
    );
};

export default AllReservation;