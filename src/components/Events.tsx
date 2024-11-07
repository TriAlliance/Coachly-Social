import React, { useState } from 'react';
import { Calendar, Plus, Search, MapPin, Users, Clock, Filter, Tag } from 'lucide-react';
import { CreateEventModal } from './CreateEventModal';
import { EventDetails } from './EventDetails';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'race' | 'training' | 'social' | 'competition';
  date: string;
  time: string;
  location: string;
  organizer: string;
  participantLimit?: number;
  participants: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  distance?: number;
  duration?: number;
  coverImage: string;
  isRegistered: boolean;
  price?: number;
  tags: string[];
}

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'City Marathon 2024',
    description: 'Annual city marathon event with multiple distance categories',
    type: 'race',
    date: '2024-04-15',
    time: '07:00',
    location: 'Central Park, NY',
    organizer: 'NYC Running Club',
    participantLimit: 1000,
    participants: 856,
    difficulty: 'intermediate',
    distance: 42.2,
    duration: 240,
    coverImage: 'https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?auto=format&fit=crop&w=800',
    isRegistered: false,
    price: 50,
    tags: ['marathon', 'race', 'competition']
  },
  {
    id: '2',
    title: 'Trail Running Workshop',
    description: 'Learn essential trail running techniques and safety',
    type: 'training',
    date: '2024-03-28',
    time: '09:00',
    location: 'Bear Mountain',
    organizer: 'Trail Runners Association',
    participantLimit: 30,
    participants: 18,
    difficulty: 'beginner',
    distance: 5,
    duration: 120,
    coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800',
    isRegistered: true,
    price: 25,
    tags: ['training', 'trail', 'workshop']
  },
  {
    id: '3',
    title: 'Cycling Time Trial',
    description: 'Individual time trial competition on scenic coastal route',
    type: 'competition',
    date: '2024-04-02',
    time: '08:30',
    location: 'Coastal Highway',
    organizer: 'Coastal Cycling Club',
    participants: 45,
    difficulty: 'advanced',
    distance: 30,
    duration: 90,
    coverImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800',
    isRegistered: false,
    price: 35,
    tags: ['cycling', 'competition', 'time-trial']
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const typeColors = {
  race: 'bg-purple-100 text-purple-800',
  training: 'bg-blue-100 text-blue-800',
  social: 'bg-pink-100 text-pink-800',
  competition: 'bg-orange-100 text-orange-800'
};

export function Events() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | Event['type']>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | Event['difficulty']>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty;
    
    const eventDate = new Date(event.date);
    const today = new Date();
    const matchesDate = dateFilter === 'all' ||
                       (dateFilter === 'upcoming' && eventDate >= today) ||
                       (dateFilter === 'past' && eventDate < today);

    return matchesSearch && matchesType && matchesDifficulty && matchesDate;
  });

  const handleRegister = (eventId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          isRegistered: !event.isRegistered,
          participants: event.isRegistered ? event.participants - 1 : event.participants + 1
        };
      }
      return event;
    }));
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Events</h2>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="race">Races</option>
                  <option value="training">Training</option>
                  <option value="social">Social</option>
                  <option value="competition">Competition</option>
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as any)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Dates</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-lg text-sm font-medium ${typeColors[event.type]}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-sm rounded-full ${difficultyColors[event.difficulty]}`}>
                    {event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
                  </span>
                  {event.distance && (
                    <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                      {event.distance} km
                    </span>
                  )}
                  {event.price && (
                    <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                      ${event.price}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants} {event.participantLimit ? `/ ${event.participantLimit}` : ''} participants
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleRegister(event.id)}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      event.isRegistered
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {event.isRegistered ? 'Registered' : 'Register'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateEvent={(newEvent) => {
          setEvents([...events, { ...newEvent, id: String(events.length + 1) }]);
          setShowCreateModal(false);
        }}
      />

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
        />
      )}
    </>
  );
}