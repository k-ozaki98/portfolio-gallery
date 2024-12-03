// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.js';
import PortfolioCard from './components/PortfolioCard.js';
import PortfolioForm from './components/PortfolioForm.js';
import './App.css';


function App() {
  const [portfolios, setPortfolios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/portfolios'); 
      const data = await response.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  const handleSubmit = async (portfolioData) => {
    try {
      const response = await fetch('http://localhost:8080/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPortfolios();
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
    }
  };

  const filteredPortfolios = portfolios.filter((portfolio) => 
    portfolio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            ポートフォリオギャラリー
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            投稿する
          </button>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>

        {isModalOpen && (
          <PortfolioForm 
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;