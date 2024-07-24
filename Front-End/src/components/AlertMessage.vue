<template>
    <v-snackbar
      timeout="2000"
      :color="background"
      location="top right"
    >
      {{ message }}
    </v-snackbar>
</template>

<script>
export default {
  name: "AlertMessage",
  props: {
    
    message:{
      type:String,
    },
    background:{
      type:String
    }
  },
};
</script>

