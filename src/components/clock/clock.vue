<template>
  <div class="clock">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ currentDate }}</p>
          <p class="title">{{ currentTime }}</p>
        </div>
      </div>
    </div>

    <!--<h2 class="subtitle is-6">{{ currentDate }}</h2>-->
    <!--<h1 class="title is-1">{{ currentTime }}</h1>-->
  </div>
</template>
<script lang="ts" src="./clock.ts">
</script>
<style lang="scss" src="./clock.scss">
</style>
