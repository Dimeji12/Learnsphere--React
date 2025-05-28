import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import LessonPage from "@/pages/LessonPage";
import QuizPage from "@/pages/QuizPage";
import UserDashboardPage from "@/pages/UserDashboardPage";
import SettingsPage from "@/pages/SettingsPage"; 
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { AuthProvider, useAuth } from "@/contexts/AuthContext"; 
import { CourseProvider } from "@/contexts/CourseContext";
import { motion, AnimatePresence } from "framer-motion";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><p className="text-lg text-primary">Loading your learning journey...</p></div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppContent() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LoginPage />
          </motion.div>
        } />
        <Route path="/signup" element={
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <SignupPage />
          </motion.div>
        } />
        
        <Route element={<AppLayout />}>
          <Route path="/" element={
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <HomePage />
            </motion.div>
          } />
          <Route path="/courses" element={
            <motion.div key="courses" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <CoursesPage />
            </motion.div>
          } />
          <Route path="/courses/:courseId" element={
            <motion.div key="course-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <CourseDetailPage />
            </motion.div>
          } />
          <Route path="/courses/:courseId/lessons/:lessonId" element={
            <ProtectedRoute>
              <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <LessonPage />
              </motion.div>
            </ProtectedRoute>
          } />
           <Route path="/courses/:courseId/quizzes/:quizId" element={
            <ProtectedRoute>
              <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <QuizPage />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <motion.div key="user-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <UserDashboardPage />
              </motion.div>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <SettingsPage />
              </motion.div>
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={
          <motion.div key="notfound" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
             <NotFoundPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <AppContent />
          <Toaster />
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;