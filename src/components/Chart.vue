<template>
  <div>
    <el-page-header @back="goBack" content="Skill Trends"></el-page-header>
    <h1/>
    <line-chart :columns="columns" :datasets="datasets"/>
  </div>
</template>

<script>
  import LineChart from '../utils/LineChart'

  export default {
    name: "Chart",
    components: {
      LineChart
    },
    props: {
      columns: String,
      datasets: String
    },
    methods: {
      goBack() {
        this.$router.back();
      }
    }
  }
</script>

<style>
  /* .small {
    max-width: 600px;
    margin: 150px auto;
  } */
</style>