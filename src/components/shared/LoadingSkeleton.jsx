'use client';
import React from 'react';

import Lottie from 'lottie-react';
import loading from '../../../public/loading.json';
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};

export default Loader;
