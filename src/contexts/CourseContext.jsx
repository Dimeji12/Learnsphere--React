import React, { createContext, useState, useEffect, useContext } from 'react';

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

// Sample Data - In a real app, this would come from an API / Supabase
const sampleCourses = [
  {
    id: "react-basics",
    title: "React Fundamentals: From Zero to Hero",
    shortDescription: "Master the core concepts of React, including components, state, props, and hooks.",
    longDescription: "This comprehensive course covers everything you need to start building modern web applications with React. We'll explore JSX, component lifecycle, state management with useState and useReducer, handling events, conditional rendering, lists and keys, and essential hooks like useEffect and useContext. By the end, you'll be able to create dynamic and interactive user interfaces.",
    category: "Web Development",
    instructor: "Jane Doe",
    instructorTitle: "Senior Frontend Developer",
    instructorBio: "Jane has over 10 years of experience building scalable web applications and is passionate about teaching React.",
    instructorImage: "https://images.unsplash.com/photo-1580894732444-8ec5338ye",
    price: 49.99,
    duration: "10 hours",
    skillLevel: "Beginner",
    enrollmentCount: 1250,
    rating: 4.7,
    createdAt: "2024-03-10T10:00:00Z",
    isNew: true,
    learningObjectives: [
      "Understand React's component-based architecture.",
      "Manage application state effectively using hooks.",
      "Build reusable UI components.",
      "Fetch and display data from APIs.",
      "Implement client-side routing with React Router."
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and JavaScript (ES6+).",
      "A code editor (e.g., VS Code).",
      "Node.js and npm installed."
    ],
    lessons: [
      { id: "l1", title: "Introduction to React & JSX", duration: "15min", videoUrl: null, content: "Learn what React is and how JSX makes writing UI intuitive.", isFreePreview: true, completed: false },
      { id: "l2", title: "Components, Props, and State", duration: "25min", videoUrl: null, content: "Dive into the core building blocks: components, how to pass data with props, and manage local state.", completed: false },
      { id: "l3", title: "Handling Events & Conditional Rendering", duration: "20min", videoUrl: null, content: "Understand how to make your components interactive and render UI dynamically.", completed: false },
      { id: "l4", title: "useEffect Hook for Side Effects", duration: "30min", videoUrl: null, content: "Master the useEffect hook for data fetching, subscriptions, and more.", completed: false },
    ],
    quizzes: [{ id: "q1", title: "React Basics Quiz" }]
  },
  {
    id: "python-data-science",
    title: "Python for Data Science & Machine Learning Bootcamp",
    shortDescription: "Learn Python for data analysis, visualization, and machine learning with hands-on projects.",
    longDescription: "This bootcamp takes you from Python basics to advanced data science techniques. You'll learn NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, and work on real-world datasets to build predictive models. Topics include data cleaning, feature engineering, model evaluation, and an introduction to deep learning.",
    category: "Data Science",
    instructor: "John Smith",
    instructorTitle: "Lead Data Scientist",
    instructorBio: "John is a data science expert with a knack for explaining complex topics simply. He has worked on numerous ML projects.",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    price: 79.99,
    duration: "25 hours",
    skillLevel: "Intermediate",
    enrollmentCount: 3400,
    rating: 4.9,
    createdAt: "2024-02-15T10:00:00Z",
    isNew: false,
    learningObjectives: [
        "Master Python programming for data manipulation.",
        "Perform data analysis and visualization using Pandas and Matplotlib/Seaborn.",
        "Implement machine learning algorithms with Scikit-learn.",
        "Understand the end-to-end data science workflow.",
        "Build a portfolio of data science projects."
    ],
    requirements: [
        "Basic programming concepts are helpful but not strictly required.",
        "A computer with internet access.",
        "Anaconda or Python 3 installed."
    ],
    lessons: [
      { id: "pyl1", title: "Python Crash Course", duration: "45min", videoUrl: null, content: "Get up to speed with Python syntax and fundamental concepts.", isFreePreview: true, completed: false },
      { id: "pyl2", title: "NumPy for Numerical Data", duration: "35min", videoUrl: null, content: "Learn to work with arrays and matrices efficiently using NumPy.", completed: false },
      { id: "pyl3", title: "Data Analysis with Pandas", duration: "60min", videoUrl: null, content: "Master DataFrames for data cleaning, manipulation, and analysis.", completed: false },
    ],
    quizzes: [{ id: "pq1", title: "Python Fundamentals Quiz" }]
  },
  {
    id: "graphic-design-masterclass",
    title: "Graphic Design Masterclass: Learn Adobe Creative Suite",
    shortDescription: "Become a pro graphic designer using Photoshop, Illustrator, and InDesign.",
    category: "Design",
    instructor: "Alice Brown",
    instructorTitle: "Creative Director",
    instructorBio: "Alice is an award-winning designer with extensive experience in branding and digital art.",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    price: 60.00,
    duration: "18 hours",
    skillLevel: "All Levels",
    enrollmentCount: 2100,
    rating: 4.6,
    createdAt: "2024-04-01T10:00:00Z",
    isNew: true,
    learningObjectives: ["Master Adobe Photoshop, Illustrator, and InDesign.", "Understand design principles and typography.", "Create professional logos, illustrations, and layouts."],
    requirements: ["Access to Adobe Creative Suite (Photoshop, Illustrator, InDesign).", "No prior design experience needed."],
    lessons: [
      { id: "gdl1", title: "Photoshop Fundamentals", duration: "50min", videoUrl: null, content: "Introduction to Photoshop interface and basic tools.", isFreePreview: true, completed: false },
      { id: "gdl2", title: "Illustrator for Vector Graphics", duration: "55min", videoUrl: null, content: "Learn vector art creation with Illustrator.", completed: false },
    ],
    quizzes: [{ id: "gq1", title: "Design Principles Quiz" }]
  }
];

const sampleCategories = [
    { id: "cat1", name: "Web Development" },
    { id: "cat2", name: "Data Science" },
    { id: "cat3", name: "Design" },
    { id: "cat4", name: "Business" },
    { id: "cat5", name: "Marketing" },
];


export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userProgress, setUserProgress] = useState({}); // { userId: { courseId: { lessonId: completed_boolean, ... }, progressPercentage: X } }
  const [enrolledCoursesMap, setEnrolledCoursesMap] = useState({}); // { userId: [courseId1, courseId2] }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      setCourses(sampleCourses);
      setCategories(sampleCategories);
      // Load user progress and enrollments from localStorage
      const storedProgress = localStorage.getItem('userCourseProgress');
      if (storedProgress) setUserProgress(JSON.parse(storedProgress));
      const storedEnrollments = localStorage.getItem('userEnrolledCourses');
      if (storedEnrollments) setEnrolledCoursesMap(JSON.parse(storedEnrollments));
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    localStorage.setItem('userCourseProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('userEnrolledCourses', JSON.stringify(enrolledCoursesMap));
  }, [enrolledCoursesMap]);

  const getCourseById = (courseId) => courses.find(c => c.id === courseId);
  
  const getLessonById = (courseId, lessonId) => {
    const course = getCourseById(courseId);
    return course?.lessons.find(l => l.id === lessonId);
  };

  const enrollInCourse = (courseId, userId) => {
    setEnrolledCoursesMap(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), courseId]
    }));
    // Initialize progress for the course
    setUserProgress(prev => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [courseId]: { progressPercentage: 0 }
      }
    }));
  };

  const isEnrolled = (courseId, userId) => {
    return enrolledCoursesMap[userId]?.includes(courseId) || false;
  };
  
  const getEnrolledCoursesForUser = (userId) => {
    const enrolledIds = enrolledCoursesMap[userId] || [];
    return courses.filter(course => enrolledIds.includes(course.id));
  };

  const calculateCourseProgress = (courseId, userId) => {
    const course = getCourseById(courseId);
    if (!course || !userProgress[userId] || !userProgress[userId][courseId]) return 0;

    const courseLessonsStatus = userProgress[userId][courseId];
    const completedLessonsCount = Object.values(courseLessonsStatus).filter(status => status === true).length;
    
    return course.lessons.length > 0 ? Math.round((completedLessonsCount / course.lessons.length) * 100) : 0;
  };

  const completeLesson = (courseId, lessonId, userId) => {
    setUserProgress(prev => {
      const updatedUserProgress = {
        ...prev,
        [userId]: {
          ...(prev[userId] || {}),
          [courseId]: {
            ...(prev[userId]?.[courseId] || {}),
            [lessonId]: true,
          }
        }
      };
      // Recalculate overall course progress
      updatedUserProgress[userId][courseId].progressPercentage = calculateCourseProgressForUpdate(courseId, updatedUserProgress[userId][courseId]);
      return updatedUserProgress;
    });
  };
  
  // Helper for completeLesson to avoid state lag in calculation
  const calculateCourseProgressForUpdate = (courseId, courseLessonsStatus) => {
    const course = getCourseById(courseId);
    if (!course) return 0;
    const completedLessonsCount = Object.keys(courseLessonsStatus)
      .filter(key => key !== 'progressPercentage' && courseLessonsStatus[key] === true)
      .length;
    return course.lessons.length > 0 ? Math.round((completedLessonsCount / course.lessons.length) * 100) : 0;
  };


  const isLessonCompleted = (courseId, lessonId, userId) => {
    return userProgress[userId]?.[courseId]?.[lessonId] === true;
  };

  const getCourseProgress = (courseId, userId) => {
    return userProgress[userId]?.[courseId]?.progressPercentage || 0;
  };


  const value = {
    courses,
    categories,
    loading,
    getCourseById,
    getLessonById,
    enrollInCourse,
    isEnrolled,
    getEnrolledCoursesForUser,
    completeLesson,
    isLessonCompleted,
    getCourseProgress,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};