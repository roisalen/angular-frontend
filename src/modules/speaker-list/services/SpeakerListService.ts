import { BaseService } from '../../../services/BaseService';
import { Speaker } from '../../../types/speaker.types';

class SpeakerListService extends BaseService {
  async getSpeakerList(): Promise<Speaker[]> {
    return this.get<Speaker[]>('/speakerList');
  }

  async nextSpeaker(): Promise<void> {
    return this.post('/speakerList/0');
  }

  async addReplyToFirstSpeaker(replicantNumber: string): Promise<void> {
    return this.post('/speakerList/0/replies', { replicantNumber });
  }

  async removeSpeaker(index: number): Promise<void> {
    return this.delete(`/speakerList/${index}`);
  }

  async removeReply(index: number): Promise<void> {
    return this.delete(`/speakerList/0/replies/${index}`);
  }

  async addSpeaker(speakerNumber: string): Promise<void> {
    return this.post('/speakerList', { speakerNumber });
  }

  async moveSpeaker(start: number, end: number): Promise<void> {
    return this.put(`/speakerList/${start}`, { newPlace: end });
  }
}

export const speakerListService = new SpeakerListService(); 