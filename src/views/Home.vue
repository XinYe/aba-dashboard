<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <owner/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Owner from '@/components/Owner.vue';

export default {
  name: 'home',
  components: {
    // HelloWorld
    Owner
  }
}
</script>
