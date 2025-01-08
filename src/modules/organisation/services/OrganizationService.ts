import { BaseService } from '../../../services/BaseService';
import { Organization } from '../types';

class OrganizationService extends BaseService {
  async getOrganizations(): Promise<Organization[]> {
    return this.get<Organization[]>('/organisations', false);
  }

  async addOrganization(organization: Organization): Promise<Organization> {
    return this.post<Organization>('/organisations', organization);
  }
}

export const organizationService = new OrganizationService(); 