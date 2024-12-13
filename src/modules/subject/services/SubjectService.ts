import { BaseService } from '../../../services/BaseService';

class SubjectService extends BaseService {
  async getSubjectTitle() {
    const response = await fetch(`${this.baseUrl}/subject/title`);
    return this.handleResponse<string>(response);
  }

  async getMessage() {
    const response = await fetch(`${this.baseUrl}/subject/message`);
    return this.handleResponse<string>(response);
  }

  async setSubjectTitle(title: string) {
    const response = await fetch(`${this.baseUrl}/subject/title`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    return this.handleResponse(response);
  }

  async setMessage(message: string) {
    const response = await fetch(`${this.baseUrl}/subject/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    return this.handleResponse(response);
  }
}

export const subjectService = new SubjectService(); 