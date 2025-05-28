import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';
import { useCourseContext } from '@/contexts/CourseContext';
import { BookOpen, CheckCircle, Award, Edit3, ArrowRight, PlayCircle } from 'lucide-react';

const CourseProgressCard = ({ course, progress, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="course-card h-full flex flex-col">
      <Link to={`/courses/${course.id}`} className="block group">
        <div className="course-card-image-wrapper">
          <img  
            alt={course.title} 
            className="course-card-image"
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <p className="text-xs text-muted-foreground mb-1">{course.category}</p>
        <div className="flex items-center gap-2 mb-2">
          <Progress value={progress} className="w-full h-2" />
          <span className="text-sm font-medium text-primary">{progress}%</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{course.shortDescription}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to={`/courses/${course.id}`}>
            {progress === 100 ? 'Review Course' : 'Continue Learning'} <PlayCircle className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const UserDashboardPage = () => {
  const { currentUser } = useAuth();
  const { getEnrolledCoursesForUser, getCourseProgress } = useCourseContext();

  // Ensure currentUser is available before calling context functions
  const enrolledCourses = currentUser ? getEnrolledCoursesForUser(currentUser.id) : [];
  
  const coursesInProgress = enrolledCourses.filter(course => {
    const progress = currentUser ? getCourseProgress(course.id, currentUser.id) : 0;
    return progress < 100;
  });

  const completedCourses = enrolledCourses.filter(course => {
    const progress = currentUser ? getCourseProgress(course.id, currentUser.id) : 0;
    return progress === 100;
  });

  if (!currentUser) {
    return <p className="text-center text-lg text-primary">Loading dashboard...</p>; 
  }

  return (
    <div className="space-y-12">
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {currentUser.name}!</h1>
            <p className="text-muted-foreground mt-1">Let's continue your learning journey.</p>
          </div>
          <Button asChild variant="outline" className="mt-4 sm:mt-0">
            <Link to="/settings"><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary">Courses in Progress</CardTitle>
              <BookOpen className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{coursesInProgress.length}</div>
              <p className="text-xs text-muted-foreground">Keep up the great work!</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Completed Courses</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">Amazing achievements!</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-600">Certificates Earned</CardTitle>
              <Award className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{completedCourses.length}</div> {/* Assuming 1 cert per completed course */}
              <p className="text-xs text-muted-foreground">Showcase your new skills.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {coursesInProgress.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coursesInProgress.map((course, index) => (
              <CourseProgressCard 
                key={course.id} 
                course={course} 
                progress={currentUser ? getCourseProgress(course.id, currentUser.id) : 0}
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {completedCourses.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Completed Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {completedCourses.map((course, index) => (
              <CourseProgressCard 
                key={course.id} 
                course={course} 
                progress={100} 
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {enrolledCourses.length === 0 && (
         <section className="text-center py-12 bg-muted/30 rounded-lg">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Your learning adventure awaits!</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">You haven't enrolled in any courses yet. Explore our catalog and find something that sparks your interest.</p>
            <Button asChild size="lg">
              <Link to="/courses">Browse Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </section>
      )}
    </div>
  );
};

export default UserDashboardPage;