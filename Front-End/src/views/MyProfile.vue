<template>
  <div
    style="background: #e0e0e0; height: 100%"
    class="d-flex justify-center align-center"
  >
    <v-card width="800px">
      <v-card-title style="padding: 15px" class="text-center" primary-title>
        My Profile
      </v-card-title>
      <hr />
      <v-card-text>
        <v-container>
          <v-form v-model="form">
            <v-row class="text-center ma-0 pa-0">
              <v-col cols="12" class="ma-0 pa-0">
                <div>
                  <v-btn
                    @click="triggerFileInput"
                    variant="tonal"
                    v-tooltip:top.eager="`Edit Profile`"
                  >
                    <v-icon size="20" color="black"> mdi-pencil</v-icon>
                  </v-btn>
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileUpload"
                    style="display: none"
                  />
                </div>
                <v-img
                  :src="image != null ? image : userImage"
                  class="my-3"
                  contain
                  height="200"
                />
              </v-col>
              <v-col cols="12" class="ma-0 pa-0">
                <h1>{{ username }}</h1>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions style="justify-content: center">
        <v-btn class="bg-info mb-4" @click="change"> Save </v-btn>
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
  name: "MyProfile",
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
    userImage: "",
    username: "",
    imageFile: null,
    image: null,
    showPopup: false,
  }),
  computed: {},
  methods: {
    required(v) {
      return !!v || "Field is required";
    },

    change() {
      let formData = new FormData();
      formData.append("file", this.imageFile);
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .patch(
          process.env.VUE_APP_API_URL + "/profile",
          formData,
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
          this.$router.go();
        })
        .catch((err) => {
          this.backgroundColor = "red";
          this.message = err.response.data.message;
          this.snackbar = true;
        });
    },
    getUserProfile() {
      //   this.user = JsonData.Users.filter((us) => us.ID == this.userID);
      //   if (this.user[0].LastName == "") {
      //     this.initails = this.user[0].FirstName[0].toUpperCase();
      //     this.username = this.user[0].FirstName;
      //   } else {
      //     this.initails =
      //       this.user[0].LastName[0].toUpperCase() +
      //       this.user[0].FirstName[0].toUpperCase();
      //     this.username = this.user[0].LastName + " " + this.user[0].FirstName;
      //   }
      let token = localStorage.getItem("authToken");
      let headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(
          process.env.VUE_APP_API_URL + "/auth/user",
          { headers },
          { validateStatus: () => true }
        )
        .then((res) => {
          this.username = res.data.result.username;
          this.userImage = res.data.result.profile;
        });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
        this.imageFile = file;
      } else {
        this.image = null;
      }
    },
  },
  mounted() {
    this.getUserProfile();
  },
};
</script>

<style scoped>
.button-file {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.button-file-icon {
  margin-right: 5px;
}
</style>