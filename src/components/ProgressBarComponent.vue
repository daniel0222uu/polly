<template>
  <div class="progress-bar">
    <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarComponent',
  props: ['progress'],
  }
</script>

<style>
.progress-bar {
  margin-left: 30%;
  margin-right: 30%;
  height: 8px  ;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
}

</style>
