import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, DollarSign, Tag } from 'lucide-react';

interface EventDetailsProps {
  event: any;
  onClose: () => void;
  onRegister: (eventId: string) => void;
}

export function EventDetails({ event, onClose, onRegister }: EventDetailsProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'participants' | 'discussion'>('details');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  {event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
                </span>
                {event.price && (
                  <span className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                    ${event.price}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => onRegister(event.id)}
              className={`px-6 py-2 rounded-lg font-medium ${
                event.isRegistered
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {event.isRegistered ? 'Registered' : 'Register Now'}
            </button>
          </div>

          <div className="flex gap-4 border-b mb-6">
            {['details', 'participants', 'discussion'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>
                    {event.participants} {event.participantLimit ? `/ ${event.participantLimit}` : ''} participants
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="text-center py-8 text-gray-500">
              Participant list will be available soon
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="text-center py-8 text-gray-500">
              Discussion board will be available soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}