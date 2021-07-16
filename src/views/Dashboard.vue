<template>
  <div class="dashboard">
    <h1>This is an dashboard page</h1>
    <div v-if="user">
        User name : <b>{{ user.name }}</b>
        <br>
        Email : <b>{{ user.email }}</b> 
    </div>
  </div>
</template>
<script>
import req from "../apis/request";
export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    req.auth().then(response => {
      this.user = response.data;
    });
  }
};
</script>
