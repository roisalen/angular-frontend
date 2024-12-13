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

  protected getHeaders(skipOrganization = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (!skipOrganization) {
      const shortName = localStorage.getItem('organizationShortName');
      if (shortName) {
        headers['X-organisation'] = shortName;
      }
    }

    return headers;
  }

  protected async get<T>(endpoint: string, skipOrganization = false): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(skipOrganization)
    });
    return this.handleResponse<T>(response);
  }

  protected async post<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined
    });
    return this.handleResponse<T>(response);
  }

  protected async put<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined
    });
    return this.handleResponse<T>(response);
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse<T>(response);
  }
} 