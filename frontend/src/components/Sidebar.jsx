import React from 'react';
import { X, Globe, Newspaper, RefreshCw, ChevronRight } from 'lucide-react';

const Sidebar = ({ 
  isOpen, 
  onClose, 
  languages, 
  sources, 
  selectedLanguage, 
  selectedSource, 
  onLanguageChange, 
  onSourceChange, 
  onRefresh, 
  isLoading 
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">NewsHub</h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Languages Section */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Languages
            </h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => onLanguageChange(language.id)}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors
                    ${selectedLanguage === language.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.label}</span>
                  </div>
                  {selectedLanguage === language.id && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sources Section */}
          {selectedLanguage && sources && sources.length > 0 && (
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Newspaper className="w-4 h-4 mr-2" />
                Newspapers
              </h3>
              <div className="space-y-2">
                {sources.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => onSourceChange(source.id)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors
                      ${selectedSource === source.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="font-medium">{source.label}</span>
                    </div>
                    {selectedSource === source.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Refresh Section */}
          {selectedSource && (
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh News</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Data refreshed every 15 minutes</p>
            <p className="mt-1">MultiLang News Hub</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
