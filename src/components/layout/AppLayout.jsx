import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container-app pt-20 md:pt-24 section-padding">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;