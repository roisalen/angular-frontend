import { BaseService } from '../../../services/BaseService';
import { Organization } from '../../../types/organization.types';

class OrganizationService extends BaseService {
  async getOrganizations(): Promise<Organization[]> {
    return this.get<Organization[]>('/organisations', true);
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