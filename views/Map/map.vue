<template>
  <v-row justify="center">
    <v-col cols="12">
      <LMap
        ref="map"
        :zoom="zoom"
        :center="[-12.992908382756275, -38.47495749944153]"
        :use-global-leaflet="false"
      >
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="[-12.989919327572952, -38.46204711415399]" />
        <LMarker :lat-lng="[-12.991635173523642, -38.50070148041333]" />
        <LMarker :lat-lng="[-13.012210107179213, -38.49109086968087]" />
      </LMap>
    </v-col>
  </v-row>
  <Footer class="mt-0" />
</template>

<script setup lang="ts">
import Footer from "~/components/Footer.vue";
const zoom = ref(13);
</script>

<style>
.leaflet-left,
.leaflet-control {
  display: none;
}
</style>
