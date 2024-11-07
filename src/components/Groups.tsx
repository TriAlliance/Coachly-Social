import React, { useState } from 'react';
import { UsersRound, Plus, Search, MapPin, Calendar, Trophy, Settings, MoreHorizontal, Users } from 'lucide-react';
import { CreateGroupModal } from './CreateGroupModal';
import { GroupDetails } from './GroupDetails';

interface Group {
  id: string;
  name: string;
  description: string;
  type: 'running' | 'cycling' | 'hiking' | 'general';
  memberCount: number;
  location?: string;
  coverImage: string;
  upcomingEvents: number;
  isAdmin: boolean;
  isMember: boolean;
  privacy: 'public' | 'private';
  achievements: number;
}

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Morning Trail Runners',
    description: 'Early morning trail running group for all levels',
    type: 'running',
    memberCount: 156,
    location: 'Central Park, NY',
    coverImage: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=800',
    upcomingEvents: 3,
    isAdmin: true,
    isMember: true,
    privacy: 'public',
    achievements: 12
  },
  {
    id: '2',
    name: 'Weekend Warriors Cycling',
    description: 'Group for cycling enthusiasts who love weekend adventures',
    type: 'cycling',
    memberCount: 89,
    location: 'Brooklyn, NY',
    coverImage: 'https://images.unsplash.com/photo-1682687220063-4742bd7c8f1b?auto=format&fit=crop&w=800',
    upcomingEvents: 2,
    isAdmin: false,
    isMember: true,
    privacy: 'public',
    achievements: 8
  },
  {
    id: '3',
    name: 'Urban Hikers Club',
    description: 'Exploring urban trails and city parks',
    type: 'hiking',
    memberCount: 234,
    location: 'Queens, NY',
    coverImage: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&fit=crop&w=800',
    upcomingEvents: 1,
    isAdmin: false,
    isMember: false,
    privacy: 'private',
    achievements: 15
  }
];

export function Groups() {
  const [groups, setGroups] = useState(MOCK_GROUPS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'my-groups'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'my-groups' && group.isMember);
    return matchesSearch && matchesFilter;
  });

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          isMember: true,
          memberCount: group.memberCount + 1
        };
      }
      return group;
    }));
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          isMember: false,
          memberCount: group.memberCount - 1
        };
      }
      return group;
    }));
  };

  if (selectedGroup) {
    return (
      <GroupDetails
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
        onLeave={handleLeaveGroup}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <UsersRound className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Groups & Teams</h2>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Groups
                </button>
                <button
                  onClick={() => setFilter('my-groups')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    filter === 'my-groups'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  My Groups
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={group.coverImage}
                  alt={group.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {group.isAdmin && (
                    <button className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100">
                      <Settings className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {group.privacy === 'private' && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-gray-900 bg-opacity-75 rounded-lg text-white text-sm">
                    Private Group
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold">{group.name}</h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>

                {group.location && (
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {group.location}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Users className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm text-gray-600">{group.memberCount}</span>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm text-gray-600">{group.upcomingEvents}</span>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Trophy className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                    <span className="text-sm text-gray-600">{group.achievements}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGroup(group)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  {!group.isMember ? (
                    <button
                      onClick={() => handleJoinGroup(group.id)}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Join Group
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLeaveGroup(group.id)}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Leave
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateGroup={(newGroup) => {
          setGroups([...groups, { ...newGroup, id: String(groups.length + 1) }]);
          setShowCreateModal(false);
        }}
      />
    </>
  );
}