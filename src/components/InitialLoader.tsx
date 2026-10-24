import React from 'react';

interface InitialLoaderProps {
  isLoading: boolean;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      id="loader"
      className="fixed inset-0 bg-white dark:bg-neutral-900 flex items-center justify-center flex-col z-50 transition-opacity duration-300"
    >
      <img
        src="/img/icon.png"
        alt="loader"
        className="max-sm:w-48 max-sm:h-48 w-60 h-60 object-contain animate-pulse"
      />
      <p className="pt-20 text-center text-xl font-bold text-black dark:text-white">
        Welcome to <span className="text-blue-600">Product Store</span>
      </p>
    </div>
  );
};
