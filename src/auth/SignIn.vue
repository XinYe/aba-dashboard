<template>
  <div>
    <div class="form-container">
      <h1 class="heading">Sign In</h1>
      <div class="form">
        <input class="input" placeholder="Email" v-model="form.username" />
        <input class="input" placeholder="Password" v-model="form.password" type="password" />
        <div class="button" v-on:click="signIn">
          <p>Sign In</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserByEmailProxy } from "../utils/UserUtil";

export default {
  name: "sign-in",
  methods: {
    async signIn() {
      const loading = this.$loading({
        lock: true,
        // text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      try {
        const authUser = await this.$Amplify.Auth.signIn(
          this.form.username,
          this.form.password
        );
        const userInfo = await getUserByEmailProxy(
          this.$Amplify,
          authUser.attributes.email
        );
        this.$store.dispatch("setIsAuthenticated", true);
        this.$store.dispatch("setUser", userInfo);
        this.$router.push({
          name: "home"
        });
      } catch (err) {
        console.log("error: ", err);
      } finally {
        loading.close();
      }
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style scoped>
.heading {
  text-align: left;
  margin: 55px 5px 15px;
}
.form-container {
  width: 262px;
  margin: 0 auto;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  padding: 13px 35px;
  background-color: #2c3e50;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  margin: 25px 0px 20px;
  align-self: flex-start;
}
.button:hover {
  opacity: 0.9;
}
.button p {
  margin: 0;
  color: white;
  font-weight: 600;
}
</style>
