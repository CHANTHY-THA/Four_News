<template>
  <div style="padding: 20px; background: #e0e0e0; height: 100%">
    <!-- block rearch -->
    <div>
      <v-row style="margin-top: 10px; margin-left: 10px; margin-right: 10px">
        <v-col cols="6">
          <v-text-field
            v-model="filter.name"
            label="Name"
            color="primary"
            variant="underlined"
            clearable
            density="compact"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            v-model="filter.created_by"
            :items="userList"
            item-title="username"
            item-value="username"
            label="--Select user--"
            clearable
            density="compact"
            color="primary"
            variant="underlined"
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
        <!-- <v-icon @click="filterTag" size="50" color="blue" style="cursor: pointer;"> mdi-card-search</v-icon> -->
        <v-btn @click="filterTag" class="background-btn-color">Filter</v-btn>
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

    <!-- datatable -->
    <v-card flat class="mt-2" style="width: 100%">
      <v-card-title
        class="d-flex align-center justify-space-between pe-2"
        style="padding: 15px"
      >
        Tag List
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
        <!-- add and edit  form -->
        <v-dialog
          v-model="dialog"
          persistent
          transition="dialog-center-transition"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="info"
              dark
              v-bind="props"
              class="background-btn-color me-2"
            >
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
                        label="Tag Name"
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
                @click="SaveTag"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="tagList"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="name"
        @update:options="loadItems"
        class="custom-table"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.ID }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="d-flex">
                <div
                  @click="EditTag(item)"
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
                  <ToolTipMessage message="Edit Tag"></ToolTipMessage>
                </div>
                <div
                  @click="DeleteTag(item.ID, item.name)"
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

    <!-- delete dialog -->
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
        <v-card-title class=" " primary-title> Delete Tag </v-card-title>
        <hr />
        <v-card-text>
          <v-container>
            <v-row>
              <p>
                Are you sure, you want to delete Tag <q>{{ name }}</q> ?
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
      { title: "CreatedBy", sortable: false, key: "created_by" },
      { title: "CreatedAt", sortable: false, key: "created_at" },
      { title: "Action", sortable: false },
    ],
    name: "",
    form: false,
    dialog: false,
    snackbar: false,
    dialogDelete: false,
    tagList: [],
    userList: [],
    loading: true,
    totalItems: 0,
    tag_id: 0,
    itemName: "",
    message: "",
    backgroundColor: "",
    page: 1,
    itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,

    username: "",

    filter: {
      name: null,
      created_by: null,
    },
    filter_apply: {
      name: {
        label: "Name",
        value: null,
      },
      created_by: {
        label: "Created By",
        value: null,
      },
    },

    search: "",
  }),
  computed: {
    formTitle() {
      return this.tag_id === 0 ? "Add New Tag" : "Update Tag";
    },
  },
  methods: {
    required(v) {
      return !!v || "Field is required";
    },
    loadItems({ page, itemsPerPage }) {
      this.page = page;
      this.itemsPerPage = itemsPerPage;
      if (this.filter.name != null || this.filter.created_by != null) {
        this.filterTag();
      } else {
        this.getTag();
      }
    },
    getTag() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      const params = {
        page: this.page,
        itemPerPage: this.itemsPerPage,
        search: this.search,
      };
      axios
        .get(process.env.VUE_APP_API_URL + "/tags", { headers, params })
        .then((res) => {
          this.tagList = res.data.data.tags;
          this.totalItems = res.data.data.pagination.total_record;
          this.loading = false;
        });
    },
    filterTag() {
      if (this.filter.name != null || this.filter.created_by != null) {
        this.filter_apply.name.value = this.filter.name;
        this.filter_apply.created_by.value = this.filter.created_by;

        if (this.filter.created_by === null) {
          this.filter.created_by = "";
        }
        if (this.filter.name === null) {
          this.filter.name = "";
        }

        let token = localStorage.getItem("authToken");
        let headers = {
          Authorization: `Bearer ${token}`,
        };
        let params = {
          page: this.page,
          itemPerPage: this.itemsPerPage,
          name: this.filter.name,
          created_by: this.filter.created_by,
          search: this.search,
        };
        axios
          .get(
            process.env.VUE_APP_API_URL + "/tags/filter",
            { headers, params },
            { validateStatus: () => false }
          )
          .then((res) => {
            this.tagList = res.data.data.tags;
            this.totalItems = res.data.data.pagination.total_record;
            this.loading = false;
          })
          .catch((error) => {
            this.tagList = [];
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
        });
    },
    EditTag(tag) {
      this.dialog = true;
      this.tag_id = tag.ID;
      this.name = tag.name;
    },
    SaveTag() {
      let tag = {
        id: this.tag_id,
        name: this.name,
      };
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      if (this.tag_id > 0) {
        axios
          .put(
            process.env.VUE_APP_API_URL + "/tag",
            tag,
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
            process.env.VUE_APP_API_URL + "/tag",
            tag,
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
      this.getTag();
      this.CloseFormAddEdit();
    },
    DeleteTag(id, name) {
      this.dialogDelete = true;
      this.tag_id = id;
      this.name = name;
    },
    ConfirmDeleteItem() {
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(
          process.env.VUE_APP_API_URL + "/tag/" + this.tag_id,
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
          this.getTag();
          this.CloseDailogDelete();
        });
    },
    CloseFormAddEdit() {
      this.dialog = false;
      this.tag_id = 0;
      this.name = "";
    },
    CloseDailogDelete() {
      this.dialogDelete = false;
      this.CloseFormAddEdit();
    },
    removeFilter(data) {
      this.filter[data] = null;
      if (this.filter.name != null || this.filter.created_by != null) {
        this.filterTag();
      } else {
        this.getTag();
      }
    },
  },
  mounted() {
    this.getUser();
    this.getTag();
  },
};
</script>
