export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  stats?: {
    totalActivities: number;
    totalDistance: number;
    totalDuration: number;
  };
  permissions: string[];
}

export const MOCK_SUPER_ADMIN: User = {
  id: 'super_admin_1',
  username: 'SuperAdmin',
  email: 'admin@fitness.com',
  role: 'super_admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin',
  bio: 'Platform Administrator',
  followers: 1000,
  following: 500,
  stats: {
    totalActivities: 250,
    totalDistance: 2500,
    totalDuration: 180000
  },
  permissions: [
    'manage_users',
    'manage_content',
    'manage_settings',
    'manage_teams',
    'manage_events',
    'manage_groups',
    'view_analytics',
    'manage_coaches',
    'manage_training_plans'
  ]
};