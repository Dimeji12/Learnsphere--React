import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Star, ShoppingCart, Heart, Share2, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const allProducts = [
  { id: "1", name: "Aura Smartwatch", price: 299.99, category: "Electronics", rating: 4.5, reviews: 120, imageDescription: "Sleek smartwatch with vibrant display", new: true, discount: 10, description: "The Aura Smartwatch is your perfect companion for a connected and healthy lifestyle. Track your fitness, receive notifications, and make payments, all from your wrist. Features a stunning AMOLED display and long-lasting battery.", images: ["smartwatch_main_detail.jpg", "smartwatch_side_detail.jpg", "smartwatch_strap_detail.jpg"], stock: 15, colors: ["Midnight Black", "Silver Frost", "Rose Gold"], sizes: ["S/M", "M/L"], imgId: "smartwatch-detail" },
  { id: "2", name: "Nebula Hoodie", price: 79.99, category: "Apparel", rating: 4.8, reviews: 250, imageDescription: "Comfortable hoodie with cosmic print", new: false, discount: null, description: "Wrap yourself in the cosmos with our Nebula Hoodie. Made from ultra-soft cotton blend, this hoodie features a vibrant, all-over nebula print. Perfect for stargazers and dreamers.", images: ["hoodie_front_detail.jpg", "hoodie_back_detail.jpg", "hoodie_detail_fabric.jpg"], stock: 30, colors: ["Galaxy Purple", "Deep Space Blue"], sizes: ["S", "M", "L", "XL"], imgId: "hoodie-detail"},
  // Other products...
  { id: "3", name: "Terra Backpack", price: 129.99, category: "Accessories", rating: 4.2, reviews: 90, imageDescription: "Durable and stylish backpack for everyday use", new: true, discount: null, description: "The Terra Backpack is built for adventure. With multiple compartments, water-resistant fabric, and ergonomic design, it's ready for anything.", images: ["backpack_main_detail.jpg", "backpack_opened_detail.jpg", "backpack_on_model.jpg"], stock: 20, colors: ["Forest Green", "Charcoal Gray", "Desert Tan"], sizes: ["One Size"], imgId: "backpack-detail" },
  { id: "4", name: "Kinetic Sneakers", price: 159.99, category: "Footwear", rating: 4.6, reviews: 180, imageDescription: "Modern sneakers with dynamic design", new: false, discount: 15, description: "Experience ultimate comfort and style with Kinetic Sneakers. Featuring responsive cushioning and a breathable upper, these sneakers are perfect for your active lifestyle.", images: ["sneakers_pair_detail.jpg", "sneakers_sole_detail.jpg", "sneakers_lifestyle.jpg"], stock: 25, colors: ["Electric Blue", "Stealth Black", "Crimson Red"], sizes: ["8", "9", "10", "11", "12"], imgId: "sneakers-detail" },
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = allProducts.find(p => p.id === productId);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = React.useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="container-app py-12 pt-28 md:py-16 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-4">Sorry, the product you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="container-app py-12 pt-28 md:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
      >
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border shadow-lg">
            <img   
              alt={`${product.name} - view ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover transition-opacity duration-300"
             src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
             {product.images.length > 1 && (
              <>
                <Button size="icon" variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button size="icon" variant="outline" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80" onClick={nextImage} aria-label="Next image">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
             {product.new && <Badge className="absolute top-4 right-4" variant="accent">NEW</Badge>}
             {product.discount && <Badge className="absolute top-4 left-4" variant="destructive">{product.discount}% OFF</Badge>}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((imgKey, index) => ( 
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-muted'}`}
                >
                  <img  alt={`${product.name} thumbnail ${index+1}`} className="w-full h-full object-cover"  src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Link to={`/categories/${product.category.toLowerCase()}`} className="text-sm text-primary hover:underline">{product.category}</Link>
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
          </div>

          <div>
            <span className="text-3xl font-bold text-primary">{formatPrice(discountedPrice)}</span>
            {product.discount && (
              <span className="ml-3 text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          <Separator />

          {product.colors && (
            <div>
              <p className="text-sm font-medium mb-2">Color: <span className="text-muted-foreground">{selectedColor}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map(color => (
                  <Button 
                    key={color} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedColor(color)}
                    className={`capitalize ${selectedColor === color ? 'border-primary ring-2 ring-primary' : ''}`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div>
              <p className="text-sm font-medium mb-2">Size: <span className="text-muted-foreground">{selectedSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <Button 
                    key={size} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedSize(size)}
                    className={`uppercase ${selectedSize === size ? 'border-primary ring-2 ring-primary' : ''}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">Quantity:</p>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>-</Button>
              <span className="px-4 tabular-nums">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>+</Button>
            </div>
            <p className="text-sm text-muted-foreground">({product.stock} in stock)</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <MessageSquare className="mr-2 h-4 w-4" /> Ask a Question
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16"
      >
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">More Information</h2>
          <p>Detailed product information, specifications, and customer reviews will be displayed here using a Tabs component.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.filter(p => p.id !== productId && p.category === product.category).slice(0,4).map((relatedProduct, i) => (
             <div key={i} className="border rounded-lg p-4 group product-card-hover">
                <Link to={`/products/${relatedProduct.id}`}>
                  <div className="aspect-square bg-muted rounded-md mb-3 overflow-hidden">
                    <img  alt={relatedProduct.imageDescription} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" src="https://images.unsplash.com/photo-1676276376282-fe8118ee0afc" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-primary font-semibold">{formatPrice(relatedProduct.price)}</p>
                </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;