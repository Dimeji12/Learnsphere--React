import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar, Edit3, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // You might need to install date-fns: npm install date-fns

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="container-app flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 pt-24 md:pt-28">
        <p>Loading profile...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 py-3 border-b border-border last:border-b-0">
      {React.cloneElement(icon, { className: "h-5 w-5 text-primary" })}
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="container-app py-12 pt-24 md:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
              <Button variant="outline" size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-3xl font-bold">{currentUser.name}</CardTitle>
            <CardDescription>Welcome to your ShopSphere profile!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoRow icon={<User />} label="Full Name" value={currentUser.name} />
            <InfoRow icon={<Mail />} label="Email Address" value={currentUser.email} />
            <InfoRow 
              icon={<Calendar />} 
              label="Joined On" 
              value={currentUser.joined ? format(new Date(currentUser.joined), "MMMM dd, yyyy") : 'N/A'} 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <Button variant="outline" className="w-full">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Order History
                </Button>
                <Button variant="outline" className="w-full">
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                </Button>
                <Button variant="outline" className="w-full">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                 <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfilePage;