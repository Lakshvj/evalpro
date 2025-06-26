import React, { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Dashboard } from '@/components/dashboard';
import { UploadSection } from '@/components/upload-section';
import { QuestionManager } from '@/components/question-manager';
import { EvaluationResults } from '@/components/evaluation-results';
import { Toaster } from '@/components/ui/sonner';

export interface Question {
  id: string;
  text: string;
  expectedAnswer: string;
  marks: number;
  type: 'short' | 'long' | 'mcq';
}

export interface StudentAnswer {
  questionId: string;
  answer: string;
  marks: number;
  feedback: string;
  confidence: number;
}

export interface EvaluationResult {
  studentId: string;
  studentName: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  answers: StudentAnswer[];
  evaluatedAt: Date;
}

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'questions' | 'results'>('dashboard');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResult[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    if (questions.length === 0) {
      throw new Error('Please add questions before uploading answer sheets');
    }

    setIsEvaluating(true);
    
    try {
      // Simulate AI evaluation process
      const results: EvaluationResult[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const studentName = file.name.replace(/\.[^/.]+$/, "");
        
        // Simulate evaluation for each question
        const answers: StudentAnswer[] = questions.map(question => {
          const randomScore = Math.random();
          const marks = Math.round(randomScore * question.marks);
          
          return {
            questionId: question.id,
            answer: `Student's answer for: ${question.text}`,
            marks,
            feedback: marks >= question.marks * 0.7 
              ? "Good understanding demonstrated" 
              : marks >= question.marks * 0.4 
                ? "Partial understanding, needs improvement" 
                : "Requires significant improvement",
            confidence: Math.round(randomScore * 100)
          };
        });

        const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
        const obtainedMarks = answers.reduce((sum, a) => sum + a.marks, 0);
        
        results.push({
          studentId: `STU${String(i + 1).padStart(3, '0')}`,
          studentName,
          totalMarks,
          obtainedMarks,
          percentage: Math.round((obtainedMarks / totalMarks) * 100),
          answers,
          evaluatedAt: new Date()
        });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setEvaluationResults(prev => [...prev, ...results]);
      setActiveTab('results');
    } finally {
      setIsEvaluating(false);
    }
  };

  const addQuestion = (question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString()
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="evalpro-theme">
      <div className="min-h-screen bg-background">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8">
          {activeTab === 'dashboard' && (
            <Dashboard 
              questionsCount={questions.length}
              evaluationsCount={evaluationResults.length}
              onNavigate={setActiveTab}
            />
          )}
          
          {activeTab === 'upload' && (
            <UploadSection 
              onFileUpload={handleFileUpload}
              isEvaluating={isEvaluating}
              questionsCount={questions.length}
            />
          )}
          
          {activeTab === 'questions' && (
            <QuestionManager
              questions={questions}
              onAddQuestion={addQuestion}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
            />
          )}
          
          {activeTab === 'results' && (
            <EvaluationResults results={evaluationResults} />
          )}
        </main>
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;