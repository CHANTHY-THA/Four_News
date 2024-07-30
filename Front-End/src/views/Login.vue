<template>
  <div
    style="background: #e0e0e0; height: 100%"
    class="d-flex justify-center align-center"
  >
    <!-- <div> -->
    <v-card width="500px">
      <v-card-title style="padding: 15px" class="text-center" primary-title>
        Login
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
            <v-row style="margin-top: -15px">
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
          @click="Login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- </div> -->

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
// import { lifecycleLoggerMixin } from "@/mixins/lifecycleLoggerMixin";
export default {
  name: "LoginView",
  //   mixins: [lifecycleLoggerMixin],
  components: {
    AlertMessage,
  },
  data: () => ({
    username: "",
    password: "",
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

    Login() {
      let payload = {
        username: this.username,
        password: this.password,
      };

      axios
        .post(process.env.VUE_APP_API_URL + "/auth/login", payload, {
          validateStatus: () => true,
        })
        .then((res) => {
          console.log("🚀 ~ file: Login.vue:120 ~ .then ~ res:", res);
          this.backgroundColor = "red";
          if (res.data.statusCode == 200) {
            this.username = "";
            this.password = "";
            this.backgroundColor = "green";
          }
          this.message = res.data.message;
          this.snackbar = true;
        });
    },
  },
  mounted() {
    //this.getUser();
  },
};
</script>