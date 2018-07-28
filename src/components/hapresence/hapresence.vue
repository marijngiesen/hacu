<template>
  <div class="ha-presence">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ name }}</p>
          <p class="title">
            <figure :class="{ 'active': state === 'home' }">
              <icon v-if="icon" :name="icon"></icon>
              <icon v-else name="user"></icon>
            </figure>
          </p>
          <p class="heading">{{ state }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./hapresence.ts">
</script>
<style lang="scss" src="./hapresence.scss">
</style>
