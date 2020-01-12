<template>
  <div class="home">
    <component :is="loginRoleComponent" :id="loginUser.email"></component>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    About: () => import('@/views/About.vue'),
    Admin: () => import('@/components/Admin.vue'),
    Principal: () => import('@/components/Principal.vue'),
    Mentor: () => import('@/components/Mentor.vue'),
    Teacher: () => import('@/components/Mentor.vue')
  },
  computed: {
    loginUser() {
      if (this.$store.state.user) {
        return this.$store.state.user;
      } else {
        return {};
      }
    },
    loginRoleComponent() {
      const loginUser = this.loginUser;
      if (loginUser.role) {
        return loginUser.role;
      } else {
        return 'about';
      }
    }
  }
}
</script>
