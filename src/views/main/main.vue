<template>
  <div class="tiles">
    <div class="col-1 row-1 width-2">
      <clock></clock>
    </div>
    <div class="col-5 row-1 width-2">
      <ha-sensor name="Temperatuur" entity-id="sensor.indoor_temperature"></ha-sensor>
    </div>
    <div class="col-7 row-1">
      <ha-presence name="Marijn" entity-id="device_tracker._marijn"></ha-presence>
    </div>
    <div class="col-8 row-1">
      <ha-presence name="Marlijn" entity-id="device_tracker._marlijn"></ha-presence>
    </div>
    <div class="col-1 row-2">
      <ha-button name="Alles uit" entity-id="script.all_turn_off" icon="power-off"></ha-button>
    </div>
    <div class="col-2 row-2">
      <ha-button name="Slapen" entity-id="script.sleep_time" icon="regular/moon"></ha-button>
    </div>
    <div class="col-5 row-2 width-2">
      <ha-sensor name="Luchtvochtigheid" entity-id="sensor.indoor_humidity"></ha-sensor>
    </div>
    <div class="col-8 row-2">
      <ha-switch name="Oppas" entity-id="input_boolean.oppas" icon="user"></ha-switch>
    </div>
    <div class="col-1 row-3">
      <ha-switch name="Woonkamer" entity-id="group.livingroomlights"></ha-switch>
    </div>
    <div class="col-2 row-3">
      <ha-button name="Normaal" entity-id="scene.woonkamer_normaal" icon="square"></ha-button>
    </div>
    <div class="col-3 row-3">
      <ha-button name="Dimmen" entity-id="scene.woonkamer_gedimd" icon="square"></ha-button>
    </div>
    <div class="col-4 row-3">
      <ha-button name="Fel" entity-id="scene.woonkamer_fel" icon="square"></ha-button>
    </div>
    <div class="col-5 row-3 width-2">
      <ha-sensor name="Lichtsterkte" entity-id="sensor.living_multisensor_luminance"></ha-sensor>
    </div>
    <div class="col-7 row-3 width-2">
      <ha-sensor name="CV temp" entity-id="sensor.cv_setting" unit="°C"></ha-sensor>
    </div>
    <div class="col-1 row-4">
      <ha-switch name="Keuken" entity-id="light.keuken"></ha-switch>
    </div>
    <div class="col-2 row-4">
      <ha-switch name="Slaapkamer" entity-id="group.slaapkamer"></ha-switch>
    </div>
    <div class="col-3 row-4">
      <ha-switch name="Zolder" entity-id="light.zolder_overloop"></ha-switch>
    </div>
    <div class="col-4 row-4">
      <ha-switch name="Tuin" entity-id="group.tuin"></ha-switch>
    </div>
    <div class="col-7 row-4">
      <ha-switch name="Vakantie" entity-id="input_boolean.vakantie" icon="sliders-h"></ha-switch>
    </div>
    <div class="col-8 row-4">
      <ha-switch name="CV" entity-id="switch.central_heater_manual" icon="sliders-h"></ha-switch>
    </div>
  </div>
</template>

<script lang="ts" src="./main.ts">
</script>
