'use client';
import React from 'react';

import Lottie from 'lottie-react';
import loading from '../../../public/loading.json';
const Loader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      suppressHydrationWarning
    >
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};

export default Loader;
