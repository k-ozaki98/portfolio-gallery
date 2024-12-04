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
  const [filters, setFilters] = useState({
    keyword: '',
    industry: '',
    experience: '',
    color: ''
  });

  // いいね機能ハンドラー
  const handleLike = async(portfolioId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/portfolios/${portfolioId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response.ok) {
        fetchPortfolios();
      }
    } catch(error) {
      console.error('いいねエラー', error);
    }
  }

  // コメント機能ハンドラー
  const handleComment = async (portfolioId, content) => {
    try {
      const response = await fetch(`http://localhost:3001/api/portfolios/${portfolioId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), 
      });

      if (response.ok) {
        fetchPortfolios();
      }
    } catch(error) {
      console.error('コメントエラー', error);
    }
  }

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      // const response = await fetch('http://localhost:8080/api/portfolios'); 
      const response = await fetch('http://localhost:3001/api/portfolios'); 
      const data = await response.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  const handleSubmit = async (portfolioData) => {
    try {
      const response = await fetch('http://localhost:3001/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });
      // const response = await fetch('http://localhost:8080/api/portfolios', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(portfolioData),
      // });

      if (response.ok) {
        setIsModalOpen(false);
        fetchPortfolios();
      }
    } catch (error) {
      console.error('Error creating portfolio:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }

  const filteredPortfolios = portfolios.filter(portfolio =>  {
    // キーワード検索
    const matchesKeyword = filters.keyword === '' ||
      portfolio.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      portfolio.description.toLowerCase().includes(filters.keyword.toLowerCase());

    // 業界フィルター
    const matchesIndustry = filters.industry === '' || portfolio.industry === filters.industry;

    // 経験年数
    const matchesExperience = filters.experience === '' || portfolio.experience === filters.experience;

    // カラーフィルター
    const matchesColor = filters.color === '' || portfolio.color === filters.color;

    return matchesKeyword && matchesIndustry && matchesExperience && matchesColor; 
      
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">サイトギャラリー</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            投稿する
          </button>
        </div>

        <SearchBar
          value={filters.keyword}
          onChange={(value) => handleFilterChange("keyword", value)}
          onFilterChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} onLike={handleLike} onComment={handleComment} />
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