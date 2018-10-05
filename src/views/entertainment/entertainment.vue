<template>
  <div class="tiles">
    <div class="col-3 row-2 width-2">
      <ha-switch name="TV kijken" entity-id="script.watch_tv" icon="tv"></ha-switch>
    </div>
    <div class="col-5 row-2 width-2">
      <ha-switch name="Film kijken" entity-id="script.watch_movie" icon="film"></ha-switch>
    </div>
    <div class="col-3 row-3 width-2">
      <ha-switch name="Muziek luisteren" entity-id="script.spotify_kids" icon="music"></ha-switch>
    </div>
    <div class="col-5 row-3">
      <ha-switch name="Theater mode" entity-id="input_boolean.theater" icon="regular/lightbulb"></ha-switch>
    </div>
    <div class="col-6 row-3">
      <ha-switch name="Alles uit" entity-id="script.entertainment_turn_off" icon="power-off"></ha-switch>
    </div>
  </div>
</template>

<script lang="ts" src="./entertainment.ts">
</script>
