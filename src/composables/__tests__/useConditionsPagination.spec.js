import {
  describe, beforeEach, expect, it, vi,
} from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import useConditionsPagination from '../useConditionsPagination';

describe('useConditionsPagination', () => {
  beforeEach(async () => {
    createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });
  });

  it('should have initial conditions', () => {
    const { conditionsToRender } = useConditionsPagination();
    expect(conditionsToRender.value.length).toBe(8);
  });

  it('should show there is more conditions', () => {
    const { isMoreConditions } = useConditionsPagination();
    expect(isMoreConditions.value).toBe(true);
  });
});
