import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileQuestion, 
  Upload, 
  BarChart3, 
  Brain,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface DashboardProps {
  questionsCount: number;
  evaluationsCount: number;
  onNavigate: (tab: 'dashboard' | 'upload' | 'questions' | 'results') => void;
}

export function Dashboard({ questionsCount, evaluationsCount, onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'Total Questions',
      value: questionsCount,
      description: 'Questions in question bank',
      icon: FileQuestion,
      color: 'text-blue-600'
    },
    {
      title: 'Evaluations Completed',
      value: evaluationsCount,
      description: 'Answer sheets evaluated',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Average Processing Time',
      value: '2.3s',
      description: 'Per answer sheet',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Accuracy Rate',
      value: '94.5%',
      description: 'AI evaluation accuracy',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Add Questions',
      description: 'Create and manage evaluation questions',
      icon: FileQuestion,
      action: () => onNavigate('questions'),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Upload Answer Sheets',
      description: 'Upload student answer sheets for evaluation',
      icon: Upload,
      action: () => onNavigate('upload'),
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'View Results',
      description: 'Review evaluation results and analytics',
      icon: BarChart3,
      action: () => onNavigate('results'),
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">Evalpro</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AI-Powered Answer Sheet Evaluation Platform
        </p>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Streamline your grading process with advanced AI technology. Upload answer sheets, 
          manage questions, and get instant, accurate evaluations with detailed feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index} 
              className={`cursor-pointer transition-all hover:shadow-lg ${action.color}`}
              onClick={action.action}
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-6 w-6" />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to start evaluating answer sheets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <h4 className="font-medium">Create Questions</h4>
              <p className="text-sm text-muted-foreground">
                Add questions with expected answers and marking schemes
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <h4 className="font-medium">Upload Answer Sheets</h4>
              <p className="text-sm text-muted-foreground">
                Upload student answer sheets in supported formats (PDF, images)
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <h4 className="font-medium">Review Results</h4>
              <p className="text-sm text-muted-foreground">
                Get instant AI-powered evaluations with detailed feedback and scores
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}