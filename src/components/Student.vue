<template>
  <div class="page-body">
    <div class="nav-header">
      <i class="el-icon-user"></i>
      <el-breadcrumb separator="/">
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

    <el-tabs v-model="activeName" editable @edit="onSkillConfig">
      <el-tab-pane
        v-for="(record, index) in records"
        :label="record.skill"
        :name="index.toString()"
        :key="index"
      >
        <skill :name="record.skill" />
      </el-tab-pane>
    </el-tabs>
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
    records() {
        return this.student.records;
    }
  },
  methods: {
    onSkillConfig(targetName, action) {
      if (action === 'add') {
        // show the dialog
        console.log(targetName);
      } else if (action === 'remove') {
        console.log(targetName);
      }
    }
  }
});
</script>