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
                <!-- <v-btn color="info" dark v-bind="props" style="margin-left: 20px">
                  Create
                </v-btn> -->
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
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
                          <v-select :items="userList" :rules="[required]" item-title="username" v-model="authorSelected"
                            label="Select author" color="primary" variant="outlined" persistent-hint return-object
                            single-line></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-textarea v-model="short_description" hide-details="auto" label="Description"
                            color="primary" rows="1" variant="outlined"></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row style="margin-top: -15px;">
                        <v-col cols="12">
                          <v-textarea v-model="content" :rules="[required]" hide-details="auto" label="Content"
                            color="primary" rows="1" variant="outlined"></v-textarea>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-file-input v-model="newImage" label="Image" color="primary"
                            variant="outlined"></v-file-input>
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
              <td style="width: 3%;">{{ item.ID }}</td>
              <td style="width: 20%;">{{ item.title }}</td>
              <td style="width: 20%;">{{ item.content }}</td>
              <td style="width: 20%;">{{ item.short_description }}</td>
              <td>{{ item.created_by }}</td>
              <td>{{ item.created_at }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <div @click="EditCategory(item)" style="
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
                  <div @click="DeleteCategory(item.ID, item.name)" style="
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
      <v-dialog v-model="dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class=" " primary-title> Delete Category </v-card-title>
          <hr />
          <v-card-text>
            <v-container>
              <v-row>
                <p>
                  Are you sure, you want to delete category <q>{{ title }}</q> ?
                </p>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions style="
              justify-content: center !important;
              margin-bottom: 20px;
              margin-top: 0px;
            ">
            <v-btn style="background-color: red; color: white" variant="text" @click="CloseDailogDelete">
              No
            </v-btn>
            <v-btn class="bg-info" style="background-color: rgb(8, 88, 145); color: white" @click="ConfirmDeleteItem">
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
      { title: "No", align: "", sortable: false, key: "ID" },
      { title: "Title", sortable: false, key: "name" },
      { title: "Content", sortable: false, key: "content" },
      { title: "Description", sortable: false, key: "description" },
      { title: "Created By", sortable: false, key: "created_by" },
      { title: "Created At", sortable: false, key: "created_at" },
      { title: "Action", sortable: false },
    ],
    title: "",
    categorySelected: null,
    authorSelected: null,
    newImage: "",
    content: "",
    short_description: "",

    NewsForm: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    newsList: [],
    userList: [["All"]],
    categoryList: [],
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
      const params = { page: this.page, itemPerPage: this.itemsPerPage };
      axios
        .get(process.env.VUE_APP_API_URL + "/news", { params })
        .then((res) => {
          this.newsList = res.data.data.news;
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
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
    getUser() {
      axios.get(process.env.VUE_APP_API_URL + "/users").then((res) => {
        let users = res.data.data.users;
        users.forEach((user) => {
          this.userList.push(user);
        });
        // this.userSelected = this.userList[0];
      });
    },

    // get Category List
    getCategoryList() {
      this.categoryList = [];
      axios.get(process.env.VUE_APP_API_URL + "/categories").then((res) => {
        if (res.data.data.categories.length > 0) {
          this.categoryList = res.data.data.categories;
        }

        console.log(this.categoryList);
      });
    },

    EditCategory(cat) {
      this.dialog = true;
      this.cat_id = cat.ID;
      this.name = cat.name;
      this.description = cat.description;
    },

    // Save News
    SaveNews() {
      let news = {
        userId: 1,
        categoryId: this.categorySelected.ID,
        authorId: this.authorSelected.ID,
        title: this.title,
        content: this.content,
        short_description: this.short_description,
        image: this.newImage.name,
        created_by: "Chanthy tha",
        updated_by: "Chanthy tha",
        updated_at: new Date()
        
      };

      console.log(news);

      axios.post(process.env.VUE_APP_API_URL + "/news", news, { validateStatus: () => true, }).then((res) => {
        this.message = res.data.message;
        this.AddUpdateData(res.data.id);
      });

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

    DeleteCategory(id, name) {
      this.dialogDelete = true;
      this.cat_id = id;
      this.name = name;
    },

    ConfirmDeleteItem() {
      axios
        .delete(process.env.VUE_APP_API_URL + "/category/" + this.cat_id, {
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
    this.getUser();
    this.getCategoryList();
  },

};
</script>
