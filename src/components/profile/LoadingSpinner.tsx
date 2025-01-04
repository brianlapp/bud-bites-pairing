import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage-500"></div>
    </div>
  );
};