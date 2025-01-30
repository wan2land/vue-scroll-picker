<script setup lang="ts">
defineProps<{
  value?: unknown
}>()
</script>
<template>
  <div>
    currentValue =
    <code>{{
      typeof value === 'undefined' ? 'undefined' : JSON.stringify(value)
    }}</code>
  </div>
</template>
