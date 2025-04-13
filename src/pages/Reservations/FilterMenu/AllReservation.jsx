import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import InfoCard from '../../../components/InfoCard/InfoCard';

// Local storage key
const STORAGE_KEY = 'userResortsCache';

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
            // Try to get cached resorts from localStorage
            const cachedResorts = localStorage.getItem(STORAGE_KEY);
            
            if (cachedResorts) {
                const parsedResorts = JSON.parse(cachedResorts);
                
                // Verify cached resorts still exist in current hotelData
                const validResorts = parsedResorts.filter(cachedResort => 
                    hotelData.some(resort => resort.id === cachedResort.id)
                );
                
                if (validResorts.length >= 8) {
                    setRandomResorts(validResorts.slice(0, 8));
                    setLoading(false);
                    return;
                }
            }

            // If no valid cache, generate new random selection
            const shuffled = [...hotelData].sort(() => 0.5 - Math.random());
            const selectedResorts = shuffled.slice(0, 10); // Store 10, display 8
            
            // Store in localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedResorts));
            
            // Set state with first 8 resorts
            setRandomResorts(selectedResorts.slice(0, 8));
            
        } catch (error) {
            console.error("Error processing resort data:", error);
            
            // Fallback to random selection without caching
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
                        isCached={true} // Optional prop to indicate this is from cache
                    />
                ))}
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>These selections are saved for your next visit</p>
            </div>
        </div>
    );
};

export default AllReservation;