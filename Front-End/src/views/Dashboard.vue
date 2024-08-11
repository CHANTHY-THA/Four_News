<template>
  <div class="custom-main-padding">
    <section class="stats">
      <div class="v-row">
        <!-- <v-col cols="3" v-for="item in stats" :key="item">
          <v-card class="mx-auto text-center" hover>
            <v-card-item>
              <v-card-title> {{ item.number }} </v-card-title>
            </v-card-item>
            <v-card-text style="font-size: 16px; font-weight: bold">
              {{ item.label }}
            </v-card-text>
          </v-card>
        </v-col> -->

        <v-col cols="3">
          <router-link :to="{ name: 'user' }" style="text-decoration: none;">
            <v-card class="mx-auto text-center" hover>
              <v-card-item>
                <v-card-title> {{ countUser }} </v-card-title>
              </v-card-item>
              <v-card-text style="font-size: 16px; font-weight: bold">
                Users
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="3">
          <router-link :to="{ name: 'author' }" style="text-decoration: none;">
            <v-card class="mx-auto text-center" hover>
              <v-card-item>
                <v-card-title> {{ countAuthor }} </v-card-title>
              </v-card-item>
              <v-card-text style="font-size: 16px; font-weight: bold">
                Authors
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="3">
          <router-link :to="{ name: 'news' }" style="text-decoration: none;">
            <v-card class="mx-auto text-center" hover>
              <v-card-item>
                <v-card-title> {{ countNews }} </v-card-title>
              </v-card-item>
              <v-card-text style="font-size: 16px; font-weight: bold">
                News
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
        <v-col cols="3">
          <router-link :to="{ name: 'category' }" style="text-decoration: none;">
            <v-card class="mx-auto text-center" hover>
              <v-card-item>
                <v-card-title> {{ countCategory }} </v-card-title>
              </v-card-item>
              <v-card-text style="font-size: 16px; font-weight: bold">
                Category
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </div>
    </section>
    <section class="today-headlines">
      <div class="d-flex justify-space-between mb-2">
        <h2>News Today</h2>
        <div class="">
          <v-btn variant="text" @click="onClickSeeAll">
            <span class="text-decoration-underline text-none">See all <v-icon icon="mdi-chevron-double-right"
                start></v-icon></span>
          </v-btn>
        </div>
      </div>
      <div class="news">
        <div class="v-row">
          <v-col cols="4" v-for="item in newsList" :key="item">
            <v-card class="i-custom-card mx-auto news-card" min-width="400" hover>
              <!-- <div class="d-flex flex-no-wrap justify-space-between">
                <div> -->
              <v-img :src="item.image" :alt="selectedDog" style="" max-height="460px" max-width="460px" cover></v-img>

              <v-card-title class="text-h6">
                {{ item.title }}
              </v-card-title>

              <v-card-subtitle>{{ item.short_description }}</v-card-subtitle>

              <router-link :to="{ name: 'news/detail', params: { id: item.ID } }" style="text-decoration: none;">
                <v-card-actions>
                  <v-btn class="ms-2" size="small" text="START RADIO" variant="outlined"></v-btn>
                </v-card-actions>
              </router-link>
              <!-- </div> -->

              <!-- <v-avatar class="ma-3" rounded="0" size="125">
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                </v-avatar> -->
              <!-- </div> -->
            </v-card>
          </v-col>
        </div>
      </div>
    </section>
    <section class="featured-news">
      <div class="d-flex justify-space-between mb-2">
        <h2>Featured News</h2>
        <div class="">
          <v-btn variant="text" @click="onClickSeeAll">
            <span class="text-decoration-underline text-none">See all <v-icon icon="mdi-chevron-double-right"
                start></v-icon></span>
          </v-btn>
        </div>
      </div>
      <div class="news">
        <div class="v-row">
          <v-col cols="4" v-for="item in newsList" :key="item">
            <router-link :to="{ name: 'news/detail', params: { id: item.ID } }" style="text-decoration: none;">
              <v-card class="mx-auto news-card" min-width="400" hover>
                <!-- <v-img class="align-end text-white" height="200" :src="item.src" cover> -->
                <v-img :src="item.image" :alt="selectedDog" style="" max-height="460px" max-width="460px">
                  <v-card-title style="color: white;">{{ item.title }}</v-card-title>
                </v-img>

                <!-- <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle> -->

                <v-card-text>
                  {{ item.short_description }}
                </v-card-text>
              </v-card>
            </router-link>
          </v-col>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

import axios from "axios";
export default {
  name: "DashboardView",
  components: {},
  data: () => ({
    // headlines: [
    //   {
    //     id: 1,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 2,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 3,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 4,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 5,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 6,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    // ],
    // featuredNews: [
    //   {
    //     id: 1,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 2,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    //   {
    //     id: 3,
    //     title: "Supermodel",
    //     desc: "Foster the People",
    //     src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
    //   },
    // ],
    // stats: [
    //   {
    //     number: "42",
    //     label: "New leads this week",
    //   },
    //   {
    //     number: "$8,312",
    //     label: "Sales this week",
    //   },
    //   {
    //     number: "233",
    //     label: "New leads this month",
    //   },
    //   {
    //     number: "$24,748",
    //     label: "Sales this month",
    //   },
    // ],

    newsList: [],
    countUser: 0,
    countAuthor: 0,
    countNews: 0,
    countCategory: 0,
    loading: true,
  }),
  computed: {},
  methods: {

    // Get News List
    getNewsList() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = { page: this.page, itemPerPage: this.itemsPerPage };

      axios
        .get(process.env.VUE_APP_API_URL + "/news", { params, headers })
        .then((res) => {
          this.newsList = res.data.data.news;
          this.loading = false;
        });
    },

    // load data
    onLoadData() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      axios.get(process.env.VUE_APP_API_URL + "/countUser", { headers }, { validateStatus: () => true }).then((res) => {
        this.countUser = res.data.data;
      }).catch((err) => {
        console.log(err);
      });

      axios.get(process.env.VUE_APP_API_URL + "/countAuthor", { headers }, { validateStatus: () => true }).then((res) => {
        this.countAuthor = res.data.data;
      }).catch((err) => {
        console.log(err);
      });

      axios.get(process.env.VUE_APP_API_URL + "/countNews", { headers }, { validateStatus: () => true }).then((res) => {
        this.countNews = res.data.data;
      }).catch((err) => {
        console.log(err);
      });

      axios.get(process.env.VUE_APP_API_URL + "/countCategory", { headers }, { validateStatus: () => true }).then((res) => {
        this.countCategory = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    }
  },

  mounted() {
    this.getNewsList();
    this.onLoadData();
  },

};
</script>

<style lang="scss" scoped>
.i-custom-card {
  background-color: white;
}

.today-headlines,
.featured-news {
  margin-top: 20px;
}

.news-card:hover {
  background: rgba(144, 146, 144, 0.176);
}
</style>
