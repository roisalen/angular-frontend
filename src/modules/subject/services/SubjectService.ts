import { BaseService } from '../../../services/BaseService';
import DOMPurify from 'dompurify';

class SubjectService extends BaseService {
  async getSubject() {
    const response = await this.get<string>('/subject');
    return DOMPurify.sanitize(response);
  }

  async getMessage() {
    const response = await this.get<string>('/message');
    return DOMPurify.sanitize(response);
  }

  async setSubject(subject: string) {
    return this.post('/subject', { subject });
  }

  async setMessage(message: string) {
    const sanitizedMessage = DOMPurify.sanitize(message);
    return this.post('/message', { message: sanitizedMessage });
  }
}

export const subjectService = new SubjectService(); 