import React from 'react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { 
  LayoutDashboard, 
  Upload, 
  FileQuestion, 
  BarChart3,
  Brain
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'upload' | 'questions' | 'results';
  onTabChange: (tab: 'dashboard' | 'upload' | 'questions' | 'results') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'questions' as const, label: 'Questions', icon: FileQuestion },
    { id: 'upload' as const, label: 'Upload', icon: Upload },
    { id: 'results' as const, label: 'Results', icon: BarChart3 },
  ];

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">Evalpro</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}