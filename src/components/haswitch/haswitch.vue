<template>
  <a class="ha-switch" href="#" @click.prevent="toggle">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ name }}</p>
          <p class="title">
            <figure v-if="icon" :class="{ 'active': state }">
              <icon :name="icon"></icon>
            </figure>
            <figure v-else :class="{ 'active': state }">
              <icon v-if="!state" name="regular/circle"></icon>
              <icon v-else name="circle"></icon>
            </figure>
          </p>
        </div>
      </div>
    </div>
  </a>
</template>
<script lang="ts" src="./haswitch.ts">
</script>
<style lang="scss" src="./haswitch.scss">
</style>
