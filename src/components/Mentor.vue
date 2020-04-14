<template>
  <generic-user role="mentor" :id="id"/>
</template>

<script>
export default {
  components: {
    GenericUser: () => import("./GenericUser.vue"),
  },
  props: {
    id: String
  }
};
</script>