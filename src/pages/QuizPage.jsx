import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCourseContext } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, XCircle, ChevronRight, RotateCcw, HelpCircle } from 'lucide-react';

// Mock quiz data - replace with data from CourseContext
const sampleQuiz = {
  id: "q1",
  title: "Introduction to React Quiz",
  questions: [
    {
      id: "q1_1",
      text: "What is JSX?",
      options: [
        { id: "opt1", text: "JavaScript XML" },
        { id: "opt2", text: "JavaScript Extension" },
        { id: "opt3", text: "Java Syntax Extension" },
        { id: "opt4", text: "JSON Syntax" },
      ],
      correctOptionId: "opt1",
    },
    {
      id: "q1_2",
      text: "Which hook is used to manage state in a functional component?",
      options: [
        { id: "opt5", text: "useEffect" },
        { id: "opt6", text: "useState" },
        { id: "opt7", text: "useContext" },
        { id: "opt8", text: "useReducer" },
      ],
      correctOptionId: "opt6",
    },
    {
      id: "q1_3",
      text: "What is the virtual DOM?",
      options: [
        { id: "opt9", text: "A direct representation of the actual DOM" },
        { id: "opt10", text: "A lightweight copy of the DOM in memory" },
        { id: "opt11", text: "A server-side DOM" },
        { id: "opt12", text: "A type of shadow DOM" },
      ],
      correctOptionId: "opt10",
    },
  ],
};

const QuizPage = () => {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  // const { getQuizById, submitQuizAttempt } = useCourseContext(); // TODO: Implement in context
  // const quiz = getQuizById(courseId, quizId) || sampleQuiz; // Use sampleQuiz for now
  const quiz = sampleQuiz; // Using sample quiz directly for now
  const { currentUser } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: optionId }
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question, submit quiz
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionId) {
        correctAnswers++;
      }
    });
    const calculatedScore = (correctAnswers / quiz.questions.length) * 100;
    setScore(calculatedScore);
    setShowResults(true);
    // if (currentUser) {
    //   submitQuizAttempt(courseId, quizId, currentUser.id, calculatedScore, selectedAnswers); // TODO
    // }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!quiz) {
    return (
      <div className="container-app py-12 text-center">
        <h1 className="text-2xl font-bold">Quiz Not Found</h1>
        <Button asChild className="mt-6"><Link to={`/courses/${courseId}`}>Back to Course</Link></Button>
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-8"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Quiz Results</CardTitle>
            <CardDescription>{quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className={`text-6xl font-bold ${score >= 70 ? 'text-green-500' : 'text-destructive'}`}>
              {score.toFixed(0)}%
            </div>
            <p className="text-xl">
              You answered {quiz.questions.filter(q => selectedAnswers[q.id] === q.correctOptionId).length} out of {quiz.questions.length} questions correctly.
            </p>
            {score >= 70 ? (
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="h-8 w-8 mr-2" />
                <p className="text-lg font-semibold">Congratulations! You passed!</p>
              </div>
            ) : (
              <div className="flex items-center justify-center text-destructive">
                <XCircle className="h-8 w-8 mr-2" />
                <p className="text-lg font-semibold">Keep trying! You can do better.</p>
              </div>
            )}
            {/* TODO: Add review answers section */}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRetakeQuiz} variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz</Button>
            <Button onClick={() => navigate(`/courses/${courseId}`)}>
              Back to Course <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-8"
    >
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <Link to={`/courses/${courseId}`} className="text-sm text-primary hover:underline">&larr; Back to Course</Link>
            <Badge variant="secondary">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</Badge>
          </div>
          <CardTitle className="text-2xl md:text-3xl">{quiz.title}</CardTitle>
          <Progress value={progressPercentage} className="w-full h-2 mt-3" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg font-semibold text-foreground mb-4 flex items-start">
              <HelpCircle className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" />
              {currentQuestion.text}
            </p>
            <RadioGroup 
              value={selectedAnswers[currentQuestion.id] || ""}
              onValueChange={(value) => handleOptionSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map(option => (
                <Label 
                  key={option.id} 
                  htmlFor={option.id}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all hover:border-primary
                    ${selectedAnswers[currentQuestion.id] === option.id ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'border-border'}`
                  }
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <span>{option.text}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion.id]}>
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizPage;