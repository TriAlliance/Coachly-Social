import React, { useState } from 'react';
import { Heart, MessageCircle, MapPin, Clock, ArrowUp, Share2 } from 'lucide-react';
import type { Post, Comment } from '../types';
import { CommentSection } from './CommentSection';
import { UserProfileCard } from './UserProfileCard';
import { ShareModal } from './ShareModal';

interface ActivityCardProps {
  post: Post;
  onFollow: (userId: string) => void;
}

export function ActivityCard({ post, onFollow }: ActivityCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showProfile, setShowProfile] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: 'You',
      content,
      date: new Date().toISOString(),
      replies: [],
      likes: 0,
    };

    if (parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment]
          };
        }
        return comment;
      }));
    } else {
      setComments([...comments, newComment]);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`}
                alt={post.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{post.username}</h3>
                <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </button>
            <button
              onClick={() => onFollow(post.user.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                post.user.isFollowing
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {post.user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {showProfile && (
            <div className="mb-4">
              <UserProfileCard 
                user={post.user}
                onFollow={onFollow}
              />
            </div>
          )}
          
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.description}</p>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>{Math.floor(post.duration / 60)}m</span>
            </div>
            {post.distance && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{post.distance.toFixed(2)}km</span>
              </div>
            )}
            {post.elevation && (
              <div className="flex items-center text-gray-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>{post.elevation}m</span>
              </div>
            )}
          </div>

          {post.mapUrl && (
            <img
              src={post.mapUrl}
              alt="Activity map"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}

          {post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Activity photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4 text-gray-600">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-blue-500 ${
                liked ? 'text-blue-500' : ''
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center space-x-1 hover:text-blue-500"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {showComments && (
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
          />
        )}
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        post={post}
      />
    </>
  );
}