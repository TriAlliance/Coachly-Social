import { ActivityType } from './activity';

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  activityType: ActivityType;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  createdAt: string;
}