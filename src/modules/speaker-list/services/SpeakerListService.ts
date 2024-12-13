import config from '@/config/config';
import { BaseService } from '../../../services/BaseService';
import { Speaker } from '../types';

class SpeakerListService extends BaseService {
    async getSpeakerList(): Promise<Speaker[]> {
        const response = await fetch(`${config.apiUrl}/speaker-list`);
        if (!response.ok) {
          throw new Error('Failed to fetch speaker list');
        }
        return response.json();
      }

  async nextSpeaker() {
    const response = await fetch(`${this.baseUrl}/speakerList/0`, {
      method: 'POST'
    });
    return this.handleResponse(response);
  }

  async addReplyToFirstSpeaker(replicantNumber: string) {
    const response = await fetch(`${this.baseUrl}/speakerList/0/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ replicantNumber })
    });
    return this.handleResponse(response);
  }

  async removeSpeaker(index: number) {
    const response = await fetch(`${this.baseUrl}/speakerList/${index}`, {
      method: 'DELETE'
    });
    return this.handleResponse(response);
  }

  async removeReplicant(index: number) {
    const response = await fetch(`${this.baseUrl}/speakerList/0/replies/${index}`, {
      method: 'DELETE'
    });
    return this.handleResponse(response);
  }

  async addSpeakerToBottom(speakerNumber: string) {
    const response = await fetch(`${this.baseUrl}/speakerList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ speakerNumber })
    });
    return this.handleResponse(response);
  }

  async moveSpeaker(start: number, end: number) {
    const response = await fetch(`${this.baseUrl}/speakerlist/${start}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newPlace: end })
    });
    return this.handleResponse(response);
  }
}

export const speakerListService = new SpeakerListService(); 