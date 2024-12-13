import { BaseService } from '../../../services/BaseService';
import { Speaker, Reply, Representative } from '../../../types/speaker.types';

class LeadMeetingService extends BaseService {
  async getSpeakerList(): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers`);
    return this.handleResponse<Speaker[]>(response);
  }

  async getRepresentatives(): Promise<Representative[]> {
    const response = await fetch(`${this.baseUrl}/representatives`);
    return this.handleResponse<Representative[]>(response);
  }

  async getSubject(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/subject`);
    return this.handleResponse<string>(response);
  }

  async getMessage(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/message`);
    return this.handleResponse<string>(response);
  }

  async setSubject(subject: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/subject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject })
    });
    return this.handleResponse<string>(response);
  }

  async setMessage(message: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return this.handleResponse<string>(response);
  }

  async addSpeaker(speakerNumber: string): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: speakerNumber })
    });
    return this.handleResponse<Speaker[]>(response);
  }

  async addReply(speakerNumber: string): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: speakerNumber })
    });
    return this.handleResponse<Speaker[]>(response);
  }

  async removeSpeaker(index: number): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers/${index}`, {
      method: 'DELETE'
    });
    return this.handleResponse<Speaker[]>(response);
  }

  async removeReply(index: number): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers/reply/${index}`, {
      method: 'DELETE'
    });
    return this.handleResponse<Speaker[]>(response);
  }

  async moveSpeaker(fromIndex: number, toIndex: number): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromIndex, toIndex })
    });
    return this.handleResponse<Speaker[]>(response);
  }

  async nextSpeaker(): Promise<Speaker[]> {
    const response = await fetch(`${this.baseUrl}/speakers/next`, {
      method: 'POST'
    });
    return this.handleResponse<Speaker[]>(response);
  }
}

export const leadMeetingService = new LeadMeetingService(); 