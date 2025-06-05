'use client'

import Link from "next/link";

const AllNews = () => {
 
  return (
    <div>
      <div>
        <div className="flex flex-wrap items-center justify-between pl-7 pr-5 py-4">
          <h2 className="font-bold text-lg">All News</h2>
          <div className="flex justify-between flex-wrap">
            <Link href="/admin-controls/news/add-news">
              <button className="bg-primary h-12 w-28 rounded-md">Add News</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNews;
