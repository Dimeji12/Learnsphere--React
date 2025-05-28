import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const FilterSectionUI = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="py-3">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center mb-2 px-1 text-sm hover:bg-muted">
        <p className="font-medium text-foreground">{title}</p>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      {isOpen && <div className="space-y-1.5 pl-2">{children}</div>}
      <Separator className="mt-3" />
    </div>
  );
};

const ProductFilters = ({
  categories,
  priceRanges,
  sortOptions,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRange,
  setSelectedPriceRange,
  sortOrder,
  setSortOrder,
  onClearFilters,
  onCloseMobileFilters,
  isMobile = false
}) => {
  return (
    <aside className="w-full lg:w-64 lg:sticky lg:top-28 space-y-4 h-fit p-4 border rounded-lg bg-card shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onCloseMobileFilters}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <Separator />
      <FilterSectionUI title="Category">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "ghost"}
            size="sm"
            className={`w-full justify-start text-xs ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </FilterSectionUI>

      <FilterSectionUI title="Price Range">
        {priceRanges.map(range => (
          <Button
            key={range.label}
            variant={selectedPriceRange.label === range.label ? "default" : "ghost"}
            size="sm"
            className={`w-full justify-start text-xs ${selectedPriceRange.label === range.label ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setSelectedPriceRange(range)}
          >
            {range.label}
          </Button>
        ))}
      </FilterSectionUI>

      <FilterSectionUI title="Sort By">
        {sortOptions.map(sort => (
          <Button
            key={sort.value}
            variant={sortOrder === sort.value ? "default" : "ghost"}
            size="sm"
            className={`w-full justify-start text-xs ${sortOrder === sort.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            onClick={() => setSortOrder(sort.value)}
          >
            {sort.label}
          </Button>
        ))}
      </FilterSectionUI>
      <Button size="sm" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </aside>
  );
};

export default ProductFilters;