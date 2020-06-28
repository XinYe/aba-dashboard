<template>
  <div class="student-user">
    <div class="nav-header">
      <i class="el-icon-user"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/student' }">{{student.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1 />
    <div>
      <i class="el-icon-basketball">技能列表</i>
      <el-button
        type="primary"
        icon="el-icon-setting"
        style="float: right"
        @click="skillDialogVisible = true"
      >技能管理</el-button>
    </div>

    <el-tabs closable @edit="onSkillConfig">
      <el-tab-pane
        v-for="(record, index) in student.records"
        :label="record.skillName"
        :name="index.toString()"
        :key="index"
      >
        <skill :record="record" :student="student" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="选择技能" :visible.sync="skillDialogVisible">
      <div class="el-dialog-div">
        <el-tree
          v-loading="isProcessing"
          :data="skillSets"
          :props="props"
          node-key="id"
          :default-checked-keys="recordedSkills"
          show-checkbox
          @check-change="onSkillCheckChange"
        ></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="skillDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSkillConfigConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getStudentProxy,
  createRecordProxy,
  deleteRecordProxy
} from "../utils/StudentUtil";
import { listSkillSets } from "../store/graphql/queries";

import Vue from "vue";

export default Vue.extend({
  props: {
    id: String
  },
  components: {
    Skill: () => import("./Skill.vue")
  },
  async created() {
    if (this.id) {
      await this.fetchSkillSets();
      await this.fetchStudent();
    } else {
      console.error("Not allowed to show student page without id");
    }
  },
  data() {
    return {
      student: {
        records: []
      },
      skillSets: [],
      addedSkills: [],
      skillDialogVisible: false,
      activeSkillTab: "0",
      props: {
        label: "name",
        children: "skills",
        disabled: "disabled"
      },
      isProcessing: false
    };
  },
  computed: {
    recordedSkills() {
      const recordedSkills = [];
      this.skillSets.forEach(skillSet => {
        const skills = skillSet.skills;
        skills.forEach(skill => {
          if (this.isRecordedSkill(skill.id)) {
            skill.disabled = true;
            recordedSkills.push(skill.id);
          }
        });
      });
      return recordedSkills;
    }
  },
  methods: {
    async onSkillConfig(targetName, action) {
      if (action === "remove") {
        try {
          await this.$confirm("确认删除?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          });
          try {
            await deleteRecordProxy(
              this.$Amplify,
              this.student.records[targetName].id
            );
            this.fetchStudent();
            // tbd: also need remove all actitivies from this record
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          // do nothing for cancel
        }
      }
    },
    onSkillCheckChange(node, nodeSelected /*, subtreeSelected*/) {
      // console.log(subtreeSelected);
      if (node.skillSet) {
        node.selected = nodeSelected;
        try {
          if (nodeSelected) {
            this.addedSkills.push(node);
          } else {
            const removedIndex = this.addedSkills.findIndex(addedSkill => {
              return addedSkill.id === node.id;
            });
            if (removedIndex >= 0) {
              this.addedSkills.splice(removedIndex, 1);
            }
          }
        } catch (error) {
          console.error(error);
        }
      } // else, no need to handle the SkillSet node
    },
    async onSkillConfigConfirm() {
      this.isProcessing = true;
      for (let i = 0; i < this.addedSkills.length; i++) {
        const addedSkill = this.addedSkills[i];
        await createRecordProxy(
          this.$Amplify,
          this.student.id,
          addedSkill.id,
          "ui"
        );
      }
      this.isProcessing = false;
      this.addedSkills = [];
      this.skillDialogVisible = false;
      await this.fetchStudent();
    },
    fetchSkillSets() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(listSkillSets, {
          // filter: null,
          limit: 100
        })
      )
        .then(res => {
          const skillSets = [];
          res.data.listSkillSets.items.forEach(skillSet => {
            const skills = skillSet.skills.items;
            skills.forEach(skill => {
              skill.skillSet = skillSet;
            });
            skillSet.skills = skills.sort((item1, item2) => {
              return item1.name < item2.name ? -1 : 1;
            });
            skillSets.push(skillSet);
          });
          skillSets.sort((item1, item2) => {
            return item1.name < item2.name ? -1 : 1;
          });
          this.skillSets = skillSets;
          console.info(`SkillSets successfully listed`, this.skillSets);
        })
        .catch(e => {
          console.error(`Error listing SkillSets`, e);
        });
    },
    async fetchStudent() {
      const student = await getStudentProxy(this.$Amplify, this.id);
      let records = [];
      if (student && student.records) {
        records = records.concat(student.records.items);
      }
      records.forEach(record => {
        // it's a workaround to append skill name,
        // as the local mock api has unknow issue to work with the record object with skill connection
        // so use skillId as the connection reference instead
        record.skillName = this.getSkillName(record.skillId);
      });
      records.sort((item1, item2) => {
        return item1.skillName < item2.skillName ? -1 : 1;
      });
      this.student = {
        id: student.id,
        name: student.name,
        note: student.note,
        teacher: student.teacher,
        records: records
      };
    },
    isRecordedSkill(skillId) {
      return !!this.student.records.find(record => {
        return record.skillId === skillId;
      });
    },
    getSkillName(skillId) {
      for (let i = 0; i < this.skillSets.length; i++) {
        const skills = this.skillSets[i].skills;
        for (let j = 0; j < skills.length; j++) {
          const skill = skills[j];
          if (skill.id === skillId) {
            return skill.name;
          }
        }
      }
    }
  }
});
</script>

<style scoped>
.student-user {
  margin: 20px;
}
.nav-header {
  display: flex;
}
.el-dialog-div {
  height: 50vh;
  overflow: auto;
  border: solid 1px #E4E7ED;
}
</style>