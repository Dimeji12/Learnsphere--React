import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, CreditCard, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SettingsPage = () => {
  const { currentUser } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and learning experience.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <TabsTrigger value="profile"><User className="mr-2 h-4 w-4 inline-block" />Profile</TabsTrigger>
          <TabsTrigger value="account"><Shield className="mr-2 h-4 w-4 inline-block" />Account</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4 inline-block" />Notifications</TabsTrigger>
          <TabsTrigger value="learning"><GraduationCap className="mr-2 h-4 w-4 inline-block" />Learning</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="mr-2 h-4 w-4 inline-block" />Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This information will be displayed publicly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={currentUser?.name || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="yourusername" defaultValue={currentUser?.username || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us a bit about yourself" defaultValue={currentUser?.bio || ''} />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture URL</Label>
                  <Input id="profilePicture" placeholder="https://example.com/image.png" defaultValue={currentUser?.photoURL || ''} />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your login and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={currentUser?.email || ''} disabled />
                  <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
                </div>
                <Separator />
                 <div>
                    <Label>Change Password</Label>
                    <div className="space-y-3 mt-2">
                        <Input id="currentPassword" type="password" placeholder="Current Password" />
                        <Input id="newPassword" type="password" placeholder="New Password" />
                        <Input id="confirmNewPassword" type="password" placeholder="Confirm New Password" />
                    </div>
                 </div>
            </CardContent>
             <CardFooter className="border-t pt-6">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Notification settings (e.g., email toggles for course updates, new messages, promotions) will be available here.</p>
              {/* Placeholder for notification toggles */}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize your learning experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Learning preferences (e.g., video playback speed, auto-play next lesson, download quality) will be available here.</p>
              {/* Placeholder for learning preference settings */}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscriptions</CardTitle>
              <CardDescription>Manage your payment methods and subscriptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Billing information (e.g., current plan, payment history, update payment method, invoices) will be available here.</p>
              {/* Placeholder for billing details */}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button variant="outline">Manage Subscription</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SettingsPage;