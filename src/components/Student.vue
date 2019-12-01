<template>
  <div class="page-body">
    <div class="nav-header">
      <i class="el-icon-user"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/owner' }">{{owner.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/principal' }">{{principal.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mentor' }">{{mentor.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/teacher' }">{{teacher.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/student' }">{{student.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1/>
    <div>
      <i class="el-icon-basketball">技能列表</i>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="(skill, index) in skills"
        :label="skill.name"
        :name="index.toString()"
        :key="index"
      >
        <skill :name="skill.name" />
      </el-tab-pane>
    </el-tabs>
    <!-- <el-button type="primary" icon="el-icon-data-analysis"
      v-on:click="OnButtonClick"
    >Chart</el-button>-->
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {
    Skill: () => import("./Skill.vue")
  },
  data() {
    return {
      activeName: "0"
    };
  },
  computed: {
    owner() {
      return this.$data.appContext.owner;
    },
    principal() {
      return this.$data.appContext.curPrincipal;
    },
    mentor() {
      return this.$data.appContext.curMentor;
    },
    teacher() {
      return this.$data.appContext.curTeacher;
    },
    student() {
      return this.$data.appContext.curStudent;
    },
    skills() {
        return this.student.skills;
    }
  },
  methods: {
    OnButtonClick() {
      this.$router.push({
        name: "chart",
        params: {
          columns: this.getChartColumns(),
          datasets: this.getChartDatasets()
        }
      });
    },
    getChartColumns() {
      return JSON.stringify(["January4", "February", "March", "April"]);
    },
    getChartDatasets() {
      return JSON.stringify([
        {
          label: "Data One",
          borderColor: "lightgreen",
          data: [40, null, 50, 60]
        },
        {
          label: "Data two",
          borderColor: "lightblue",
          data: [30, 10, 60, 50]
        }
      ]);
    }
  }
});
</script>