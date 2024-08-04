<template>
  <v-app>
    <MenuComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import MenuComponent from "./components/MenuComponent.vue";

export default {
  components: {
    MenuComponent,
  },
};
</script>
