<template>
  <generic-user role="admin" :id="id"/>
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