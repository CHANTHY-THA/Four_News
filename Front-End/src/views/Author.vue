<template>
  <div class="custom-main-padding">
    <!-- block rearch -->
    <div>
      <v-row>
        <v-col cols="6">
          <v-select
            v-model="filter.created_by"
            :items="userList"
            item-title="username"
            item-value="username"
            clearable
            density="compact"
            label="--Select Created_by--"
            color="primary"
            variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="filter.username"
            :items="authorfilterList"
            item-title="username"
            item-value="username"
            clearable
            density="compact"
            label="--Select author--"
            color="primary"
            variant="underlined"
          ></v-select>
        </v-col>
      </v-row>
      <v-row
        style="
          margin-top: -10px;
          margin-bottom: 17px;
          margin-right: 15px;
          float: right;
          margin-left: 20px;
        "
      >
        <v-btn @click="filterAuthor" class="background-btn-color">Filter</v-btn>
      </v-row>
    </div>
    <div class="px-4 py-2">
      <template v-for="(item, key) in filter_apply">
        <v-chip
          small
          class="mr-2 mb-1"
          v-if="item.value"
          :key="key"
          closable
          @click:close="removeFilter(key)"
        >
          <strong>{{ item.label }}:</strong>&nbsp;
          <span class="filter-chip-value">{{ item.value }}</span>
        </v-chip>
      </template>
    </div>
    <div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="authorList"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="username"
        @update:options="loadItems"
        class="custom-table"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="custom-toolbar">
            <v-toolbar-title>Author List</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
              class="me-3 btn-search custom-text-field"
            ></v-text-field>
            <div>
              <!-- add and edit form -->
              <v-dialog
                v-model="dialog"
                persistent
                transition="dialog-center-transition"
                max-width="500px"
                class="custom-add-dialog"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="info"
                    dark
                    class="mb-2 float-right i-btn-add background-btn-color"
                    v-bind="props"
                  >
                    Create
                    <!-- <ToolTipMessage message="Add New User"></ToolTipMessage> -->
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title style="padding: 15px" primary-title>
                    {{ formTitle }}
                  </v-card-title>
                  <hr />

                  <v-card-text>
                    <v-container>
                      <v-form v-model="form">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="username"
                              :rules="[required]"
                              density="compact"
                              label="Username"
                              color="primary"
                              variant="outlined"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row style="margin-top: -15px">
                          <v-col cols="12">
                            <v-textarea
                              clearable
                              label="Biography"
                              v-model="biography"
                              variant="outlined"
                              color="primary"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions
                    style="
                      justify-content: center !important;
                      margin-bottom: 20px;
                      margin-top: -25px;
                    "
                  >
                    <v-btn
                      style="background-color: red; color: white"
                      variant="text"
                      @click="CloseFormAddEdit"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      :disabled="!form"
                      class="bg-info"
                      style="background-color: rgb(8, 88, 145); color: white"
                      @click="saveAuthor"
                    >
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.ID }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.biography }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="d-flex">
                <div @click="EditAuthor(item)" class="custom-edit">
                  <v-icon size="17" color="white"> mdi-pencil</v-icon>
                  <ToolTipMessage message="Edit User"></ToolTipMessage>
                </div>
                <div
                  @click="DeleteAuthor(item.ID, item.username)"
                  class="custom-delete"
                >
                  <v-icon size="17" color="white"> mdi-delete</v-icon>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table-server>
      <v-dialog v-model="dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class=" " primary-title> Delete User </v-card-title>
          <hr />
          <v-card-text>
            <v-container>
              <v-row>
                <p>
                  Are you sure, you want to delete user <q>{{ username }}</q> ?
                </p>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions
            style="
              justify-content: center !important;
              margin-bottom: 20px;
              margin-top: 0px;
            "
          >
            <v-btn
              style="background-color: red; color: white"
              variant="text"
              @click="CloseDailogDelete"
            >
              No
            </v-btn>
            <v-btn
              class="bg-info"
              style="background-color: rgb(8, 88, 145); color: white"
              @click="ConfirmDeleteItem"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Alert message -->
      <AlertMessage
        v-model="snackbar"
        :message="message"
        :background="backgroundColor"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AlertMessage from "@/components/AlertMessage.vue";
// import AppLayout from "../layouts/AppLayout.vue";
export default {
  name: "AuthorView",
  components: {
    AlertMessage,
    // AppLayout,
  },
  data: () => ({
    headers: [
      { title: "ID", align: "", sortable: false, key: "ID" },
      { title: "username", sortable: false, key: "username" },
      { title: "biography", sortable: false, key: "biography" },
      { title: "Created by", sortable: false, key: "created_by" },
      { title: "CreatedAt", sortable: false, key: "created_at" },
      { title: "Action", sortable: false },
    ],
    username: "",
    biography: "",
    author_id: 0,

    userList: [],
    filter: {
      created_by: null,
      username: null,
    },
    filter_apply: {
      created_by: {
        label: "Created By",
        value: null,
      },
      username: {
        label: "author name",
        value: null,
      },
    },
    authorfilterList: [],

    form: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    authorList: [],
    loading: true,
    totalItems: 0,
    itemName: "",
    message: "",
    backgroundColor: "",
    page: 1,
    itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,

    search: "",
  }),
  computed: {
    formTitle() {
      return this.author_id === 0 ? "Add New Author" : "Update Author";
    },
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    loadItems({ page, itemsPerPage }) {
      this.page = page;
      this.itemsPerPage = itemsPerPage;
      this.getUser();
      console.log(this.filter.created_by);
      if (this.filter.created_by != null || this.filter.username != null) {
        this.filterAuthor();
      } else {
        this.getAuthor();
      }
    },
    getAuthor() {
      const params = {
        page: this.page,
        itemPerPage: this.itemsPerPage,
        search: this.search,
      };
      axios
        .get(process.env.VUE_APP_API_URL + "/authors", { params })
        .then((res) => {
          this.authorList = res.data.data.authors;
          this.authorfilterList = res.data.data.authors;
          console.log(
            "🚀 ~ file: User.vue:279 ~ .then ~ authorList:",
            this.authorList
          );
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
        });
    },
    getUser() {
      axios.get(process.env.VUE_APP_API_URL + "/allUsers").then((res) => {
        this.userList = res.data.data.users;
      });
    },

    filterAuthor() {
      if (this.filter.created_by != null || this.filter.username != null) {
        this.filter_apply.created_by.value = this.filter.created_by;
        this.filter_apply.username.value = this.filter.username;

        if (this.filter.created_by === null) {
          this.filter.created_by = "";
        }
        if (this.filter.username === null) {
          this.filter.username = "";
        }
        // console.log(this.search);
        let params = {
          page: this.page,
          itemPerPage: this.itemsPerPage,
          created_by: this.filter.created_by,
          username: this.filter.username,
          search: this.search,
        };
        console.log("params", params);
        let token = localStorage.getItem("authToken");
        let headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .get(
            process.env.VUE_APP_API_URL + "/authors/filter",
            { params, headers },
            { validateStatus: () => false }
          )
          .then((res) => {
            console.log("authorList", res.data.data.authors);
            this.authorList = res.data.data.authors;
            this.totalItems = res.data.data.pagination.total_record;
            this.loading = false;
          })
          .catch((error) => {
            this.authorList = [];
            console.log(error);
          });
      }
    },

    EditAuthor(author) {
      console.log("author: ", author.ID);
      this.dialog = true;
      this.author_id = author.ID;
      this.username = author.username;
      this.biography = author.biography;
    },
    saveAuthor() {
      let author = {
        id: this.author_id,
        username: this.username,
        biography: this.biography,
      };
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      if (this.author_id > 0) {
        axios
          .put(
            process.env.VUE_APP_API_URL + "/author",
            author,
            { headers },
            {
              validateStatus: () => true,
            }
          )
          .then((res) => {
            this.message = res.data.message;
            this.AddUpdateData(res.data.id);
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_API_URL + "/author",
            author,
            { headers },
            {
              validateStatus: () => true,
            }
          )
          .then((res) => {
            this.message = res.data.message;
            this.AddUpdateData(res.data.id);
          });
      }
    },

    AddUpdateData(res_id) {
      if (res_id == 1) {
        this.backgroundColor = "green";
      } else {
        this.backgroundColor = "red";
      }
      this.snackbar = true;
      this.getAuthor();
      this.CloseFormAddEdit();
    },
    DeleteAuthor(id, username) {
      this.dialogDelete = true;
      this.author_id = id;
      this.username = username;
    },
    ConfirmDeleteItem() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(
          process.env.VUE_APP_API_URL + "/author/" + this.author_id,
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
          this.getAuthor();
          this.CloseDailogDelete();
        });
    },
    CloseFormAddEdit() {
      this.dialog = false;
      this.author_id = 0;
      this.username = "";
      this.biography = "";
    },
    CloseDailogDelete() {
      this.dialogDelete = false;
      this.CloseFormAddEdit();
    },
    removeFilter(data) {
      this.filter[data] = null;
      console.log("filter1", this.filter);
      if (this.filter.created_by != null || this.filter.username != null) {
        this.filterAuthor();
      } else {
        this.getAuthor();
      }
    },
  },
  mounted() {
    this.getAuthor();
  },
};
</script>
