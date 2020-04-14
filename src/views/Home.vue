<template>
  <div class="home">
    <component :is="loginRole"></component>
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
    loginRole() {
      if (this.$store.state.user) {
        return this.$store.state.user.role;
      } else {
        return 'about';
      }
    }
  }
};
</script>
