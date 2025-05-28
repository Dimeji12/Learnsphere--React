import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, ListFilter, LayoutGrid, LayoutList } from "lucide-react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";

const initialProducts = [
  { id: 1, name: "Aura Smartwatch", price: 299.99, category: "Electronics", rating: 4.5, reviews: 120, imageDescription: "Sleek smartwatch with vibrant display", new: true, discount: 10 },
  { id: 2, name: "Nebula Hoodie", price: 79.99, category: "Apparel", rating: 4.8, reviews: 250, imageDescription: "Comfortable hoodie with cosmic print", new: false, discount: null },
  { id: 3, name: "Terra Backpack", price: 129.99, category: "Accessories", rating: 4.2, reviews: 90, imageDescription: "Durable and stylish backpack", new: true, discount: null },
  { id: 4, name: "Kinetic Sneakers", price: 159.99, category: "Footwear", rating: 4.6, reviews: 180, imageDescription: "Modern sneakers with dynamic design", new: false, discount: 15 },
  { id: 5, name: "Nova Wireless Earbuds", price: 149.99, category: "Electronics", rating: 4.7, reviews: 300, imageDescription: "High-fidelity wireless earbuds", new: true, discount: 5 },
  { id: 6, name: "Strata T-Shirt", price: 39.99, category: "Apparel", rating: 4.3, reviews: 150, imageDescription: "Soft cotton t-shirt with minimalist design", new: false, discount: null },
  { id: 7, name: "Helios Sunglasses", price: 89.99, category: "Accessories", rating: 4.9, reviews: 220, imageDescription: "Polarized sunglasses with UV protection", new: true, discount: null },
  { id: 8, name: "Orion Gaming Mouse", price: 69.99, category: "Electronics", rating: 4.4, reviews: 110, imageDescription: "Ergonomic gaming mouse with RGB lighting", new: false, discount: 20 },
  { id: 9, name: "Cygnus Joggers", price: 64.99, category: "Apparel", rating: 4.5, reviews: 190, imageDescription: "Comfortable and stylish joggers for everyday wear", new: true, discount: null },
  { id: 10, name: "Vertex Water Bottle", price: 29.99, category: "Accessories", rating: 4.8, reviews: 280, imageDescription: "Insulated stainless steel water bottle", new: false, discount: null },
  { id: 11, name: "Solaris Desk Lamp", price: 59.99, category: "Home Goods", rating: 4.6, reviews: 150, imageDescription: "Adjustable LED desk lamp with multiple brightness levels", new: true, discount: null },
  { id: 12, name: "Lunar Throw Pillow", price: 24.99, category: "Home Goods", rating: 4.9, reviews: 320, imageDescription: "Soft velvet throw pillow with moon phase design", new: false, discount: 10 },
  { id: 13, name: "Echo Smart Speaker", price: 99.99, category: "Electronics", rating: 4.7, reviews: 500, imageDescription: "Voice-controlled smart speaker with premium sound", new: false, discount: null },
  { id: 14, name: "Zenith Yoga Mat", price: 49.99, category: "Fitness", rating: 4.8, reviews: 200, imageDescription: "Eco-friendly non-slip yoga mat", new: true, discount: null },
];

const categories = ["All", "Electronics", "Apparel", "Accessories", "Footwear", "Home Goods", "Fitness"];
const priceRanges = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];
const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortOrder, setSortOrder] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let tempProducts = [...initialProducts];

    if (searchTerm) {
      tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }
    tempProducts = tempProducts.filter(p => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max);

    switch (sortOrder) {
      case "price-asc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        tempProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        tempProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0) || b.id - a.id); // Prioritize new, then by ID as proxy for date
        break;
      default:
        break;
    }
    return tempProducts;
  }, [searchTerm, selectedCategory, selectedPriceRange, sortOrder]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedPriceRange(priceRanges[0]);
    setSortOrder("default");
  };

  return (
    <div className="container-app py-12 pt-28 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">Explore Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Find your perfect item from our wide range of high-quality products.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-sm">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pr-10 h-10 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowMobileFilters(true)}>
            <ListFilter className="h-4 w-4 mr-2" /> Filters
          </Button>
          <div className="flex items-center border rounded-md">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon-sm" onClick={() => setViewMode('grid')} aria-label="Grid view" className="h-9 w-9">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon-sm" onClick={() => setViewMode('list')} aria-label="List view" className="h-9 w-9">
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {showMobileFilters && (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setShowMobileFilters(false)}
        />
      )}
       <motion.div 
        initial={{x: "-100%"}}
        animate={{x: showMobileFilters ? "0%" : "-100%"}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs bg-background shadow-xl lg:hidden overflow-y-auto p-2"
      >
        {showMobileFilters && (
          <ProductFilters
            categories={categories}
            priceRanges={priceRanges}
            sortOptions={sortOptions}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onClearFilters={clearFilters}
            onCloseMobileFilters={() => setShowMobileFilters(false)}
            isMobile={true}
          />
        )}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block">
          <ProductFilters
            categories={categories}
            priceRanges={priceRanges}
            sortOptions={sortOptions}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onClearFilters={clearFilters}
          />
        </div>
        
        <main className="flex-1">
          <ProductGrid products={filteredProducts} viewMode={viewMode} />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;