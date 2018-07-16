<template>
  <div class="ha-sensor">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ name }}</p>
          <p class="title">{{ value }} <span>{{ displayUnit }}</span></p>
        </div>
      </div>
    </div>
    <!--<div class="">{{ name }}</div>-->
    <!--<h1 class="title is-1">{{ value }} <span class="title is-3">{{ displayUnit }}</span></h1>-->
  </div>
</template>
<script lang="ts" src="./hasensor.ts">
</script>
<style lang="scss" src="./hasensor.scss">
</style>
