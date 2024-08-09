<template>
  <div class="custom-main-padding">
    <!-- block rearch -->
    <div>
      <v-row style="margin-top: 10px; margin-left: 10px; margin-right: 10px">
        <v-col cols="4">
          <v-text-field
            v-model="s_name"
            label="Name"
            color="primary"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="s_descrition"
            label="Description"
            color="primary"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            :items="userList"
            item-title="username"
            v-model="userSelected"
            label="--Select user--"
            color="primary"
            variant="underlined"
            return-object
          ></v-select>
        </v-col>
      </v-row>
      <v-row
        style="
          margin-top: -10px;
          margin-bottom: 30px;
          margin-right: 15px;
          float: right;
          margin-left: 20px;
        "
      >
        <!-- <v-icon @click="searchCategory" size="50" color="blue" style="cursor: pointer;"> mdi-card-search</v-icon> -->
        <v-btn @click="searchCategory" style="cursor: pointer" color="blue"
          >Filter</v-btn
        >
      </v-row>
    </div>

    <!-- datatable -->
    <v-card flat class="mt-2" style="width: 100%">
      <v-card-title
        class="d-flex align-center justify-space-between pe-2"
        style="padding: 15px"
      >
        Category List
        <!-- <v-spacer></v-spacer> -->
        <!-- add and edit  form -->
        <div>
          <v-dialog
            v-model="dialog"
            persistent
            transition="dialog-center-transition"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn color="info" dark v-bind="props" style="margin-left: 20px">
                Create
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
                          v-model="name"
                          :rules="[required]"
                          density="compact"
                          label="Category Name"
                          color="primary"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row style="margin-top: -15px">
                      <v-col cols="12">
                        <v-text-field
                          v-model="description"
                          :rules="[required]"
                          density="compact"
                          label="Description"
                          color="primary"
                          variant="outlined"
                        ></v-text-field>
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
                  @click="SaveCategory"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="categoryList"
        :items-length="totalItems"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.ID }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="d-flex">
                <div
                  @click="EditCategory(item)"
                  style="
                    margin-right: 5px;
                    background: green;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    align-items: center !important;
                    display: flex;
                    justify-content: center !important;
                  "
                >
                  <v-icon size="17" color="white"> mdi-pencil</v-icon>
                  <ToolTipMessage message="Edit Category"></ToolTipMessage>
                </div>
                <div
                  @click="DeleteCategory(item.ID, item.name)"
                  style="
                    background: red;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    align-items: center !important;
                    display: flex;
                    justify-content: center !important;
                  "
                >
                  <v-icon size="17" color="white"> mdi-delete</v-icon>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-card>

    <!-- dialog delete -->
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class=" " primary-title> Delete Category </v-card-title>
        <hr />
        <v-card-text>
          <v-container>
            <v-row>
              <p>
                Are you sure, you want to delete category <q>{{ name }}</q> ?
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
      { title: "ID", align: "", sortable: false, key: "ID" },
      { title: "Name", sortable: false, key: "name" },
      { title: "Description", sortable: false, key: "description" },
      { title: "CreatedBy", sortable: false, key: "created_by" },
      { title: "CreatedAt", sortable: false, key: "created_at" },
      { title: "Action", sortable: false },
    ],
    name: "",
    description: "",
    form: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    categoryList: [],
    userList: [["All"]],
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
      return this.cat_id === 0 ? "Add New Category" : "Update Category";
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
        this.getCategory();
      }
    },
    getCategory() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = { page: this.page, itemPerPage: this.itemsPerPage };
      axios
        .get(process.env.VUE_APP_API_URL + "/categories", { params, headers })
        .then((res) => {
          this.categoryList = res.data.data.categories;
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
        });
    },
    searchCategory() {
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
        let token = localStorage.getItem("authToken");
        let headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            process.env.VUE_APP_API_URL + "/categories/filter",
            { params, headers },
            { validateStatus: () => false }
          )
          .then((res) => {
            this.categoryList = res.data.data.categories;
            this.totalItems = res.data.data.pagination.total_record;
            this.loading = false;
          })
          .catch((error) => {
            this.categoryList = [];
            console.log(error);
          });
      }
    },
    getUser() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = { page: 0, itemPerPage: 100 };
      axios
        .get(process.env.VUE_APP_API_URL + "/users", { headers, params })
        .then((res) => {
          let users = res.data.data.users;
          users.forEach((user) => {
            this.userList.push(user);
          });
          // this.userSelected = this.userList[0];
        });
    },
    EditCategory(cat) {
      this.dialog = true;
      this.cat_id = cat.ID;
      this.name = cat.name;
      this.description = cat.description;
    },
    SaveCategory() {
      let category = {
        id: this.cat_id,
        name: this.name,
        description: this.description,
      };
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (this.cat_id > 0) {
        axios
          .put(
            process.env.VUE_APP_API_URL + "/category",
            category,
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
            process.env.VUE_APP_API_URL + "/category",
            category,
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
      this.getCategory();
      this.CloseFormAddEdit();
    },
    DeleteCategory(id, name) {
      this.dialogDelete = true;
      this.cat_id = id;
      this.name = name;
    },
    ConfirmDeleteItem() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(
          process.env.VUE_APP_API_URL + "/category/" + this.cat_id,
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
          this.getCategory();
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
  mounted() {
    this.getUser();
  },
};
</script>
