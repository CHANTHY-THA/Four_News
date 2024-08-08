<template>
  <div class="custom-main-padding">
    <section class="stats">
      <div class="v-row">
        <v-col cols="3" v-for="item in stats" :key="item">
          <v-card class="mx-auto text-center" hover>
            <v-card-item>
              <v-card-title> {{ item.number }} </v-card-title>
            </v-card-item>
            <v-card-text style="font-size: 16px; font-weight: bold">
              {{ item.label }}
            </v-card-text>
            <!-- <v-card-title> {{ item.label }} </v-card-title> -->
          </v-card>
        </v-col>
      </div>
    </section>
    <section class="today-headlines">
      <div class="d-flex justify-space-between mb-2">
        <h2>Today's Headdlines</h2>
        <div class="">
          <v-btn variant="text" @click="onClickSeeAll">
            <span class="text-decoration-underline text-none"
              >See all <v-icon icon="mdi-chevron-double-right" start></v-icon
            ></span>
          </v-btn>
        </div>
      </div>
      <div class="news">
        <div class="v-row">
          <v-col cols="4" v-for="item in headlines" :key="item">
            <v-card class="i-custom-card">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    {{ item.title }}
                  </v-card-title>

                  <v-card-subtitle>{{ item.desc }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      class="ms-2"
                      size="small"
                      text="START RADIO"
                      variant="outlined"
                    ></v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" rounded="0" size="125">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                  ></v-img>
                </v-avatar>
              </div>
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
            <span class="text-decoration-underline text-none"
              >See all <v-icon icon="mdi-chevron-double-right" start></v-icon
            ></span>
          </v-btn>
        </div>
      </div>
      <div class="news">
        <div class="v-row">
          <v-col cols="4" v-for="item in featuredNews" :key="item">
            <v-card class="mx-auto" min-width="400">
              <v-img
                class="align-end text-white"
                height="200"
                :src="item.src"
                cover
              >
                <v-card-title>{{ item.title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>

              <v-card-text>
                {{ item.desc }}
              </v-card-text>
            </v-card>
          </v-col>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "DashboardView",
  components: {},
  data: () => ({
    headlines: [
      {
        id: 1,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 2,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 3,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 4,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 5,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 6,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
    ],
    featuredNews: [
      {
        id: 1,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 2,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
      {
        id: 3,
        title: "Supermodel",
        desc: "Foster the People",
        src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
      },
    ],
    stats: [
      {
        number: "42",
        label: "New leads this week",
      },
      {
        number: "$8,312",
        label: "Sales this week",
      },
      {
        number: "233",
        label: "New leads this month",
      },
      {
        number: "$24,748",
        label: "Sales this month",
      },
    ],
  }),
  computed: {},
  methods: {},
  mounted() {},
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
</style>
