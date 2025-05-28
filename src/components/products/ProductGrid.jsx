import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";

const ProductGrid = ({ products, viewMode }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 col-span-full">
        <img  alt="No products found illustration" className="w-52 h-52 mx-auto mb-6 text-muted-foreground opacity-70" src="https://images.unsplash.com/photo-1696744404432-d829841194f4" />
        <h2 className="text-xl font-semibold mb-2 text-foreground">No Products Found</h2>
        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
      ))}
    </motion.div>
  );
};

export default ProductGrid;