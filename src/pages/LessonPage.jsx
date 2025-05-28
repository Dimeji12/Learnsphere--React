import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseContext } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, FileText, MessageSquare, Download, ListChecks } from 'lucide-react';

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { getCourseById, getLessonById, completeLesson, getCourseProgress, isLessonCompleted } = useCourseContext();
  const { currentUser } = useAuth();

  const course = getCourseById(courseId);
  const lesson = getLessonById(courseId, lessonId);

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (currentUser && course) {
      setCurrentProgress(getCourseProgress(course.id, currentUser.id));
    }
  }, [course, currentUser, getCourseProgress, lessonId]);


  if (!course || !lesson) {
    return (
      <div className="container-app py-12 text-center">
        <h1 className="text-2xl font-bold">Lesson Not Found</h1>
        <p className="text-muted-foreground mt-2">This lesson might not exist or you may not have access.</p>
        <Button asChild className="mt-6">
          <Link to={courseId ? `/courses/${courseId}` : "/courses"}>Back to Course</Link>
        </Button>
      </div>
    );
  }

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;
  const isCompleted = currentUser ? isLessonCompleted(course.id, lesson.id, currentUser.id) : false;

  const handleCompleteLesson = () => {
    if (currentUser && !isCompleted) {
      completeLesson(course.id, lesson.id, currentUser.id);
      // Optionally navigate to next lesson or show completion message
      if (nextLesson) {
        navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      } else {
        // Last lesson, maybe navigate to course page or a "course completed" page
        navigate(`/courses/${courseId}`);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)] bg-background">
      {/* Main Content Area (Video Player + Tabs) */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumbs / Back to Course */}
          <Link to={`/courses/${courseId}`} className="text-sm text-primary hover:underline mb-4 inline-block">
            &larr; Back to {course.title}
          </Link>

          {/* Video Player Placeholder */}
          <div className="aspect-video bg-muted rounded-lg shadow-lg mb-6 flex items-center justify-center">
            {lesson.videoUrl ? (
              <video src={lesson.videoUrl} controls className="w-full h-full rounded-lg" poster={lesson.thumbnailUrl || "https://images.unsplash.com/photo-1526649661456-89c7ed4d00b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZpZGVvJTIwcGxheWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"} >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-center p-8">
                <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Video content for this lesson will appear here.</p>
              </div>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">{lesson.title}</h1>
          <p className="text-muted-foreground mb-6">{lesson.description || "Detailed content for this lesson."}</p>

          {/* Tabs for Overview, Resources, Q&A */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="overview"><FileText className="mr-2 h-4 w-4" />Overview</TabsTrigger>
              <TabsTrigger value="resources"><Download className="mr-2 h-4 w-4" />Resources</TabsTrigger>
              <TabsTrigger value="qna"><MessageSquare className="mr-2 h-4 w-4" />Q&A</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="py-4 text-muted-foreground leading-relaxed">
              {lesson.content || "This section will contain a detailed transcript or summary of the lesson, key takeaways, and any supplementary text-based information."}
            </TabsContent>
            <TabsContent value="resources" className="py-4">
              {lesson.resources && lesson.resources.length > 0 ? (
                <ul className="space-y-2">
                  {lesson.resources.map((res, i) => (
                    <li key={i} className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-primary" />
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{res.name}</a>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">No downloadable resources for this lesson.</p>}
            </TabsContent>
            <TabsContent value="qna" className="py-4">
              <p className="text-muted-foreground">Q&A section for this lesson. Students can ask questions and interact with the instructor and peers here.</p>
              {/* Placeholder for Q&A component */}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Sidebar (Course Outline + Progress) */}
      <aside className="w-full lg:w-80 xl:w-96 border-l border-border bg-card p-4 md:p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1 text-foreground">{course.title}</h2>
          <div className="flex items-center gap-2 mb-3">
            <Progress value={currentProgress} className="w-full h-2" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">{currentProgress}% done</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto pr-1 -mr-1 custom-scrollbar">
          <Accordion type="single" collapsible defaultValue={`module-${lesson.moduleId || '0'}`} className="w-full">
            {/* Group lessons by module if applicable, or list all */}
            {course.lessons.map((l, index) => (
              <AccordionItem value={`lesson-item-${l.id}`} key={l.id} className="border-b-0">
                 <Link 
                    to={`/courses/${courseId}/lessons/${l.id}`} 
                    className={`block w-full p-3 rounded-md transition-colors text-left
                      ${l.id === lessonId ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'}`
                    }
                  >
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex-grow pr-2">{index + 1}. {l.title}</span>
                    {currentUser && isLessonCompleted(course.id, l.id, currentUser.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <PlayCircle className={`h-5 w-5 flex-shrink-0 ${l.id === lessonId ? 'text-primary' : 'text-muted-foreground'}`} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{l.duration || '5min'}</p>
                </Link>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-auto pt-6 border-t border-border space-y-3">
           {!isCompleted && currentUser && (
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleCompleteLesson}>
              <CheckCircle className="mr-2 h-5 w-5" /> Mark as Completed
            </Button>
          )}
          {isCompleted && currentUser && (
             <div className="text-sm text-center text-green-600 font-medium p-2 bg-green-500/10 rounded-md flex items-center justify-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Lesson Completed!
            </div>
          )}
          <div className="flex justify-between gap-2">
            {prevLesson ? (
              <Button asChild variant="outline" className="flex-1">
                <Link to={`/courses/${courseId}/lessons/${prevLesson.id}`}><ChevronLeft className="mr-1 h-4 w-4" /> Previous</Link>
              </Button>
            ) : <div className="flex-1"></div>}
            {nextLesson ? (
              <Button asChild variant="outline" className="flex-1">
                <Link to={`/courses/${courseId}/lessons/${nextLesson.id}`}>Next <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            ) : <div className="flex-1"></div>}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default LessonPage;