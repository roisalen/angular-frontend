import { BaseService } from '../../../services/BaseService';

interface Organization {
  name: string;
  shortName: string;
}

class OrganizationService extends BaseService {
  async getOrganization(shortName: string) {
    const response = await fetch(`${this.baseUrl}/organisations/${shortName}`);
    return this.handleResponse<Organization>(response);
  }

  async getAllOrganizations() {
    const response = await fetch(`${this.baseUrl}/organisations`);
    return this.handleResponse<Organization[]>(response);
  }

  async addOrganization(organization: Organization) {
    const response = await fetch(`${this.baseUrl}/organisations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(organization)
    });
    return this.handleResponse<Organization>(response);
  }
}

export const organizationService = new OrganizationService(); 