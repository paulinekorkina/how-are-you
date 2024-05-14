import { mount } from '@vue/test-utils';
import {
  describe, beforeAll, beforeEach, it, expect, vi,
} from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router';
import PrimeVue from 'primevue/config';
import mockMatchMedia from './utils';
import HomeView from '../HomeView.vue';

describe('HomeView', () => {
  let wrapper;
  beforeAll(mockMatchMedia);
  beforeEach(async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });
    wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router, PrimeVue],
      },
    });
  });

  it('should render', async () => {
    expect(wrapper.exists).toBeTruthy();
  });

  it('should have a proper title', () => {
    const title = wrapper.find('h1');
    expect(title.text()).toBe('История состояний');
  });
});
