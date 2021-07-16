<template>
  <div class="home">
    <h1>Login</h1>
    <br>
      <form @submit.prevent="login">    
        <label><b>User Name     
        </b>    
        </label>    
        <input type="text" name="Uname" id="Uname" placeholder="Username" v-model="form.email">    
        <br>
           <span v-if="errors.email" style="font-size:11px;color:red">
            {{ errors.email[0] }}
          </span>
        <br>    
        <label><b>Password     
        </b>    
        </label>    
        <input type="Password" name="Pass" id="Pass" placeholder="Password" v-model="form.password">    
        <br>
        <span v-if="errors.password" style="font-size:11px;color:red">
            {{ errors.password[0] }}
          </span>
        <br>    
        <input type="submit" name="log" id="log" value="Log In Here">       
    </form>
  </div>
</template>

<script>
import req from "../apis/request";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: []
    };
  },
  methods: {
    login() {
      req.login(this.form)
        .then(() => {
          this.$root.$emit("login", true);
          this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>