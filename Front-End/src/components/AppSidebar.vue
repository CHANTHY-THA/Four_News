<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      width="285"
      color="grey-darken-4"
      @click="rail = false"
    >
      <div class="logo">
        <div style="margin-left: 15px">
          <v-list-item :prepend-avatar="com_logo" nav> </v-list-item>

          <v-text
            v-if="!rail"
            style="font-weight: bold; font-size: 18px; margin-left: -15px"
            >Four News</v-text
          >
        </div>
      </div>
      <v-divider></v-divider>

      <v-list density="compact" nav v-model:opened="open">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="grey-lighten-4"
          :to="item.path"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title
            v-text="item.title"
            style="font-size: 15px"
          ></v-list-item-title>
        </v-list-item>

        <!-- <v-list-group v-if="userRole=='admin'"> -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-application-cog">
              <v-list-item-title style="font-size: 15px"
                >Leave Management</v-list-item-title
              >
            </v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in leaveItems"
            :key="i"
            :value="item"
            color="grey-lighten-4"
            :to="item.path"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title
              v-text="item.title"
              style="font-size: 15px"
            ></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="rail = !rail"></v-app-bar-nav-icon>
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      </template>
      <v-app-bar-title style="margin-left: 0px">{{ title }}</v-app-bar-title>
      <div>
        <v-menu color="grey-darken-4">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-avatar v-if="user[0].ProfileImage != ''" size="40px">
                <v-img
                  :src="`images/${user[0].ProfileImage}`"
                  :alt="selectedDog"
                  style=""
                ></v-img>
              </v-avatar>
              <v-avatar size="40px" color="info" v-else>
                <span style="font-size: 20px">{{ this.initails }}</span>
              </v-avatar>
              <v-text style="font-size: 17px; margin-left: 10px">{{
                username
              }}</v-text>
            </v-list-item>
          </template>

          <v-list class="bg-grey-darken-4">
            <v-list-item
              v-for="(item, i) in userItems"
              :key="i"
              @click="userProfile(item.path, item.title)"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>

  <!-- <v-app-bar title="Application bar"></v-app-bar> -->
  <!-- <v-main style="background: blue;" >
      
    </v-main>
  -->
</template>
<style>
.logo .v-img__img--cover {
  object-fit: fill;
}
.logo .v-img__img {
  width: 100%;
  height: 100%;
}
.logo .v-avatar.v-avatar--size-default {
  --v-avatar-height: 70px;
}
.logo {
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
<script>
// import JsonData from "@/assets/data.json";
// import logo from "@/assets/profiles/sdworks.png";
export default {
  name: "AppSidebar",
  props: ["title"],
  data() {
    return {
      profile:
        "https://bongsrey.sgp1.digitaloceanspaces.com/library/22403/images/thumbnail/6141c3534260a.png",
      open: ["LeaveManagement"],
      drawer: true,
      rail: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", path: "/dashboard" },
        // { title: 'My Profile', icon: 'mdi-account',path:"/myprofile" },
        { title: "Department", icon: "mdi-domain", path: "/department" },
        {
          title: "Employee",
          icon: "mdi-account-group-outline",
          path: "/employee",
        },
        { title: "My Leave", icon: "mdi-application", path: "/myleave" },
      ],
      leaveItems: [
        {
          title: "Padding Leave",
          icon: "mdi-book-clock",
          path: "/pending-leave",
        },
        {
          title: "Leave Report",
          icon: "mdi-file-chart-outline",
          path: "/leave-report",
        },
        {
          title: "News",
          icon: "mdi-file-chart-outline",
          path: "/news",
        },
        {
          title: "User",
          icon: "mdi-file-chart-outline",
          path: "/user",
        },
        {
          title: "Category",
          icon: "mdi-file-chart-outline",
          path: "/category",
        },
      ],
      userItems: [
        { title: "Profile", icon: "mdi-account", path: "/myprofile" },
        // { title: 'Change Password', icon: 'mdi-lock-reset',path:"/myprofile" },
        { title: "Logout", icon: "mdi-logout", path: "/" },
      ],
      userRole: "",
      userID: null,
      user: [{}],
      initails: "",
      username: "Pros Nob",
      com_logo: "",
    };
  },
  methods: {
    getUserProfile() {
      //   this.user = JsonData.Users.filter((us) => us.ID == this.userID);
      //   if (this.user[0].LastName == "") {
      //     this.initails = this.user[0].FirstName[0].toUpperCase();
      //     this.username = this.user[0].FirstName;
      //   } else {
      //     this.initails =
      //       this.user[0].LastName[0].toUpperCase() +
      //       this.user[0].FirstName[0].toUpperCase();
      //     this.username = this.user[0].LastName + " " + this.user[0].FirstName;
      //   }
    },

    GetPath(path) {
      this.$router.push(path).catch(() => {});
      // localStorage.setItem('path',path);
    },
    userProfile(path, title) {
      if (title == "Logout") {
        localStorage.clear();
      }
      this.$router.push(path).catch(() => {});
    },
  },
  mounted() {
    // this.com_logo = logo;
    this.userID = localStorage.getItem("userID");
    this.userRole = localStorage.getItem("role");
    // if(this.userRole!='admin'){
    //   this.items=[{ title: 'My Leave', icon: 'mdi-application',path:"/myleave" }];
    // }
    this.getUserProfile();
  },
};
</script>
