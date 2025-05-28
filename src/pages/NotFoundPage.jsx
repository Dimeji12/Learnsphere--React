import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
      >
        <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-8" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10">
          Oops! The page you're looking for doesn't seem to exist. It might have been moved or you typed the address incorrectly.
        </p>
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/"><Home className="mr-2 h-5 w-5" /> Go to Homepage</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;