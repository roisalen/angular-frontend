import config from '../config/config';

export class BaseService {
  protected baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
} 