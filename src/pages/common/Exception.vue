<script setup lang="ts">
import { computed } from 'vue'

const message = computed(() => {
  return 'Exception Page'
})
</script>

<template>
  <div>
    {{ message }}
  </div>
</template>
