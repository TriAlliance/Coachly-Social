import React, { useState } from 'react';
import { X, Image, Plus } from 'lucide-react';
import { ActivityType } from '../types/activity';
import { Post } from '../types/post';
import { useAuth } from '../context/AuthContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: Post) => void;
}

export function CreatePostModal({ isOpen, onClose, onCreatePost }: CreatePostModalProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.RUNNING);
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.name,
      userAvatar: user.avatar,
      activityType,
      content,
      images,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    onCreatePost(newPost);
    setContent('');
    setActivityType(ActivityType.RUNNING);
    setImages([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Type
            </label>
            <select
              value={activityType}
              onChange={(e) => setActivityType(e.target.value as ActivityType)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(ActivityType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="Share your activity..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <button
              type="button"
              onClick={() => {
                // In a real app, this would open a file picker
                setImages([
                  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                ]);
              }}
              className="w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt="Upload preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <Image className="w-8 h-8 mb-2" />
                  <span>Add Images</span>
                </>
              )}
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}