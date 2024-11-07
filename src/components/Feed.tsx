import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ActivityCard } from './ActivityCard';
import { CreatePostModal } from './CreatePostModal';
import { Plus } from 'lucide-react';
import { GarminService } from '../services/garmin';
import type { Post } from '../types';

const garminService = new GarminService();

export function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGarminActivities();
  }, []);

  const loadGarminActivities = async () => {
    try {
      const activities = await garminService.getLatestActivities();
      setPosts(activities);
    } catch (error) {
      console.error('Error loading Garmin activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsCreatePostModalOpen(false);
  };

  const handleFollow = (userId: string) => {
    setPosts(posts.map(post => {
      if (post.user.id === userId) {
        return {
          ...post,
          user: {
            ...post.user,
            isFollowing: !post.user.isFollowing,
            followers: post.user.isFollowing ? post.user.followers - 1 : post.user.followers + 1
          }
        };
      }
      return post;
    }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Please log in to view the feed.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Activity Feed</h2>
        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <ActivityCard 
            key={post.id} 
            post={post}
            onFollow={handleFollow}
          />
        ))}
      </div>

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}