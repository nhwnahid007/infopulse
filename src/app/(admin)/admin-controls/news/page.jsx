'use client';

import Link from 'next/link';
import MsgShower from '@/components/MsgShower';
import NewsCard from '@/components/NewsCard';
import ScrollMsg from '@/components/ScrollMsg';
import Loader from '@/components/shared/LoadingSkeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AllNews = () => {
  const [newses, setNewses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [end, setEnd] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/allNews?page=${page}`);

        if (!response.ok) {
          throw new Error(`Http error! Status: ${response.status}`);
        }

        const dataArr = await response.json();

        if (!dataArr.newses) {
          setError('Data not received');
          return;
        }

        if (dataArr.newses.length < 1) {
          setEnd(true);
          return;
        }

        setNewses((prev) => {
          const existingIds = new Set(prev.map((news) => news._id));
          const newNewses = dataArr.newses.filter(
            (news) => !existingIds.has(news._id),
          );
          return [...prev, ...newNewses];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!end) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleDelete = (deletedNewsId) => {
    setNewses((prevNewses) =>
      prevNewses.filter((news) => news._id !== deletedNewsId),
    );
  };

  return (
    <div>
      <div>
        <div className="flex flex-wrap items-center justify-between pl-7 pr-5 py-4">
          <h2 className="font-bold text-lg">All News</h2>
          <div className="flex justify-between flex-wrap">
            <Link href="/admin-controls/news/add-news">
              <button className="bg-primary h-12 w-28 rounded-md">
                Add News
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex px-6 py-2 gap-5 flex-wrap w-full justify-center md:justify-stretch">
        {initialLoad ? (
          <Loader />
        ) : !newses || newses.length === 0 ? (
          <MsgShower msg={'No News Available'} />
        ) : (
          newses.map((item) => (
            <NewsCard key={item._id} news={item} onDelete={handleDelete} />
          ))
        )}
        {loading && !initialLoad && <Loader />}
        {error && <ScrollMsg msg={error} />}
        {end && <ScrollMsg msg={'No further News!'} />}
      </div>
    </div>
  );
};

export default AllNews;
