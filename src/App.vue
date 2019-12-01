<template>
  <div id="app">
    <div class='header'>
      <img class='header-img' src="./assets/logo.png" />
      <router-link to="/welcome" class='heading'>ABA Dashboard</router-link>
      <div class="header-menu">
        <router-link class='link' to="/owner" v-if="isAuthenticated">Me</router-link>
        <p class='link' v-on:click="signOut" v-if="isAuthenticated">Sign Out</p>
        <router-link class='link' to="/" v-if="!isAuthenticated">Sign In</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  async beforeCreate() {
    try {
      const user = await this.$Amplify.Auth.currentAuthenticatedUser()
      this.$store.dispatch('setIsAuthenticated', true)
      this.$store.dispatch('setUser', user)
    } catch (err) {
      console.log('error: ', err)
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
  },
  methods: {
    async signOut() {
      try {
        await this.$Amplify.Auth.signOut()
        this.$store.dispatch('setIsAuthenticated', false)
        this.$store.dispatch('setUser', {})
        this.$router.push('/')
      } catch (err) {
        console.log('error signing out.')
      }
    }
  },
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

<style scoped>
.header-menu {
  flex: 1;
  padding-right: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.link {
  text-align: right;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin: 0px 0px 0px 30px;
  color: #202124;
  text-decoration: none;
}
.header {
  display: flex;
  background-color: white;;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
  align-items: center;
}
.heading {
  color: #606368;
  text-align: left;
  margin: 4px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
}
.header-img {
  height: 42px;
}
</style>