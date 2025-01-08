import { BaseService } from '../../../services/BaseService';
import { Speaker } from '../types';

class SpeakerListService extends BaseService {
  async getSpeakerList(): Promise<Speaker[]> {
    return this.get<Speaker[]>('/speakerList');
  }

  async nextSpeaker(): Promise<Speaker[]> {
    return this.post<Speaker[]>('/speakerList/0', {});
  }

  async addReply(replicantNumber: string): Promise<Speaker[]> {
    return this.post<Speaker[]>('/speakerList/0/replies', { replicantNumber });
  }

  async removeSpeaker(index: number): Promise<Speaker[]> {
    return this.delete<Speaker[]>(`/speakerList/${index}`);
  }

  async removeReply(index: number): Promise<Speaker[]> {
    return this.delete<Speaker[]>(`/speakerList/0/replies/${index}`);
  }

  async addSpeaker(speakerNumber: string): Promise<Speaker[]> {
    return this.post<Speaker[]>('/speakerList', { speakerNumber });
  }

  async moveSpeaker(start: number, end: number): Promise<Speaker[]> {
    return this.put<Speaker[]>(`/speakerList/${start}`, { newPlace: end });
  }
}

export const speakerListService = new SpeakerListService(); 