<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      class="custom-sidebar"
    >
      <div class="logo">
        <div style="margin-left: 15px">
          <v-list-item :prepend-avatar="require('../assets/four_news.jpg')" nav> </v-list-item>

          <v-text v-if="!rail" class="logo-text ml-1">Four News</v-text>
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
                >Features</v-list-item-title
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
              <v-icon :icon="item.icon" class="icon-color"></v-icon>
            </template>
            <v-list-item-title
              v-text="item.title"
              style="font-size: 15px"
            ></v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-cog">
              <v-list-item-title style="font-size: 15px"
                >Setting</v-list-item-title
              >
            </v-list-item>
          </template>
          <v-list-item
            v-for="(item, i) in settingItems"
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
              <v-avatar v-if="userImage != ''" size="40px">
                <v-img :src="userImage" :alt="selectedDog" style=""></v-img>
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
<script>
// import JsonData from "@/assets/data.json";
// import logo from "@/assets/profiles/sdworks.png";
import axios from "axios";
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
        // { title: "Department", icon: "mdi-domain", path: "/department" },
        {
          title: "Users",
          icon: "mdi-account-group-outline",
          path: "/user",
        },
        // { title: "My Leave", icon: "mdi-application", path: "/myleave" },
      ],
      leaveItems: [
        // {
        //   title: "Padding Leave",
        //   icon: "mdi-book-clock",
        //   path: "/pending-leave",
        // },
        // {
        //   title: "Leave Report",
        //   icon: "mdi-file-chart-outline",
        //   path: "/leave-report",
        // },
        {
          title: "News",
          icon: "mdi-newspaper-variant-outline",
          path: "/news",
        },
        // {
        //   title: "User",
        //   icon: "mdi-file-chart-outline",
        //   path: "/user",
        // },
        {
          title: "Category",
          icon: "mdi-shape-plus",
          path: "/category",
        },
        {
          title: "Tag",
          icon: "mdi-tag-multiple",
          path: "/tag",
        },
        {
          title: "Author",
          icon: "mdi-account-tie",
          path: "/author",
        },
      ],
      settingItems: [
        {
          title: "Change Password",
          icon: "mdi-shield-key",
          path: "/change-password",
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
      username: "",
      userImage: "",
      com_logo: "",
      role: "",
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
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(
          process.env.VUE_APP_API_URL + "/auth/user",
          { headers },
          { validateStatus: () => true }
        )
        .then((res) => {
          this.username = res.data.result.username;
          this.userImage = res.data.result.profile;
          this.role = res.data.result.role;
          this.items = this.items.filter((element) => {
            return (
              element.path != "/user" ||
              this.role == "admin" ||
              this.role == "superAdmin"
            );
          });
        });
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
