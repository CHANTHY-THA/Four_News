<template>
  
  <div>
<!-- import menu component -->
  </div>
  <div style="padding:20px; background:#E0E0E0; height: 100%;">
    <div style="margin-bottom: 30px;">
      <!-- add and edit form -->
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
            class="mb-2 float-right"
            v-bind="props"
          >
          Add Category
          <!-- <ToolTipMessage message="Add New Category"></ToolTipMessage> -->
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            style="padding:15px"
            primary-title
          >
          {{ formTitle }}
          </v-card-title>
          <hr/>
          <!-- <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title> -->
          <v-card-text>
            <v-container>
              <v-form
                v-model="form"
              >
              <v-row>
                <v-col cols="12" >
                    <v-text-field
                      v-model = "name"
                      :rules="[required]"
                      density="compact"
                      label="Category Name"
                      color="primary"
                      variant="outlined"
                    ></v-text-field>
               
                  <!-- <div style="margin-top:-40px; margin-left:10px; margin-bottom:-40px;">
                    <small :style="{color:colorMessage}">{{message}}</small>
                  </div> -->
                </v-col>
              </v-row>
              <v-row style="margin-top: -15px;" >
                <v-col cols="12" >
                    <v-text-field
                      v-model = "description"
                      :rules="[required]"
                      density="compact"
                      label="Description"
                      color="primary"
                      variant="outlined"
                    ></v-text-field>
               
                  <!-- <div style="margin-top:-40px; margin-left:10px; margin-bottom:-40px;">
                    <small :style="{color:colorMessage}">{{message}}</small>
                  </div> -->
                </v-col>
              </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center !important; margin-bottom: 20px; margin-top: -25px;">
            <v-btn
              style="background-color: red; color: white;"
              variant="text"
              @click="CloseFormAddEdit"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!form"
              class="bg-info"
              style="background-color: rgb(8, 88, 145); color: white;"
              @click="SaveCategory"
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
      :items="categoryList"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"   
      @update:options="loadItems"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
          style="border-bottom:1px solid rgba(128, 128, 128, 0.577); display: flex; justify-content: space-between;"
        >
          <v-toolbar-title>Category List</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item="{item}">
        <tr >
          <td >{{item.ID}}</td>
          <td>{{item.name}}</td>
          <td>{{item.description}}</td>
          <td>{{item.created_by}}</td>
          <td>{{item.created_at}}</td>
          <td >
            <div class="d-flex">
              <div @click="EditCategory(item)" style="margin-right: 5px; background: green;border-radius: 50%; width: 30px; height: 30px; align-items: center !important; display: flex; justify-content: center !important;">
                <v-icon size="17" color="white" > mdi-pencil</v-icon>
                <ToolTipMessage message="Edit Category"></ToolTipMessage>
              </div>
              <div @click="DeleteCategory(item.ID,item.name)"  style="background: red; border-radius: 50%; width: 30px; height: 30px; align-items: center !important; display: flex; justify-content: center !important;">
                <v-icon size="17" color="white"> mdi-delete</v-icon>
              </div>
            </div>
          </td>
        </tr>
    </template>   
    </v-data-table-server>
    <v-dialog v-model="dialogDelete" persistent max-width="500px">
      <v-card>
         
          <v-card-title
            class=" "
            primary-title
          >
          Delete Category
          </v-card-title>
          <hr/>
          <v-card-text>
            <v-container>
              <v-row >
                <p>Are you sure, you want to delete category <q>{{ name  }}</q> ?</p>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions style="justify-content: center !important; margin-bottom: 20px; margin-top: 0px;">
            <v-btn
              style="background-color: red; color: white;"
              variant="text"
              @click="CloseDailogDelete"
            >
              No
            </v-btn>
            <v-btn
              class="bg-info"
              style="background-color: rgb(8, 88, 145); color: white;"
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
  import axios from 'axios';
  import AlertMessage from '@/components/AlertMessage.vue';

  export default {
    components: {
      AlertMessage,
    },
    data: () => ({
      
      headers: [{title: 'ID',align: '',sortable: false,key: 'ID'},
        { title: 'Name',sortable: false, key: 'name'},
        { title: 'Description',sortable: false, key: 'description'},
        { title: 'CreatedBy',sortable: false, key: 'created_by' },
        { title: 'CreatedAt',sortable: false, key: 'created_at' },
        { title: 'Action', sortable: false },
      ],
      name:"",
      description:"",
      form:false,
      dialog: false,
      snackbar: false,
      dialogDelete:false,
      categoryList: [],
      loading: true,
      totalItems: 0,
      cat_id:0,
      itemName:"",
      message:"",
      backgroundColor:"",
      page:1,
      itemsPerPage: process.env.VUE_APP_ITEM_PER_PAGE,
    }),
    computed: {
      formTitle () {
        return this.cat_id === 0 ? 'Add New Category' : 'Update Category'
      },
    },
    methods: {
      required (v) {
        return !!v || 'Field is required'
      },
      loadItems ({ page, itemsPerPage }) {
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.getCategory();
      },
      getCategory(){
        const params = {page:this.page, itemPerPage:this.itemsPerPage};
        axios.get(process.env.VUE_APP_API_URL+'/categories',{params}).then(res=>{
            this.categoryList = res.data.data.categories;   
            this.totalItems = res.data.data.pagination.total_record; 
            this.loading = false;
        });
      },
      EditCategory(cat){
        this.dialog = true;
        this.cat_id = cat.ID;
        this.name = cat.name;
        this.description = cat.description;
      },
      SaveCategory(){
        let category = {
          id: this.cat_id,
          name:this.name,
          description: this.description
        };
        if(this.cat_id > 0){
          axios.put(process.env.VUE_APP_API_URL+'/category',category,{ validateStatus: () => true }).then((res)=>{
            this.message = res.data.message;
            this.AddUpdateData(res.data.id);
          })
        }else{
          axios.post(process.env.VUE_APP_API_URL+'/category',category,{ validateStatus: () => true }).then((res)=>{
            this.message = res.data.message;
            this.AddUpdateData(res.data.id);
          })
        }
      },
      AddUpdateData(res_id){
        if(res_id==1){
          this.backgroundColor="green";
        }else{
          this.backgroundColor = "red";
        }
        this.snackbar = true;
        this.getCategory();
        this.CloseFormAddEdit();
      },
      DeleteCategory(id,name){
        this.dialogDelete = true;
        this.cat_id = id;
        this.name = name;
      },
      ConfirmDeleteItem(){
        console.log("id: " + this.cat_id);
        console.log("name: " + this.name);
        axios.delete(process.env.VUE_APP_API_URL+'/category/'+this.cat_id,{ validateStatus: () => true }).then((res)=>{
          this.message = res.data.message;
          if(res.data.id==1){
            this.backgroundColor="green";
          }else{
            this.backgroundColor="green";
          }
          this.snackbar = true;
          this.getCategory();
          this.CloseDailogDelete();
        })
      },
      CloseFormAddEdit(){
        this.dialog = false;
        this.cat_id = 0;
        this.name = "";
        this.description = "";
      },
      CloseDailogDelete(){
        this.dialogDelete = false;
        this.CloseFormAddEdit();
      }
    },
    mounted(){
      //this.getCategory();
    }
  }
</script>