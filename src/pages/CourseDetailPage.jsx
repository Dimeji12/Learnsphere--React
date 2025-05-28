import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCourseContext } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { PlayCircle, Lock, CheckCircle, Users, Clock, BarChart2, Star, MessageSquare, Share2, BookOpen } from 'lucide-react';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { getCourseById, enrollInCourse, isEnrolled, getCourseProgress } = useCourseContext();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const course = getCourseById(courseId);
  
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="text-muted-foreground mt-4">Sorry, the course you are looking for does not exist.</p>
        <Button asChild className="mt-8">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const enrolled = currentUser ? isEnrolled(course.id, currentUser.id) : false;
  const progress = enrolled && currentUser ? getCourseProgress(course.id, currentUser.id) : 0;

  const handleEnroll = () => {
    if (!currentUser) {
      navigate('/login?redirect=/courses/' + courseId); // Redirect to login if not authenticated
      return;
    }
    enrollInCourse(course.id, currentUser.id);
  };

  const handleStartOrContinueLearning = () => {
    // Find the first uncompleted lesson or the first lesson if none are completed
    const firstLessonId = course.lessons[0]?.id; // Simplified: just go to first lesson
    if (firstLessonId) {
      navigate(`/courses/${courseId}/lessons/${firstLessonId}`);
    }
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10 rounded-xl shadow-lg"
      >
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
          <div className="md:col-span-2">
            {course.category && <Badge variant="secondary" className="mb-2 text-sm">{course.category}</Badge>}
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 text-foreground">{course.title}</h1>
            <p className="text-base lg:text-lg text-muted-foreground mb-4">{course.shortDescription}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <span>Instructor: <span className="font-medium text-primary">{course.instructor}</span></span>
              <span className="flex items-center"><Users className="h-4 w-4 mr-1.5" /> {course.enrollmentCount} Students</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" /> {course.duration}</span>
              <span className="flex items-center"><BarChart2 className="h-4 w-4 mr-1.5" /> {course.skillLevel}</span>
            </div>
            {enrolled ? (
              <div className="space-y-3">
                <Button size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleStartOrContinueLearning}>
                  <PlayCircle className="mr-2 h-5 w-5" /> Continue Learning
                </Button>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-full sm:w-64 h-2.5" />
                  <span className="text-sm text-muted-foreground">{progress}% Complete</span>
                </div>
              </div>
            ) : (
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleEnroll}>
                Enroll Now {course.price > 0 ? `- $${course.price}` : '(Free)'}
              </Button>
            )}
          </div>
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <img  
              alt={course.title} 
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9ubGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" 
            />
          </div>
        </div>
      </motion.section>

      {/* Tabs for Overview, Curriculum, Reviews etc. */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                ${activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <Card>
            <CardHeader><CardTitle className="text-2xl">Course Overview</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{course.longDescription || "Detailed description of this course will be available here, covering learning objectives, target audience, and what students will achieve upon completion."}</p>
              <h3 className="text-xl font-semibold text-foreground pt-2">What you'll learn:</h3>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                {course.learningObjectives?.map((obj, i) => <li key={i}>{obj}</li>) || <li>Key skills and knowledge points.</li>}
              </ul>
              <h3 className="text-xl font-semibold text-foreground pt-2">Requirements:</h3>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                 {course.requirements?.map((req, i) => <li key={i}>{req}</li>) || <li>Basic understanding of related concepts.</li>}
              </ul>
            </CardContent>
          </Card>
        )}

        {activeTab === 'curriculum' && (
          <Card>
            <CardHeader><CardTitle className="text-2xl">Course Curriculum</CardTitle></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.lessons.length > 0 ? course.lessons.map((lesson, index) => (
                  <AccordionItem value={`item-${index}`} key={lesson.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-left">{index + 1}. {lesson.title}</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          {lesson.duration && <span className="mr-3">{lesson.duration}</span>}
                          {enrolled || lesson.isFreePreview ? <PlayCircle className="h-5 w-5 text-secondary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {lesson.description || "Brief description of this lesson's content."}
                      {(enrolled || lesson.isFreePreview) && (
                        <Button asChild variant="link" size="sm" className="mt-2 p-0 h-auto text-primary">
                          <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
                            {enrolled && lesson.completed ? <CheckCircle className="h-4 w-4 mr-1.5 text-green-500"/> : <PlayCircle className="h-4 w-4 mr-1.5"/>}
                            {enrolled && lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                          </Link>
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )) : <p className="text-muted-foreground">Curriculum details are being updated. Please check back soon!</p>}
              </Accordion>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'instructor' && (
          <Card>
            <CardHeader><CardTitle className="text-2xl">About the Instructor</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={course.instructorImage || "https://images.unsplash.com/photo-1580894732444-8ec5338ye"} alt={course.instructor} />
                  <AvatarFallback>{course.instructor?.charAt(0) || 'I'}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-primary">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructorTitle || "Lead Instructor"}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{course.instructorBio || "The instructor's detailed bio, experience, and qualifications will be listed here."}</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reviews' && (
          <Card>
            <CardHeader><CardTitle className="text-2xl">Student Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {/* Placeholder for reviews */}
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No reviews yet. Be the first to review this course!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Share and More Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" /> Ask a Question</Button>
        </div>
        <Link to="/courses" className="text-sm text-primary hover:underline flex items-center">
          <BookOpen className="mr-2 h-4 w-4" /> Browse More Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseDetailPage;