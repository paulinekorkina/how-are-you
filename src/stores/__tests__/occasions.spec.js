import {
  it, describe, beforeEach, expect,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useOccasionStore from '@/stores/occasions';

describe('occasions store', () => {
  let occasionStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    occasionStore = useOccasionStore();
  });

  it('should have initial occasions', async () => {
    expect(occasionStore.occasions.length).toBe(14);
  });

  it('should add a new occasion', async () => {
    await occasionStore.addOccasion({ id: '_', name: 'Test name', icon: '❤️' });
    expect(occasionStore.occasions.length).toBe(15);
    expect(occasionStore.occasions[0].id).toBe('_');
  });

  it('shoud update occasion', async () => {
    await occasionStore.updateOccasion({ id: '_', name: 'New name', icon: '❤️' });
    expect(occasionStore.occasions.length).toBe(15);
    expect(occasionStore.occasions[0].name).toBe('New name');
  });

  it('shoud archive occasion', async () => {
    await occasionStore.archiveOccasion('_');
    expect(occasionStore.occasions.length).toBe(15);
    expect(occasionStore.occasions.find(({ id }) => id === '_').archive).toBe(true);
  });
});
