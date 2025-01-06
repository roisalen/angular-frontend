import { BaseService } from '../../../services/BaseService';

class LeadMeetingService extends BaseService {
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
}

export const leadMeetingService = new LeadMeetingService(); 