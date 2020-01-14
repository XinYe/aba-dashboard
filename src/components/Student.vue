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
    <h1 />
    <div>
      <i class="el-icon-basketball">技能列表</i>
    </div>

    <el-tabs v-model="activeSkillTab" editable @edit="onSkillConfig">
      <el-tab-pane
        v-for="(record, index) in records"
        :label="record.skill"
        :name="index.toString()"
        :key="index"
      >
        <skill :name="record.skill" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="选择技能" :visible.sync="skillDialogVisible">
      <el-tree :data="skillSets" :props="props" node-key="id" :default-checked-keys="recordedSkills" show-checkbox @check-change="onSkillCheckChange"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="skillDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onChooseSkillsConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listSkillSets, getSkillSet } from "../store/graphql/queries";

import Vue from "vue";

export default Vue.extend({
  components: {
    Skill: () => import("./Skill.vue")
  },
  data() {
    return {
      skillDialogVisible: false,
      activeSkillTab: "0",
      skillSets: [],
      props: {
        label: "name",
        children: "skills"
      },
      recordedSkills: []
    };
  },
  created() {
    this.fetchSkillSets();
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
      if (action === "add") {
        this.skillDialogVisible = true;
      } else if (action === "remove") {
        this.$confirm("确认删除?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.student.records = this.student.records.filter(
              record => record.skill !== this.student.records[targetName].skill
            );
          })
          .catch(() => {
            // do nothing for the cancel
          });
      }
    },
    onSkillCheckChange(node, nodeSelected /*, subtreeSelected*/) {
      node.selected = nodeSelected;
    },
    onChooseSkillsConfirm() {
      this.skillDialogVisible = false;
      this.skillSets.forEach(skillSet => {
        skillSet.skills.forEach(skill => {
          if (skill.selected) {
            this.student.records.push({
              skill: skill.name,
              activities: []
            });
          }
        });
      });
    },
    fetchSkillSets() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(listSkillSets, {})
      )
        .then(res => {
          const skillSets = [];
          const recordedSkills = [];
          res.data.listSkillSets.items.forEach(skillSet => {
            const skills = skillSet.skills.items;
            skills.forEach(skill => {
              skill.skillSet = skillSet;
              if (this.isRecordedSkill(skill.name)) {
                recordedSkills.push(skill.id);
              }
            });
            skillSet.skills = skills;
            skillSets.push(skillSet);
          });
          this.skillSets = skillSets;
          this.recordedSkills = recordedSkills;
          console.info(`SkillSets successfully listed`, this.skillSets);
        })
        .catch(e => {
          console.error(`Error listing SkillSets`, e);
        });
    },
    fetchSkillSet(skillSet, resolve) {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(getSkillSet, {
          id: skillSet.id
        })
      )
        .then(res => {
          const skills = res.data.getSkillSet.skills.items;
          skills.forEach(skill => {
            skill.skillSet = skillSet;
          });
          resolve(skills);
          console.info(`SkillSet successfully fetched`, res);
        })
        .catch(e => {
          console.error(`Error fetching SkillSet`, e);
        });
    },
    isRecordedSkill(skillName) {
      return !!this.records.find(record => {
        return record.skill === skillName;
      });
    }
  }
});
</script>