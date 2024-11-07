import React, { useState } from 'react';
import { BarChart3, Medal, TrendingUp, Award, Users, Map, UsersRound, Flag, Calendar, Home, LayoutDashboard, Book, MessageCircle } from 'lucide-react';
import { Statistics } from './Statistics';
import { ProgressTracking } from './ProgressTracking';
import { PersonalRecords } from './PersonalRecords';
import { AchievementBadges } from './AchievementBadges';
import { DetailedProgress } from './DetailedProgress';
import { Feed } from './Feed';
import { RoutePlanning } from './RoutePlanning';
import { Groups } from './Groups';
import { Teams } from './Teams';
import { Events } from './Events';
import { DashboardPage } from '../pages/DashboardPage';
import { TrainingPlans } from './TrainingPlans';
import { QandA } from './QandA';
import { TrendingPage } from './TrendingPage';

interface TabProps {
  id: string;
  label: string;
  icon: React.ElementType;
  category: 'main' | 'social' | 'training';
}

const tabs: TabProps[] = [
  // Main Category
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'main' },
  { id: 'overview', label: 'Overview', icon: BarChart3, category: 'main' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, category: 'main' },
  { id: 'records', label: 'Records', icon: Medal, category: 'main' },
  { id: 'achievements', label: 'Achievements', icon: Award, category: 'main' },
  { id: 'routes', label: 'Routes', icon: Map, category: 'main' },
  
  // Social Category
  { id: 'feed', label: 'Social Feed', icon: Home, category: 'social' },
  { id: 'trending', label: 'Trending', icon: TrendingUp, category: 'social' },
  { id: 'groups', label: 'Groups', icon: UsersRound, category: 'social' },
  { id: 'teams', label: 'Teams', icon: Flag, category: 'social' },
  { id: 'events', label: 'Events', icon: Calendar, category: 'social' },
  { id: 'qanda', label: 'Q&A', icon: MessageCircle, category: 'social' },
  
  // Training Category
  { id: 'training', label: 'Training Plans', icon: Book, category: 'training' }
];

export function StatsAndAnalytics() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabSection = (category: 'main' | 'social' | 'training') => {
    const categoryTabs = tabs.filter(tab => tab.category === category);
    return (
      <div className="space-y-1">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Navigation Column */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h1 className="text-xl font-bold text-gray-900 mb-6 px-2">Fitness Social</h1>
              <nav className="space-y-6">
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    Dashboard
                  </h2>
                  {renderTabSection('main')}
                </div>
                
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    Social
                  </h2>
                  {renderTabSection('social')}
                </div>
                
                <div>
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    Training
                  </h2>
                  {renderTabSection('training')}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'dashboard' && <DashboardPage />}
            {activeTab === 'feed' && <Feed />}
            {activeTab === 'trending' && <TrendingPage />}
            {activeTab === 'training' && <TrainingPlans />}
            {activeTab === 'groups' && <Groups />}
            {activeTab === 'teams' && <Teams />}
            {activeTab === 'events' && <Events />}
            {activeTab === 'qanda' && <QandA />}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <Statistics />
                <ProgressTracking />
                <PersonalRecords />
                <AchievementBadges />
              </div>
            )}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <ProgressTracking />
                <DetailedProgress />
              </div>
            )}
            {activeTab === 'records' && <PersonalRecords />}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <AchievementBadges />
              </div>
            )}
            {activeTab === 'routes' && <RoutePlanning />}
          </div>
        </div>
      </div>
    </div>
  );
}