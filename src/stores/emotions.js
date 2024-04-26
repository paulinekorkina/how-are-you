import { defineStore } from 'pinia';
import emotionsJSON from '@/mocks/emotions.json';

const useEmotionStore = defineStore('emotion', {
  state: () => ({
    emotions: emotionsJSON,
  }),
  actions: {
    addEmotion(emotion) {
      this.emotions.unshift(emotion);
    },
    updateEmotion(emotion) {
      const index = this.emotions.findIndex(({ id }) => id === emotion.id);

      if (index >= 0) {
        this.emotions.splice(index, 1, emotion);
      }
    },
    deleteEmotion(emotionId) {
      this.emotions = this.emotions.filter(({ id }) => id !== emotionId);
    },
  },
});

export default useEmotionStore;
