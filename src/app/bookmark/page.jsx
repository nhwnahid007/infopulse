import React from 'react';
import Bookmark from '../../components/Bookmark';

const BookmarkPage = () => {
    return (

       <div>
            <div className="w-full bg-gradient-to-r from-[#12243c] to-[#0f172a] py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">News Bookmarks</h1>
                    <p className="text-gray-300">Save your favorite news articles for later</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center h-screen pb-5'>
                <Bookmark />
            </div>
       </div>
    );
};

export default BookmarkPage;