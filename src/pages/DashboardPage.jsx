
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import SampleBarChart from '@/components/charts/SampleBarChart';
import SampleLineChart from '@/components/charts/SampleLineChart';
import SamplePieChart from '@/components/charts/SamplePieChart';

const kpiData = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", icon: <DollarSign className="h-5 w-5 text-muted-foreground" /> },
  { title: "Active Users", value: "+2350", change: "+180.1% from last month", icon: <Users className="h-5 w-5 text-muted-foreground" /> },
  { title: "New Sales", value: "+12,234", change: "+19% from last month", icon: <CreditCard className="h-5 w-5 text-muted-foreground" /> },
  { title: "Performance", value: "98.5%", change: "+2.5% from last month", icon: <Activity className="h-5 w-5 text-muted-foreground" /> },
];

const DashboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>
      
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
        {kpiData.map((kpi, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="chart-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpi.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <SampleBarChart />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SampleLineChart />
        </motion.div>
      </motion.div>
      
      <motion.div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3" variants={containerVariants}>
        <motion.div variants={itemVariants} className="lg:col-span-1">
           <SamplePieChart />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="chart-card h-full">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activities</CardTitle>
              <CardDescription>Overview of recent user interactions and system events.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-foreground">User John Doe signed up.</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                    <span className="text-xs text-primary font-semibold">NEW</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
