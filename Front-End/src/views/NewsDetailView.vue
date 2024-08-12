<template>
  <div>
    <div style="padding: 20px; background: #e0e0e0; height: 100%">
      <!-- News Detail -->
      <div class="news">
        <div class="v-row">
          <v-col cols="2"></v-col>
          <v-col cols="8" v-for="item in newsDetail" :key="item">
            <v-card class="mx-auto news-card" min-width="400" hover>
              <h3 style="margin: 15px;">{{ item.title }}</h3>
              <v-img :src="item.image" :alt="selectedDog" style="" max-height="1000px" max-width="1000px">
              </v-img>
              <v-card-text>{{ item.short_description }}</v-card-text>
              <v-card-text>{{ item.content }}</v-card-text>

              <v-card-subtitle class="mb-4">
                <P>Author by: {{ item.author ? item.author.username : "" }} </P>
                <P>Created by: {{ item.created_by }} </P>
                <P>Created at: {{ item.created_at }} </P>
              </v-card-subtitle>

              <router-link :to="{ name: 'news' }" style="text-decoration: none;">
                <v-card-actions>
                  <v-btn class="ms-2" size="small" text="Back" variant="outlined"></v-btn>
                </v-card-actions>
              </router-link>
            </v-card>
          </v-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  components: {

  },
  data: () => ({
    newsDetail: [],
    loading: true,
  }),

  computed: {
  },

  methods: {
    // Get newsDetail List
    getNewsByID() {
      let token = localStorage.getItem("authToken");
      let headers = { Authorization: `Bearer ${token}`, };
      const id = this.$route.params.id;
      axios.get(process.env.VUE_APP_API_URL + "/newsDetail/" + id, { headers }).then((res) => {
        this.newsDetail = [res.data.data.news];
        this.loading = false;
      });
    },

  },

  // Mounted Method
  mounted() {
    this.getNewsByID();
  },
};
</script>
