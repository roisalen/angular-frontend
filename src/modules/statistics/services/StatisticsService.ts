import { BaseService } from '../../../services/BaseService';

class StatisticsService extends BaseService {
  async getStatistics(type: string, startDate?: string, endDate?: string): Promise<any> {
    let url = `/statistics/${type}`;
    if (startDate) {
      url += `/${startDate}`;
      if (endDate) {
        url += `/${endDate}`;
      }
    }
    return this.get(url);
  }
}

export const statisticsService = new StatisticsService(); 