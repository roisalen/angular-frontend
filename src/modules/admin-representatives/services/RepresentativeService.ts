import { BaseService } from '../../../services/BaseService';
import { Representative } from '../types';

class RepresentativeService extends BaseService {
  async getRepresentatives(): Promise<Representative[]> {
    return this.get<Representative[]>('/representatives');
  }

  async registerRepresentative(entry: [string, string?, string?, string?]): Promise<Representative> {
    const representative: Representative = {
      number: entry[0],
      name: entry[1] || '',
      group: entry[2] || '',
      sex: entry[3]
    };
    return this.post<Representative>('/representatives', representative);
  }

  async removeRepresentative(number: string): Promise<void> {
    return this.delete(`/representatives/${number}`);
  }

  async registerRepresentativesFromArray(representativeArray: [string, string?, string?, string?][]): Promise<void> {
    await Promise.all(
      representativeArray.map(entry => this.registerRepresentative(entry))
    );
  }
}

export const representativeService = new RepresentativeService(); 