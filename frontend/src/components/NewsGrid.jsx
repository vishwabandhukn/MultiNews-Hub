import React from 'react';
import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';

const NewsGrid = ({ news, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No news available. Please select a source.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {news.map((item, index) => (
        <NewsCard key={item.id || index} item={item} />
      ))}
    </div>
  );
};

export default NewsGrid;