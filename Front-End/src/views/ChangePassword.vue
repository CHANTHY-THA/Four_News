<template>
  <div
    style="background: #e0e0e0; height: 100%"
    class="d-flex justify-center align-center"
  >
    <v-card width="800px">
      <v-card-title style="padding: 15px" class="text-center" primary-title>
        Change Your Password
      </v-card-title>
      <hr />
      <v-card-text>
        <v-container>
          <v-form v-model="form">
            <v-row style="margin-top: -15px">
              <v-col cols="12">
                <v-text-field
                  v-model="currentPassword"
                  :rules="[required]"
                  density="compact"
                  label="Current Password"
                  color="primary"
                  variant="outlined"
                  type="password"
                  v-on:keyup.enter="change"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="margin-top: -15px">
              <v-col cols="12">
                <v-text-field
                  v-model="newPassword"
                  :rules="[required]"
                  density="compact"
                  label="New Password"
                  color="primary"
                  variant="outlined"
                  type="password"
                  v-on:keyup.enter="change"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="margin-top: -15px">
              <v-col cols="12">
                <v-text-field
                  v-model="confirmPassword"
                  :rules="[required]"
                  density="compact"
                  label="Confirm Password"
                  color="primary"
                  variant="outlined"
                  type="password"
                  v-on:keyup.enter="change"
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
          :disabled="!form"
          class="bg-info"
          style="background-color: rgb(8, 88, 145); color: white"
          @click="change"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

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
  name: "ChangePassword",
  components: {
    AlertMessage,
  },
  data: () => ({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    form: false,
    dialog: false,
    snackbar: false,
    loading: true,
    message: "",
    backgroundColor: "",
    page: 1,
    itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,
  }),
  computed: {},
  methods: {
    required(v) {
      return !!v || "Field is required";
    },

    change() {
      let payload = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      };
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .patch(
          process.env.VUE_APP_API_URL + "/password",
          payload,
          { headers },
          {
            validateStatus: () => true,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.backgroundColor = "green";
          }
          this.message = res.data.message;
          this.snackbar = true;
        })
        .catch((err) => {
          this.backgroundColor = "red";
          this.message = err.response.data.message;
          this.snackbar = true;
        });
    },
  },
  mounted() {
    //this.getUser();
  },
};
</script>