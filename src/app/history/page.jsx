import React from 'react';
import History from '@/components/History';

const historyAndBookmarkPage = () => {
    return (

       <div>
            <div className="w-full bg-gradient-to-r from-[#12243c] to-[#0f172a] py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">News Reading History</h1>
                    <p className="text-gray-300">Track your news reading journey and revisit your favorite articles</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center h-screen pb-5'>
                <History />
            </div>
       </div>
    );
};

export default historyAndBookmarkPage;