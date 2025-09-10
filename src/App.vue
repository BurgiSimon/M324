<script setup></script>

<!-- Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ -->
<!-- Font used - https://compressa.preusstype.com/ -->
  
<template>
  <TextPressure
    text="Hello M324"
    :flex="true"
    :alpha="false"
    :stroke="false"
    :width="true"
    :weight="true"
    :italic="true"
    text-color="#00000"
    stroke-color="#27FF64"
    :min-font-size="36"
  />
</template>

<script setup lang="ts">
  import TextPressure from "./components/TextPressure.vue";
</script>
