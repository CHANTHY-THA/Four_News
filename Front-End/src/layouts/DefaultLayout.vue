<template>
  <v-app>
    <AppSidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from "../components/AppSidebar.vue";

export default {
  name: "DefaultLayout",
  components: {
    AppSidebar,
  },
};
</script>
<style lang="scss"></style>
