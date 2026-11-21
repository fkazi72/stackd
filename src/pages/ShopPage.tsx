import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Sparkles, X, Layers, ArrowUpDown } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES = [
  { id: 'all', label: 'All Goodies' },
  { id: 'blind-boxes', label: 'Mystery Blind Boxes' },
  { id: 'figures', label: 'Vinyl Figures' },
  { id: 'plushies', label: 'Stackable Plushies' },
  { id: 'drinkware', label: 'Insulated Tumblers' },
  { id: 'desk-tech', label: 'Desk Setup & Tech' },
  { id: 'stationery', label: 'Stationery & Stickers' },
];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<'all' | 'under-25' | '25-50' | 'above-50'>('all');

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setPriceRange('all');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchesTag = product.tags.some(t => t.toLowerCase().includes(query));
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesTag && !matchesDesc) {
          return false;
        }
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Price filter
      if (priceRange === 'under-25' && product.price >= 25) return false;
      if (priceRange === '25-50' && (product.price < 25 || product.price > 50)) return false;
      if (priceRange === 'above-50' && product.price <= 50) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });
  }, [selectedCategory, searchQuery, inStockOnly, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-pink-50 to-amber-50 rounded-4xl p-6 sm:p-10 border border-amber-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white text-[#2756E8] text-xs font-heading font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>The Complete Collection</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900">
            Shop All Stacks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
            Mix and match tactile 3D collectibles, mystery blind boxes, modular organizers, and accessories.
          </p>
        </div>

        {/* Stack & Save teaser button */}
        <Link
          to="/stack-builder"
          className="btn-3d btn-3d-yellow px-6 py-3 rounded-2xl font-heading font-extrabold text-sm flex items-center space-x-2 shadow-md flex-shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>Build Custom Stack (-20%)</span>
        </Link>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-full font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-xs ${
              selectedCategory === cat.id
                ? 'bg-[#2756E8] text-white shadow-md scale-102'
                : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-[#2756E8] border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Controls Bar: Search, Price, Stock & Sort */}
      <div className="bg-white p-4 rounded-3xl border border-amber-100 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left: Search input */}
        <div className="w-full lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within products..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
          />
        </div>

        {/* Middle: Price filter options */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">Price:</span>
          {(['all', 'under-25', '25-50', 'above-50'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setPriceRange(range)}
              className={`px-3 py-1.5 rounded-xl border text-xs transition-colors ${
                priceRange === range
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {range === 'all' && 'Any'}
              {range === 'under-25' && '< $25'}
              {range === '25-50' && '$25 - $50'}
              {range === 'above-50' && '$50+'}
            </button>
          ))}
        </div>

        {/* Right: Sort and In-stock toggle */}
        <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end">
          
          <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#2756E8] focus:ring-[#2756E8]"
            />
            <span>In-stock only</span>
          </label>

          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
            >
              <option value="featured">Featured / Best</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active filters summary */}
      {(selectedCategory !== 'all' || searchQuery || inStockOnly || priceRange !== 'all') && (
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <span className="font-bold">Active filters:</span>
          {selectedCategory !== 'all' && (
            <span className="bg-blue-50 text-[#2756E8] px-2.5 py-1 rounded-full font-bold border border-blue-200">
              {CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </span>
          )}
          {searchQuery && (
            <span className="bg-pink-50 text-[#FF2E7E] px-2.5 py-1 rounded-full font-bold border border-pink-200">
              "{searchQuery}"
            </span>
          )}
          {inStockOnly && (
            <span className="bg-emerald-50 text-[#06D6A0] px-2.5 py-1 rounded-full font-bold border border-emerald-200">
              In Stock
            </span>
          )}
          {priceRange !== 'all' && (
            <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-200">
              Price: {priceRange}
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-slate-400 hover:text-rose-500 font-bold ml-2 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-amber-100 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto bg-amber-50 border-2 border-amber-200">
            <img
              src="/mascots/mascot-yellow.jpg"
              alt="Mascot looking confused"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-800">
            No matching items found
          </h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keywords or resetting the filters to view the full Stack'd catalog!
          </p>
          <button
            onClick={handleClearFilters}
            className="btn-3d btn-3d-blue px-6 py-2.5 rounded-2xl font-heading font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
