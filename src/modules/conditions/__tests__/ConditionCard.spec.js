import { mount } from '@vue/test-utils';
import {
  describe, beforeEach, it, expect, vi,
} from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import useConditionsStore from '@/stores/conditions';
import ConditionCard from '../ConditionCard.vue';

describe('ConditionCard', () => {
  let wrapper; let
    conditionsStore;
  beforeEach(async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });
    wrapper = mount(ConditionCard, {
      global: {
        plugins: [pinia],
      },
      props: {
        condition: {
          id: '1',
          date: '2024-03-01T11:40:01.000Z',
          mood: 3,
          energy: 3,
          occasions: [1],
          emotions: [2, 3],
          note: null,
        },
      },
    });
    conditionsStore = useConditionsStore();
  });

  it('should render', async () => {
    expect(wrapper.exists).toBeTruthy();
  });

  it('should trigger deleteCondition action', async () => {
    const deleteConditionButton = wrapper.find('button');
    deleteConditionButton.trigger('click');
    expect(conditionsStore.deleteCondition).toHaveBeenCalledTimes(1);
  });
});
