<template>
  <div>
    <div style="padding: 20px; background: #e0e0e0; height: 100%">
      <div style="margin-bottom: 30px">
        <!-- add and edit form -->
        <v-dialog
          v-model="dialog"
          persistent
          transition="dialog-center-transition"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn color="info" dark class="mb-2 float-right" v-bind="props">
              Add User
              <!-- <ToolTipMessage message="Add New User"></ToolTipMessage> -->
            </v-btn>
          </template>
          <v-card>
            <v-card-title style="padding: 15px" primary-title>
              {{ formTitle }}
            </v-card-title>
            <hr />
            <!-- <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title> -->
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

                      <!-- <div style="margin-top:-40px; margin-left:10px; margin-bottom:-40px;">
                    <small :style="{color:colorMessage}">{{message}}</small>
                  </div> -->
                    </v-col>
                  </v-row>
                  <v-row style="margin-top: -15px" v-if="this.user_id === 0">
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :rules="[required]"
                        density="compact"
                        label="Password"
                        color="primary"
                        variant="outlined"
                        type="password"
                      ></v-text-field>

                      <!-- <div style="margin-top:-40px; margin-left:10px; margin-bottom:-40px;">
                    <small :style="{color:colorMessage}">{{message}}</small>
                  </div> -->
                    </v-col>
                  </v-row>
                  <v-row style="margin-top: -15px">
                    <v-col cols="12">
                      <v-select
                        v-model="role"
                        :items="roleList"
                        :item-props="itemProps"
                        item-value="role"
                        :rules="[required]"
                        density="compact"
                        label="Role"
                        color="primary"
                        variant="outlined"
                      ></v-select>

                      <!-- <div style="margin-top:-40px; margin-left:10px; margin-bottom:-40px;">
                    <small :style="{color:colorMessage}">{{message}}</small>
                  </div> -->
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
                @click="SaveUser"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="userList"
        :items-length="totalItems"
        :loading="loading"
        item-value="username"
        @update:options="loadItems"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="white"
            style="
              border-bottom: 1px solid rgba(128, 128, 128, 0.577);
              display: flex;
              justify-content: space-between;
            "
          >
            <v-toolbar-title>User List</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.ID }}</td>
            <td>{{ item.username }}</td>
            <!-- <td>{{ item.password }}</td> -->
            <td>{{ item.role }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="d-flex">
                <div
                  @click="EditUser(item)"
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
                  <ToolTipMessage message="Edit User"></ToolTipMessage>
                </div>
                <div
                  @click="DeleteUser(item.ID, item.username)"
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
  name: "UserView",
  components: {
    AlertMessage,
    // AppLayout,
  },
  data: () => ({
    headers: [
      { title: "ID", align: "", sortable: false, key: "ID" },
      { title: "username", sortable: false, key: "username" },
      // { title: "password", sortable: false, key: "password" },
      { title: "role", sortable: false, key: "role" },
      { title: "CreatedAt", sortable: false, key: "created_at" },
      { title: "Action", sortable: false },
    ],
    username: "",
    password: "",
    role: "",
    form: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    userList: [],
    loading: true,
    totalItems: 0,
    user_id: 0,
    itemName: "",
    message: "",
    backgroundColor: "",
    page: 1,
    itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,
    roleList: [],
  }),
  computed: {
    formTitle() {
      return this.user_id === 0 ? "Add New User" : "Update User";
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
    },
    getUser() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = { page: this.page, itemPerPage: this.itemsPerPage };
      axios.get(process.env.VUE_APP_API_URL + "/setting").then((res) => {
        this.roleList = res.data.data.role;
        console.log(
          "🚀 ~ file: User.vue:123~ .then ~ setting:",
          res.data.data.role
        );
      });
      axios
        .get(
          process.env.VUE_APP_API_URL + "/users",
          { headers, params },

          { validateStatus: () => true }
        )
        .then((res) => {
          this.userList = res.data.data.users;
          console.log(
            "🚀 ~ file: User.vue:279 ~ .then ~ userList:",
            this.userList
          );
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
        });
    },
    EditUser(user) {
      this.dialog = true;
      this.user_id = user.ID;
      this.username = user.username;
      // this.password = user.password;
      this.role = user.role;
    },
    SaveUser() {
      let user = {
        id: this.user_id,
        username: this.username,
        password: this.password,
        role: this.role,
      };
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (this.user_id > 0) {
        delete user.password;
        axios
          .patch(
            process.env.VUE_APP_API_URL + "/user/" + this.user_id,
            user,
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
            process.env.VUE_APP_API_URL + "/user",
            user,
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
      this.getUser();
      this.CloseFormAddEdit();
    },
    DeleteUser(id, username) {
      this.dialogDelete = true;
      this.user_id = id;
      this.username = username;
    },
    ConfirmDeleteItem() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(
          process.env.VUE_APP_API_URL + "/user/" + this.user_id,
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
          this.getUser();
          this.CloseDailogDelete();
        });
    },
    CloseFormAddEdit() {
      this.dialog = false;
      this.user_id = 0;
      this.username = "";
      this.password = "";
      this.role = "";
    },
    CloseDailogDelete() {
      this.dialogDelete = false;
      this.CloseFormAddEdit();
    },
    itemProps(item) {
      return {
        title: item.role,
      };
    },
  },
  mounted() {
    //this.getUser();
  },
};
</script>
