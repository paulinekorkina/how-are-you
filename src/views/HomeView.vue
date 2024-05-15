<template>
  <div>
    <h1>История состояний</h1>
    <FiltersBlock />
    <transition-group
      name="condition"
      class="grid"
      tag="div"
    >
      <router-link
        v-for="condition in conditionsToRender"
        :key="condition.id"
        :to="{ name: 'condition', params: { id: condition.id }}"
        class="col-12 md:col-6 lg:col-3 flex"
      >
        <condition-card
          class="col-12 shadow-2 p-3 border-round"
          :condition="condition"
        />
      </router-link>

      <div
        v-if="conditionsToRender.length === 0"
        class="col-12 mt-5 text-lg text-center"
      >
        Список состояний пуст. Добавьте первое!
      </div>
    </transition-group>

    <div v-if="isMoreConditions">
      <div
        ref="target"
        class="text-center p-3"
      >
        Загрузка...
      </div>
    </div>
  </div>
</template>

<script setup>
import ConditionCard from '@/modules/conditions/ConditionCard.vue';
import FiltersBlock from '@/modules/filters/FiltersBlock.vue';
import useConditionsPagination from '@/composables/useConditionsPagination';

const { conditionsToRender, isMoreConditions, target } = useConditionsPagination();

</script>

<style lang="scss" scoped>
@import '@/assets/scss/animations/animations.scss';
</style>
