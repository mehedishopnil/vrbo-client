import React, { useEffect, useState } from 'react';
import InfoCard from '../../../components/InfoCard/InfoCard';
import Loading from '../../../components/Loading';

const STORAGE_KEY = 'userResortsCache';

const Complete = () => {
    const [completedResorts, setCompletedResorts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                const selected = parsed.slice(0, 6); // Only take 6 resorts
                setCompletedResorts(selected);
            } else {
                setCompletedResorts([]);
            }
        } catch (err) {
            console.error('Failed to read from localStorage:', err);
            setCompletedResorts([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    if (!completedResorts || completedResorts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">No completed reservations</p>
                <p className="text-sm text-gray-400">Please check back later</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Completed Reservations</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedResorts.map((resort, index) => (
                    <InfoCard
                        key={`${resort.id}-${index}`}
                        data={resort}
                        showStatus={true}
                        statusVariant="success" // You can customize based on your need
                    />
                ))}
            </div>
        </div>
    );
};

export default Complete;
