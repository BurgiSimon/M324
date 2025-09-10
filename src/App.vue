<script setup lang="ts">
import TextPressure from './components/TextPressure.vue'
</script>

<template>
  <TextPressure
    text="Hello M324"
    :flex="true"
    :alpha="false"
    :stroke="false"
    :width="true"
    :weight="true"
    :italic="true"
    text-color="#000000"
    stroke-color="#27FF64"
    :min-font-size="36"
  />
</template>
