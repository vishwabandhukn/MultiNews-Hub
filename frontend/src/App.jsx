import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import NewsGrid from './components/NewsGrid'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useNewsData } from './hooks/useNewsData'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage('selectedLanguage', null)
  const [selectedSource, setSelectedSource] = useLocalStorage('selectedSource', null)
  
  // Use the custom hook to fetch news data
  const { news, isLoading } = useNewsData(selectedSource)
  
  // Languages data from backend
  const languages = [
    { id: 'english', label: 'English', flag: '🇬🇧' },
    { id: 'kannada', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { id: 'hindi', label: 'हिन्दी', flag: '🇮🇳' }
  ]
  
  const [sources, setSources] = useState([])
  
  // Fetch sources based on selected language
  useEffect(() => {
    if (!selectedLanguage) {
      setSources([])
      return
    }
    
    // Fetch sources from backend based on language
    fetch(`http://localhost:3000/api/sources`)
      .then(response => response.json())
      .then(result => {
        if (result.success && result.data && result.data[selectedLanguage]) {
          const languageSources = result.data[selectedLanguage].sources || [];
          setSources(languageSources.map(source => ({
            id: source.id,
            label: source.name || source.id // Ensure we always have a label
          })));
        } else {
          throw new Error('Invalid response format or no sources for selected language');
        }
      })
      .catch(error => {
        console.error('Error fetching sources:', error)
        
        // Fallback sources if API fails
        if (selectedLanguage === 'english') {
          setSources([
            { id: 'the-hindu', label: 'The Hindu' },
            { id: 'indian-express', label: 'The Indian Express' },
            { id: 'hindustan-times', label: 'Hindustan Times' }
          ])
        } else if (selectedLanguage === 'kannada') {
          setSources([
            { id: 'prajavani', label: 'Prajavani' },
            { id: 'kannada-prabha', label: 'Kannada Prabha' }
          ])
        } else if (selectedLanguage === 'hindi') {
          setSources([
            { id: 'news18-hindi', label: 'News18 Hindi' },
            { id: 'live-hindustan', label: 'Live Hindustan' },
            { id: 'aaj-tak', label: 'Aaj Tak' }
          ])
        }
      })
  }, [selectedLanguage])
  
  const handleLanguageChange = (langId) => {
    setSelectedLanguage(langId)
    setSelectedSource(null)
  }
  
  const handleSourceChange = (sourceId) => {
    setSelectedSource(sourceId)
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        languages={languages}
        sources={sources}
        selectedLanguage={selectedLanguage}
        selectedSource={selectedSource}
        onLanguageChange={handleLanguageChange}
        onSourceChange={handleSourceChange}
      />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-center flex-1">
            {selectedSource ? sources.find(s => s.id === selectedSource)?.label : 'News Aggregator'}
          </h1>
          <div className="w-6"></div> {/* Empty div for balance */}
        </header>
        
        <main>
          <NewsGrid news={news} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}

export default App