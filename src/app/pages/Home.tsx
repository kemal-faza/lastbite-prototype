import { useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { AIRecommendation } from '../components/AIRecommendation';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <div className="px-4 pt-4 pb-6 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <AIRecommendation />
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <ProductGrid selectedCategory={selectedCategory} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
