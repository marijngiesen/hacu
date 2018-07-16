<template>
  <div class="tiles">
    <div class="col-3 row-2 width-2">
      <ha-sensor name="CV temp" entity-id="sensor.cv_setting" unit="°C"></ha-sensor>
    </div>
    <div class="col-5 row-2 width-2">
      <ha-sensor name="Temperatuur" entity-id="sensor.indoor_temperature"></ha-sensor>
    </div>
    <div class="col-3 row-3">
      <ha-switch name="" entity-id="script.watch_movie" icon="minus" icon-scale="3"></ha-switch>
    </div>
    <div class="col-4 row-3">
      <ha-switch name="" entity-id="script.watch_movie" icon="plus" icon-scale="3"></ha-switch>
    </div>
    <div class="col-5 row-3 width-2">
      <ha-switch name="CV boost" entity-id="switch.central_heater_manual" icon="sliders-h"></ha-switch>
    </div>
  </div>
</template>

<script lang="ts" src="./climate.ts">
</script>
