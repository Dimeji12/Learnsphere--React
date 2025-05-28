import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";


const ProductCard = ({ product, index, viewMode = "grid" }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: (index % (viewMode === 'grid' ? 4 : 1)) * 0.05 } },
  };
  
  const imageSrc = product.id % 2 === 0 ? "photo-1523275335684-37898b6baf30" : "photo-1505740420928-5e560c06d30e";


  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full h-full"
    >
      <Card className={`product-card-hover h-full flex group ${viewMode === 'list' ? 'flex-row items-stretch' : 'flex-col'}`}>
        <Link to={`/products/${product.id}`} className={`relative ${viewMode === 'list' ? 'w-1/3 md:w-1/4 aspect-square flex-shrink-0' : 'w-full aspect-[4/3]'} overflow-hidden ${viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'}`}>
          <img  
            alt={product.imageDescription}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          {product.new && <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs px-1.5 py-0.5">NEW</Badge>}
          {product.discount && <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5">{product.discount}% OFF</Badge>}
        </Link>
        <div className={`flex flex-col flex-grow ${viewMode === 'list' ? 'w-2/3 md:w-3/4' : ''}`}>
          <CardHeader className={`p-4 ${viewMode === 'list' ? 'pb-2' : ''}`}>
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            <Link to={`/products/${product.id}`}>
              <CardTitle className="text-base md:text-lg mb-1 leading-tight group-hover:text-primary transition-colors">{product.name}</CardTitle>
            </Link>
            {viewMode === 'grid' && (
              <p className="text-primary font-semibold text-lg md:text-xl">
                {formatPrice(product.price * (1 - (product.discount || 0) / 100))}
                {product.discount && (
                  <span className="text-xs md:text-sm text-muted-foreground line-through ml-2">{formatPrice(product.price)}</span>
                )}
              </p>
            )}
          </CardHeader>
          <CardContent className={`flex-grow p-4 ${viewMode === 'list' ? 'pt-0 pb-2' : 'pt-0'}`}>
            {viewMode === 'list' && (
              <>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.imageDescription}...</p>
                <p className="text-primary font-semibold text-lg md:text-xl mb-2">
                  {formatPrice(product.price * (1 - (product.discount || 0) / 100))}
                  {product.discount && (
                    <span className="text-xs md:text-sm text-muted-foreground line-through ml-2">{formatPrice(product.price)}</span>
                  )}
                </p>
              </>
            )}
            <div className="flex items-center gap-1 text-sm text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
              ))}
              <span className="text-muted-foreground ml-1 text-xs">({product.reviews} reviews)</span>
            </div>
          </CardContent>
          <CardFooter className={`p-4 ${viewMode === 'list' ? 'pt-0' : ''} flex gap-2`}>
            <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-sm h-9">
              <Link to={`/products/${product.id}`}>View Details</Link>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 border-primary text-primary hover:bg-primary/10"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;