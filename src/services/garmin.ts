import axios from 'axios';
import { Post } from '../types';

interface GarminCredentials {
  username: string;
  password: string;
}

interface GarminSession {
  ticket: string;
  sessionId: string;
}

export class GarminService {
  private baseUrl = 'https://connect.garmin.com';
  private credentials?: GarminCredentials;
  private session?: GarminSession;

  constructor() {
    this.credentials = {
      username: 'trialliance',
      password: 'Y9NMKCq!kffv@rA'
    };
  }

  private async authenticate(): Promise<void> {
    try {
      // Step 1: Get initial ticket
      const ticketResponse = await axios.post(
        `${this.baseUrl}/signin`,
        {
          username: this.credentials?.username,
          password: this.credentials?.password
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      // Step 2: Get session ticket
      const sessionResponse = await axios.post(
        `${this.baseUrl}/modern`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${ticketResponse.data.ticket}`
          }
        }
      );

      this.session = {
        ticket: ticketResponse.data.ticket,
        sessionId: sessionResponse.headers['set-cookie']?.[0]
      };

    } catch (error) {
      console.error('Garmin authentication error:', error);
      throw new Error('Failed to authenticate with Garmin Connect');
    }
  }

  async getLatestActivities(limit: number = 10): Promise<Post[]> {
    try {
      if (!this.session) {
        await this.authenticate();
      }

      const response = await axios.get(
        `${this.baseUrl}/modern/proxy/activitylist-service/activities/search/activities`,
        {
          params: {
            limit,
            start: 0
          },
          headers: {
            'Authorization': `Bearer ${this.session?.ticket}`,
            'Cookie': `SESSIONID=${this.session?.sessionId}`
          }
        }
      );

      return response.data.map((activity: any) => ({
        id: activity.activityId,
        userId: 'garmin',
        username: this.credentials!.username,
        activityType: this.mapGarminActivityType(activity.activityType),
        title: activity.activityName,
        description: activity.description || '',
        date: activity.startTimeLocal,
        duration: activity.duration,
        distance: activity.distance,
        elevation: activity.elevationGain,
        calories: activity.calories,
        images: activity.photoIds?.map((photoId: string) => 
          `${this.baseUrl}/modern/proxy/activity-service/activity/${activity.activityId}/photo/${photoId}`
        ) || [],
        likes: 0,
        comments: [],
        mapUrl: activity.hasPolyline ? 
          `${this.baseUrl}/modern/proxy/activity-service/activity/${activity.activityId}/map` : 
          undefined,
        user: {
          id: 'garmin',
          username: this.credentials!.username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.credentials!.username}`,
          followers: 0,
          following: 0,
          stats: {
            totalActivities: 0,
            totalDistance: 0,
            totalDuration: 0
          }
        }
      }));

    } catch (error) {
      console.error('Error fetching Garmin activities:', error);
      throw new Error('Failed to fetch activities from Garmin Connect');
    }
  }

  private mapGarminActivityType(garminType: string): string {
    const typeMap: { [key: string]: string } = {
      'running': 'run',
      'cycling': 'cycle',
      'swimming': 'swim',
      'hiking': 'hike',
      'strength_training': 'workout'
      // Add more mappings as needed
    };
    return typeMap[garminType.toLowerCase()] || 'workout';
  }
}