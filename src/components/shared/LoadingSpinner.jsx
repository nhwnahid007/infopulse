'use client';
import { Loader } from 'lucide-react';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
