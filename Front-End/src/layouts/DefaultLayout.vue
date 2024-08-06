<template>
  <v-app>
    <AppSidebar />
    <v-main>
      <div class="custom-main">
        <router-view />
      </div>
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
<style lang="scss">
@import "@/sass/layouts/_default-layout.scss";
</style>
