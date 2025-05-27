import React from 'react';
import Loader from '../components/shared/LoadingSkeleton';

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
};

export default loading;
