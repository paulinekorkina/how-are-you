<template>
  Edit Condition id {{ id }}
  <condition-card-creator :condition-to-edit="condition" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import useConditionsStore from '@/stores/conditions';
import ConditionCardCreator from '@/modules/conditions/ConditionCardCreator.vue';

const route = useRoute();
const router = useRouter();
const conditionsStore = useConditionsStore();

const { id } = route.params;
const condition = conditionsStore.getConditionById(route.params.id);

if (!condition) {
  router.push('/');
}
</script>
