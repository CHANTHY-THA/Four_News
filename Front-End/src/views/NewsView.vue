<template>
  <div>
    <div style="padding: 20px; background: #e0e0e0; height: 100%">
      <!-- block rearch -->
      <!-- <div>
        <v-row style="margin-top: 10px; margin-left: 10px; margin-right: 10px">
          <v-col cols="4">
            <v-text-field v-model="s_name" label="Name" color="primary" variant="underlined"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="s_descrition" label="Description" color="primary"
              variant="underlined"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select :items="userList" item-title="username" v-model="userSelected" label="--Select user--"
              color="primary" variant="underlined" return-object></v-select>
          </v-col>
        </v-row>
        <v-row style="
            margin-top: -10px;
            margin-bottom: 30px;
            margin-right: 15px;
            float: right;
            margin-left: 20px;
          ">
          <v-btn @click="searchNewsByFilter" style="cursor: pointer" color="blue">Search</v-btn>
        </v-row>
      </div> -->

      <!-- Data Table New List -->
      <v-card flat class="mt-2" style="width: 100%">
        <v-card-title class="d-flex align-center pe-2" style="padding: 15px;">
          News List
          <div>
            <v-dialog v-model="dialog" persistent transition="dialog-center-transition" max-width="800px">
              <template v-slot:activator="{ props }">
                <v-btn color="info" dark v-bind="props" style="margin-left: 20px">
                  Create
                </v-btn>
                <!-- <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn> -->
              </template>
              <v-card>
                <v-card-title style="padding: 15px" primary-title>
                  {{ formTitle }}
                </v-card-title>
                <hr />
                <v-card-text>
                  <v-container>
                    <v-form v-model="NewsForm">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field v-model="title" :rules="[required]" hide-details="auto" label="Title"
                            color="primary" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select :items="categoryList" :rules="[required]" item-title="name"
                            v-model="categorySelected" label="Select category" color="primary" variant="outlined"
                            persistent-hint return-object single-line></v-select>
                        </v-col>
                      </v-row>
                      <v-row style="margin-top: -15px;">
                        <v-col cols="6">
                          <v-select :items="authorList" :rules="[required]" item-title="username"
                            v-model="authorSelected" label="Select author" color="primary" variant="outlined"
                            persistent-hint return-object single-line></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select :items="tagList" :rules="[required]" item-title="name" v-model="tagSelected"
                            label="Select tag" color="primary" variant="outlined" persistent-hint return-object
                            single-line></v-select>
                        </v-col>
                      </v-row>
                      <v-row style="margin-top: -15px;">
                        <v-col cols="6">
                          <v-textarea v-model="content" :rules="[required]" hide-details="auto" label="Content"
                            color="primary" rows="1" variant="outlined"></v-textarea>
                        </v-col>
                        <v-col cols="6">
                          <v-textarea v-model="short_description" hide-details="auto" label="Description"
                            color="primary" rows="1" variant="outlined"></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <input type="file" @change="onFileChange" accept="image/*" />
                          <!-- <v-file-input v-model="image" @change="onFileChange" label="Image" counter show-size
                            small-chips color="primary" truncate-length="50" variant="outlined"></v-file-input> -->
                        </v-col>
                        <v-col cols="6" v-if="image">
                          <v-img :src="image" max-height="160px" max-width="160px"></v-img>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions style="
                    justify-content: center !important;
                    margin-bottom: 20px;
                    margin-top: -25px;
                  ">
                  <v-btn style="background-color: gray; color: white" variant="outlined" @click="CloseFormAddEdit">
                    Cancel
                  </v-btn>
                  <v-btn :disabled="!NewsForm" class="bg-info"
                    style="background-color: rgb(8, 88, 145); color: white; margin-left: 5%;" @click="SaveNews">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="newsList"
          :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems">
          <template v-slot:item="{ item }">
            <tr>
              <td style="width: 20%;">
                <!-- <img :src="item.image" max-height="150px" max-width="170px" alt="" /> -->
                <v-img :src="image" max-height="200px" max-width="200px"></v-img>
              </td>
              <td style="width: 20%;">
                <h3>{{ item.title }}</h3>
                <!-- <p style="margin-top: 10px;">{{ item.content }}</p> -->
                <p style="margin-top: 5px;color: gray;">Author by: {{ item.author ? item.author.username : "" }}</p>
              </td>
              <!-- <td style="width: 20%;">{{ item.content }}</td> -->
              <td style="width: 20%;">{{ item.short_description }}</td>
              <!-- <td>{{ item.author ? item.author.username : "" }}</td> -->
              <td>{{ item.created_by }}</td>
              <td>{{ item.created_at }}</td>
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
            <v-btn class="bg-info" style="background-color: rgb(8, 88, 145); color: white; margin-left: 5%;"
              @click="ConfirmDeleteItem">
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
      { title: "", align: "", sortable: false, },
      { title: "Title", sortable: false, key: "name" },
      // { title: "Content", sortable: false, key: "content" },
      { title: "Description", sortable: false, key: "description" },
      // { title: "Author By", sortable: false, key: "author" },
      { title: "Created By", sortable: false, key: "created_by" },
      { title: "Created At", sortable: false, key: "created_at" },
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
    // imageUrl: null,
    selectedFile: null,
    // news_url: process.env.VUE_APP_API_URL + "/images/",

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
      if (
        this.s_name != "" ||
        this.s_descrition != "" ||
        this.userSelected != null
      ) {
        this.searchCategory();
      } else {
        this.getNewsList();
      }
    },

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
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;

          console.log(this.newsList);

        });
    },

    // search news by filter
    searchNewsByFilter() {
      if (
        this.s_name != "" ||
        this.s_descrition != "" ||
        this.userSelected != null
      ) {
        if (this.userSelected != null) {
          this.username =
            this.userSelected == "All"
              ? this.userSelected
              : this.userSelected.username;
        }
        let params = {
          page: this.page,
          itemPerPage: this.itemsPerPage,
          name: this.s_name,
          description: this.s_descrition,
          created_by: this.username,
        };
        axios
          .get(
            process.env.VUE_APP_API_URL + "/categories/filter",
            { params },
            { validateStatus: () => false }
          )
          .then((res) => {
            this.newsList = res.data.data.categories;
            this.totalItems = res.data.data.pagination.total_record;
            this.loading = false;
          })
          .catch((error) => {
            this.newsList = [];
            console.log(error);
          });
      }
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
      axios.get(process.env.VUE_APP_API_URL + "/authors", { headers }).then((res) => {
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
      axios.get(process.env.VUE_APP_API_URL + "/categories", { headers }).then((res) => {
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
      axios.get(process.env.VUE_APP_API_URL + "/tags", { headers }).then((res) => {
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
      // this.tagSelected = news.tag;
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
      // this.createBase64Image(selectedImage);

      if (file) {
        this.image = URL.createObjectURL(file);
      } else {
        this.image = null;
      }
    },

    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.image = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },

    // Save News
    SaveNews() {
      let formData = new FormData();
      formData.append('file', this.image);

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
        updated_at: new Date()
      };

      console.log(news);

      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (this.newsID > 0) {
        try {
          axios.put(process.env.VUE_APP_API_URL + "/news", news, { headers }, { validateStatus: () => true, }).then((res) => {
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
          axios.post(process.env.VUE_APP_API_URL + "/news", news, { headers }, { validateStatus: () => true, }).then((res) => {
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
        .delete(process.env.VUE_APP_API_URL + "/news/" + this.newsID, { headers }, {
          validateStatus: () => true,
        })
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
    this.getCategoryList();
    this.getAuthorList();
    this.getTagList();
  },

};
</script>
