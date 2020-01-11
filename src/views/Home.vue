<template>
  <div class="home">
    <admin :id="loginUser"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Admin from '@/components/Admin.vue';

export default {
  name: 'home',
  computed: {
    loginUser() {
      return this.$store.state.user.attributes.email;
    }
  },
  components: {
    Admin
  }
}
</script>
