import config from '../config/config';

export abstract class BaseService {
  protected baseUrl: string;
  private static organization: string | null = null;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  protected getOrganization(): string | null {
    return BaseService.organization;
  }

  public static setOrganization(org: string | null) {
    BaseService.organization = org;
  }

  protected getHeaders(contentType = true): HeadersInit {
    const headers: HeadersInit = {
      'X-organisation': this.getOrganization() || ''
    };

    if (contentType) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  }

  protected async get<T>(url: string, useHeaders = true): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: useHeaders ? this.getHeaders(false) : undefined
    });
    return this.handleResponse<T>(response);
  }

  protected async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    return this.handleResponse<T>(response);
  }

  protected async put<T>(url: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body)
    });
    return this.handleResponse<T>(response);
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: this.getHeaders(false)
    });
    return this.handleResponse<T>(response);
  }

  protected async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return response.text() as unknown as T;
  }
} 