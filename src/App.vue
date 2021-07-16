<template>
  <div id="nav">
    <router-link v-if="isLoggedIn" to="/companies">Companies</router-link> |
    <router-link v-if="isLoggedIn" to="/employees">Employees</router-link>
  </div>
  <router-view/>
</template>

<script>
import req from '../src/apis/request'
export default {
   computed: {
    isLoggedIn() {
      return req.auth().then(res => { return true}).catch(err => { return false})
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
