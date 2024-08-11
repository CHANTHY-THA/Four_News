<template>
  <div>
    <div style="padding: 20px; background: #e0e0e0; height: 100%">
      <!-- Data Table New List -->
      <v-card flat class="mt-2" style="width: 100%">
        <v-divider></v-divider>
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="newsList"
          :items-length="totalItems" :loading="loading" item-value="name" :search="search" @update:options="loadItems">
          <template v-slot:item="{ item }">
            <tr>
              <td style="width: 20%; padding: 10px; cursor: pointer;">
                <v-img :src="item.image" :alt="selectedDog" style="" max-height="200px" max-width="200px"></v-img>
              </td>
              <td style="width: 30%; padding: 10px;">
                <h3>{{ item.title }}</h3>
                <p style="margin-top: 5px; color: gray">
                  Author by: {{ item.author ? item.author.username : "" }}
                </p>
                <p style="margin-top: 5px; color: gray">
                  Created by: {{ item.created_by }}
                </p>
                <p style="margin-top: 5px; color: gray">
                  Created at: {{ item.created_at }}
                </p>
              </td>
              <td style="width: 40%; padding: 10px;">{{ item.short_description }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <div @click="EditNews(item)" style="
                      margin-right: 5px;
                      background: green;
                      border-radius: 50%;
                      width: 30px;
                      height: 30px;
                      align-items: center !important;
                      display: flex;
                      justify-content: center !important;
                      cursor: pointer;
                    ">
                    <v-icon size="17" color="white"> mdi-pencil</v-icon>
                    <ToolTipMessage message="Edit Category"></ToolTipMessage>
                  </div>
                  <div @click="DeleteNewsByID(item)" style="
                      background: red;
                      border-radius: 50%;
                      width: 30px;
                      height: 30px;
                      align-items: center !important;
                      display: flex;
                      justify-content: center !important;
                      cursor: pointer;
                      margin-left: 5px;
                    ">
                    <v-icon size="17" color="white"> mdi-delete</v-icon>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table-server>
      </v-card>

      <!-- delete news by ID -->
      <v-dialog v-model="dialogDelete" persistent max-width="700px">
        <v-card>
          <v-card-title primary-title> Delete News </v-card-title>
          <hr />
          <v-card-text>
            <v-container>
              <v-row>
                <p>
                  Are you sure to delete <q>{{ title }}</q> ?
                </p>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions style="
              justify-content: center !important;
              margin-bottom: 20px;
              margin-top: 0px;
            ">
            <v-btn style="background-color: gray; color: white" variant="text" @click="CloseDailogDelete">
              No
            </v-btn>
            <v-btn class="bg-info" style="
                background-color: rgb(8, 88, 145);
                color: white;
                margin-left: 5%;
              " @click="ConfirmDeleteItem">
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Alert message -->
      <AlertMessage v-model="snackbar" :message="message" :background="backgroundColor" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AlertMessage from "@/components/AlertMessage.vue";

export default {
  components: {
    AlertMessage,
  },
  data: () => ({
    headers: [
      { title: "", align: "", sortable: false },
      { title: "Title", sortable: false, key: "name" },
      { title: "Description", sortable: false, key: "description" },
      { title: "Action", sortable: false },
    ],

    newsID: 0,
    title: "",
    categorySelected: null,
    authorSelected: null,
    tagSelected: null,
    content: "",
    short_description: "",
    image: null,
    imageFile: null,
    selectedFile: null,
    search: null,

    NewsForm: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    newsList: [],
    userList: [["All"]],
    authorList: [],
    categoryList: [],
    tagList: [],
    loading: true,
    totalItems: 0,
    cat_id: 0,
    itemName: "",
    message: "",
    backgroundColor: "",
    page: 1,
    itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,
    userSelected: null,
    s_name: "",
    s_descrition: "",
    username: "",
  }),

  computed: {
    formTitle() {
      return this.cat_id === 0 ? "Create News" : "Update News";
    },
  },

  methods: {
    required(v) {
      return !!v || "Field is required";
    },

    loadItems({ page, itemsPerPage }) {
      this.page = page;
      this.itemsPerPage = itemsPerPage;
      this.searchNews();
    },

    // search news by filter
    searchNews() {
      const params = {
        page: this.page,
        itemPerPage: this.itemsPerPage,
        title: this.search,
      };

      axios
        .get(
          process.env.VUE_APP_API_URL + "/news/filter",
          { params },
          { validateStatus: () => false }
        )
        .then((res) => {
          this.newsList = res.data.data.news;
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
        })
        .catch((error) => {
          this.newsList = [];
          console.log(error);
        });
    },

    // Get News List
    getNewsByID() {
      // let token = localStorage.getItem("authToken");
      // let headers = {
      //   Authorization: `Bearer ${token}`,
      // };

      const params = this.$route.params.id;

      console.log("My Params: " ,params);

      // axios
      //   .get(process.env.VUE_APP_API_URL + "/news/:id", { params, headers })
      //   .then((res) => {
      //     this.newsList = res.data.data.news;
      //     this.totalItems = res.data.data.pagination.total_record;
      //     this.loading = false;

      //     console.log(this.newsList);
      //   });
    },

    // get User List
    // getUser() {
    //   let token = localStorage.getItem("authToken");
    //   let headers = {
    //     Authorization: `Bearer ${token}`,
    //   };

    //   axios.get(process.env.VUE_APP_API_URL + "/users", { headers }).then((res) => {
    //     let users = res.data.data.users;
    //     users.forEach((user) => {
    //       this.userList.push(user);
    //     });
    //     // this.userSelected = this.userList[0];
    //   });
    // },

    // get Author List
    getAuthorList() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      this.authorList = [];
      axios
        .get(process.env.VUE_APP_API_URL + "/authors", { headers })
        .then((res) => {
          if (res.data.data.authors.length > 0) {
            this.authorList = res.data.data.authors;
          }
        });
    },

    // get Category List
    getCategoryList() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      this.categoryList = [];
      axios
        .get(process.env.VUE_APP_API_URL + "/categories", { headers })
        .then((res) => {
          if (res.data.data.categories.length > 0) {
            this.categoryList = res.data.data.categories;
          }
        });
    },

    // get Tag List
    getTagList() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      this.tagList = [];
      axios
        .get(process.env.VUE_APP_API_URL + "/tags", { headers })
        .then((res) => {
          if (res.data.data.tags.length > 0) {
            this.tagList = res.data.data.tags;
          }
        });
    },

    // edit news by ID
    EditNews(news) {
      this.dialog = true;
      this.newsID = news.ID;
      this.categorySelected = news.category;
      this.authorSelected = news.author;
      this.tagSelected = news.tag;
      this.title = news.title;
      this.content = news.content;
      this.short_description = news.short_description;
      this.image = news.image;
    },

    DeleteNewsByID(news) {
      this.dialogDelete = true;
      this.newsID = news.ID;
      this.title = news.title;
    },

    // select image
    onFileChange(e) {
      const file = e.target.files[0];

      if (file) {
        this.image = URL.createObjectURL(file);
        this.imageFile = file;
      } else {
        this.image = null;
      }
    },

    // Save News
    async SaveNews() {
      let formData = new FormData();
      formData.append("file", this.imageFile);

      let news = {
        id: this.newsID,
        userId: 5,
        categoryId: this.categorySelected.ID,
        authorId: this.authorSelected.ID,
        tagId: this.tagSelected.ID,
        title: this.title,
        content: this.content,
        short_description: this.short_description,
        image: "",
        updated_at: new Date(),
      };

      console.log(news);

      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios
        .post(
          process.env.VUE_APP_API_URL + "/uploadImage",
          formData,
          { headers },
          { validateStatus: () => true }
        )
        .then((res) => {
          news.image = res.data.data.filename;
        });

      if (this.newsID > 0) {
        try {
          axios
            .put(
              process.env.VUE_APP_API_URL + "/news",
              news,
              { headers },
              { validateStatus: () => true }
            )
            .then((res) => {
              this.message = res.data.message;
              this.AddUpdateData(res.data.id);

              // setInterval(() => {
              //   this.categorySelected = null;
              //   this.authorSelected = null;
              //   this.tagSelected = null;
              //   this.title = null;
              //   this.content = null;
              //   this.short_description = null;
              //   this.image = null;
              // }, 4000);
            });
        } catch (err) {
          console.log(err);
          this.message = err.response.data.error;
        }
      } else {
        try {
          axios
            .post(
              process.env.VUE_APP_API_URL + "/news",
              news,
              { headers },
              { validateStatus: () => true }
            )
            .then((res) => {
              this.message = res.data.message;
              this.AddUpdateData(res.data.id);

              setInterval(() => {
                this.categorySelected = null;
                this.authorSelected = null;
                this.tagSelected = null;
                this.title = null;
                this.content = null;
                this.short_description = null;
                this.image = null;
              }, 4000);
            });
        } catch (err) {
          console.log(err);
          this.message = err.response.data.error;
        }
      }
    },

    AddUpdateData(res_id) {
      if (res_id == 1) {
        this.backgroundColor = "green";
      } else {
        this.backgroundColor = "red";
      }
      this.snackbar = true;
      this.getNewsList();
      this.CloseFormAddEdit();
    },

    // delete news by ID
    ConfirmDeleteItem() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .delete(
          process.env.VUE_APP_API_URL + "/news/" + this.newsID,
          { headers },
          {
            validateStatus: () => true,
          }
        )
        .then((res) => {
          this.message = res.data.message;
          if (res.data.id == 1) {
            this.backgroundColor = "green";
          } else {
            this.backgroundColor = "green";
          }
          this.snackbar = true;
          this.getNewsList();
          this.CloseDailogDelete();
        });
    },

    CloseFormAddEdit() {
      this.dialog = false;
      this.cat_id = 0;
      this.name = "";
      this.description = "";
    },

    CloseDailogDelete() {
      this.dialogDelete = false;
      this.CloseFormAddEdit();
    },
  },

  // Mounted Method
  mounted() {
    // this.getUser();
    // this.getCategoryList();
    // this.getAuthorList();
    // this.getTagList();
    this.getNewsByID();
  },
};
</script>
