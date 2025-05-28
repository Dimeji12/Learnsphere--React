
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BarChart2, PieChart, Settings, Users, FileText, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/audience', label: 'Audience', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const NavLink = ({ item }) => (
    <Link
      to={item.href}
      onClick={() => setSidebarOpen(false)}
      className={cn(
        "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        location.pathname === item.href
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="mr-3 h-5 w-5" />
      {item.label}
    </Link>
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? '0%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col border-r bg-card p-4 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          { 'translate-x-0': sidebarOpen }
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Zap className="h-7 w-7" />
            <span>DataDash</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="mt-auto">
          <div className="p-3 bg-muted/50 rounded-lg text-center">
            <p className="text-sm font-semibold text-foreground">Upgrade to Pro</p>
            <p className="text-xs text-muted-foreground mt-1 mb-3">Unlock all features and get unlimited insights.</p>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">Upgrade Now</Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
