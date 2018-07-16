<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

    <div class="tiles">
      <div class="col-1 row-5 nav">
        <page-link url="/" name="Overzicht"></page-link>
      </div>
      <div class="col-2 row-5 nav">
        <page-link url="/climate" name="Klimaat"></page-link>
      </div>
      <div class="col-3 row-5 nav">
        <page-link url="/entertainment" name="Entertainment"></page-link>
      </div>
      <div class="col-8 row-5 nav">
        <a href="#" @click.prevent="reloadStates">
          <div class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="heading">Reload</p>
                <p class="title">
                  <figure>
                    <icon name="sync-alt"></icon>
                  </figure>
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./app.ts">
</script>
<style lang="scss" src="./app.scss">
</style>
