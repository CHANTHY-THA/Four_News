<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer">
      <v-list density="compact" item-props :items="items" nav />

      <template #append>
        <v-list-item
          class="ma-2"
          link
          nav
          prepend-icon="mdi-cog-outline"
          title="Settings"
        />
      </template>
    </v-navigation-drawer>

    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />

      <v-app-bar-title>Four News</v-app-bar-title>

      <template #append>
        <v-btn class="text-none me-2" height="48" icon slim>
          <v-avatar
            color="surface-light"
            image="https://cdn.vuetifyjs.com/images/john.png"
            size="32"
          />

          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item
                append-icon="mdi-cog-outline"
                link
                title="Settings"
              />

              <v-list-item append-icon="mdi-logout" link title="Logout" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <div class="pa-4" style="height: 93vh; width: 100%">
        <!-- <v-sheet
          border="dashed md"
          color="surface-light"
          height="800"
          rounded="lg"
          width="100%"
        >
      
        </v-sheet> -->
      </div>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);

const items = ref([
  {
    title: "Dashboard",
    prependIcon: "mdi-view-dashboard-outline",
    link: true,
  },
  {
    title: "Team",
    prependIcon: "mdi-account-group",
    link: true,
  },
  {
    title: "Projects",
    prependIcon: "mdi-briefcase-outline",
    link: true,
  },
  {
    title: "Calendar",
    prependIcon: "mdi-calendar",
    link: true,
  },
  {
    title: "Reports",
    prependIcon: "mdi-file-chart-outline",
    link: true,
  },
]);
</script>
