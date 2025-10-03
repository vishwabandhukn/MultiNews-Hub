import React from 'react';

const NewsCard = ({ item }) => {
  if (!item) return null;

  // Format date and time properly
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Just now';
      }
      
      // Calculate time difference in minutes
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.round(diffMs / 60000);
      
      // Show relative time for recent news
      if (diffMins < 60) {
        return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
      } else if (diffMins < 1440) { // Less than a day
        const hours = Math.floor(diffMins / 60);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        // For older news, show the full date
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      return 'Recent';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=News';
          }}
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold line-clamp-2">{item.title}</h3>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-blue-700">
              {item.source?.name || ''}
            </span>
            <span className="text-xs text-gray-500">
              {formatDateTime(item.pubDate)}
            </span>
          </div>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;