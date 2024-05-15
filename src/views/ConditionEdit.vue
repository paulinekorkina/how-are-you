<template>
  <div>
    <h1>Изменить состояние</h1>
    <condition-card-creator
      :condition-to-edit="condition"
      @delete-condition="deleteCondition" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useConditionsStore from '@/stores/conditions';
import ConditionCardCreator from '@/modules/conditions/ConditionCardCreator.vue';

const route = useRoute();
const router = useRouter();
const conditionsStore = useConditionsStore();

const condition = conditionsStore.getConditionById(route.params.id);

if (!condition) {
  router.push('/');
}

function deleteCondition() {
  conditionsStore.deleteCondition(condition.id);
  router.push('/');
}
</script>
