import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Users, PlayCircle, Award } from 'lucide-react';
import { useCourseContext } from '@/contexts/CourseContext';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card p-6 rounded-lg shadow-md text-center"
  >
    <div className="inline-block p-3 bg-primary/10 text-primary rounded-full mb-4">
      {React.cloneElement(icon, { className: "h-8 w-8" })}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </motion.div>
);

const CourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="course-card h-full flex flex-col"
    >
      <Link to={`/courses/${course.id}`} className="block group">
        <div className="course-card-image-wrapper">
          <img  
            alt={course.title} 
            className="course-card-image"
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25saW5lJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
          />
        </div>
        <CardHeader className="p-4">
          {course.category && <Badge variant="secondary" className="mb-2">{course.category}</Badge>}
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{course.shortDescription}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5 mr-1.5" /> {course.enrollmentCount} students
          <span className="mx-1.5">·</span>
          <PlayCircle className="h-3.5 w-3.5 mr-1.5" /> {course.lessons.length} lessons
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="link" className="text-primary p-0 h-auto">
          <Link to={`/courses/${course.id}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </motion.div>
  );
};


const HomePage = () => {
  const { courses } = useCourseContext();
  const featuredCourses = courses.slice(0, 3); // Show first 3 courses as featured

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge variant="outline" className="py-1 px-3 text-sm border-primary text-primary mb-4">
            Unlock Your Potential
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Learn <span className="hero-gradient-text">Anything</span>, Anytime, Anywhere.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore thousands of courses taught by industry experts. Achieve your personal and professional goals with LearnSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link to="/signup">Get Started Free</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div 
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <img  
            alt="Diverse group of students learning online" 
            className="rounded-xl shadow-2xl mx-auto max-w-4xl w-full"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b25saW5lJTIwbGVhcm5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=80"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Why Choose LearnSphere?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">We provide the best tools and resources for your learning success.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FeatureCard icon={<BookOpen />} title="Expert Instructors" description="Learn from industry professionals with real-world experience." delay={0.1} />
          <FeatureCard icon={<PlayCircle />} title="Flexible Learning" description="Access courses on any device, anytime, at your own pace." delay={0.2} />
          <FeatureCard icon={<Users />} title="Community Support" description="Connect with fellow learners and instructors for help and motivation." delay={0.3} />
          <FeatureCard icon={<Award />} title="Certificates" description="Earn certificates upon course completion to showcase your skills." delay={0.4} />
        </div>
      </section>

      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && (
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Featured Courses</h2>
            <p className="text-muted-foreground text-lg">Start your learning journey with our most popular courses.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link to="/courses">View All Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      )}
      
      {/* Call to Action Section */}
      <section className="bg-primary text-primary-foreground p-8 md:p-16 rounded-xl text-center shadow-xl">
        <motion.h2 
          initial={{ opacity:0, y:20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration: 0.6}}
          viewport={{once: true}}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Start Learning?
        </motion.h2>
        <motion.p 
          initial={{ opacity:0, y:20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration: 0.6, delay:0.2}}
          viewport={{once: true}}
          className="text-lg md:text-xl max-w-xl mx-auto mb-8"
        >
          Join thousands of learners who are achieving their goals with LearnSphere. Sign up today and get access to a world of knowledge.
        </motion.p>
        <motion.div
          initial={{ opacity:0, y:20}} 
          whileInView={{opacity:1, y:0}} 
          transition={{duration: 0.6, delay:0.4}}
          viewport={{once: true}}
        >
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base">
            <Link to="/signup">Sign Up for Free</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;