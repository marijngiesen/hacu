<template>
  <router-link :to="url">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p v-if="name" class="heading">{{ name }}</p>
          <p class="title">
            <figure>
              <icon :name="icon"></icon>
            </figure>
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" src="./pagelink.ts">
</script>
