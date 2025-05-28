import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container-app flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 pt-24 md:pt-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-8" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-app py-12 pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Your Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} className="mt-4 lg:mt-0 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/50">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="flex flex-col sm:flex-row items-center p-4 gap-4 overflow-hidden">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                    <img  alt={item.name} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1689870917577-884cf905638f" />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/products/${item.id}`} className="hover:underline">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-primary font-bold mt-1">
                      {formatPrice(item.price * (1 - (item.discount || 0) / 100))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 my-2 sm:my-0">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center tabular-nums">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-semibold text-lg w-24 text-center sm:text-right">
                    {formatPrice(item.price * (1 - (item.discount || 0) / 100) * item.quantity)}
                  </p>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-28">
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal ({cartCount} items)</p>
                  <p>{formatPrice(cartTotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p>Calculated at checkout</p>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>{formatPrice(cartTotal)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;