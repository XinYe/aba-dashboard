<template>
  <div class="page-body">
    <el-table
      :data="skillsets"
      style="width: 100%"
      row-key="id"
      lazy
      border
      default-expand-all
      :tree-props="{children: 'skills', hasChildren: 'hasSkill'}">
      <el-table-column prop="name" label="技能类型及名称"/>
      <el-table-column align="right" width="200">
        <template slot="header">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onNewSkillSet()" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            v-if="isSkillSet(scope.row)"
            @click="onNewSkill(scope.row)"
          />
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="onEditSkillSetOrSkill(scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="onDeleteSkillSet(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogCaption" :visible.sync="dialog.visible">
      <el-form>
        <el-form-item label="技能类型">
          <el-input v-model="dialog.skillSet.name" :disabled="!isSkillSetDialog" />
        </el-form-item>
        <el-form-item label="技能名称" v-if="!isSkillSetDialog">
          <el-input v-model="dialog.skill.name" autocomplete="off" clearable />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="onOk()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listSkillSets, getSkillSet } from "../store/graphql/queries";
import {
  createSkillSet,
  updateSkillSet,
  deleteSkillSet,
  createSkill,
  updateSkill,
  deleteSkill
} from "../graphql/mutations";

const SkillEditMode = {
  SkillSet_New: 1,
  SkillSet_Edit: 2,
  Skill_New: 3,
  Skill_Edit: 4
};

export default {
  created() {
    this.fetchSkillSets();
  },
  data() {
    return {
      skillsets: [],
      dialog: {
        skillSet: {},
        skill: {}
      }
    };
  },
  computed: {
    dialogCaption() {
      if (this.dialog.mode === SkillEditMode.SkillSet_New) {
        return "新增";
      } else if (this.dialog.mode === SkillEditMode.Skill_New) {
        return "新增";
      } else if (this.dialog.mode === SkillEditMode.SkillSet_Edit) {
        return "重命名";
      } else if (this.dialog.mode === SkillEditMode.Skill_Edit) {
        return "重命名";
      } else {
        return "";
      }
    },
    isSkillSetDialog() {
      return (
        this.dialog.mode === SkillEditMode.SkillSet_New ||
        this.dialog.mode === SkillEditMode.SkillSet_Edit
      );
    }
  },
  methods: {
    loadSkills(nodeData, treeNode, resolve) {
      const curSkillSet = nodeData;
      if (curSkillSet && curSkillSet.id) {
        this.fetchSkillSet(curSkillSet, resolve);
      }
    },
    fetchSkillSets() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(listSkillSets, {})
      )
        .then(res => {
          this.skillsets = [];
          res.data.listSkillSets.items.forEach(skillSet => {
            if (!skillSet.skills.items) {
              skillSet.skills.items = [];
            }
            const skills = skillSet.skills.items;
            skills.forEach(skill => {
              skill.skillSet = skillSet;
            });
            this.skillsets.push({
              id: skillSet.id,
              name: skillSet.name,
              hasSkill: skills.length > 0,
              skills: skills
            });
          });
          console.info(`SkillSets successfully listed`, this.skillsets);
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
    onOk() {
      switch (this.dialog.mode) {
        case SkillEditMode.SkillSet_New:
          this.newSkillSet();
          break;
        case SkillEditMode.SkillSet_Edit:
          this.editSkillSet();
          break;
        case SkillEditMode.Skill_New:
          this.newSkill();
          break;
        case SkillEditMode.Skill_Edit:
          this.editSkill();
          break;
        default:
      }
    },
    onNewSkillSet() {
      this.dialog = {
        visible: true,
        mode: SkillEditMode.SkillSet_New,
        skillSet: {
          name: ""
        },
        skill: {}
      };
    },
    onEditSkillSetOrSkill(skillSetOrSkill) {
      this.dialog = {
        visible: true,
        skillSet: {},
        skill: {}
      };
      if (this.isSkillSet(skillSetOrSkill)) {
        this.dialog.skillSet = Object.assign({}, skillSetOrSkill);
        this.dialog.mode = SkillEditMode.SkillSet_Edit;
      } else {
        this.dialog.skill = Object.assign({}, skillSetOrSkill);
        this.dialog.skillSet = this.dialog.skill.skillSet;
        this.dialog.mode = SkillEditMode.Skill_Edit;
      }
    },
    onDeleteSkillSet(skillSetOrSkill) {
      this.$confirm("确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.isSkillSet(skillSetOrSkill)) {
            this.deleteSkillSet(skillSetOrSkill);
          } else {
            this.deleteSkill(skillSetOrSkill);
          }
        })
        .catch(() => {
          // do nothing for the cancel
        });
    },
    onNewSkill(skillSet) {
      this.dialog = {
        visible: true,
        mode: SkillEditMode.Skill_New,
        skillSet: skillSet,
        skill: {}
      };
    },
    newSkillSet() {
      if (!this.checkInputEmpty()) {
        return;
      }
      if (!this.checkInputDuplicated(this.skillsets)) {
        return;
      }
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(createSkillSet, {
          input: {
            name: this.dialog.skillSet.name
          }
        })
      )
        .then(res => {
          console.info(`SkillSet created`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error creating SkillSet`, e);
        })
        .finally(() => {
          this.dialog.visible = false;
        });
    },
    editSkillSet() {
      if (!this.checkInputEmpty()) {
        return;
      }
      // if (!this.checkInputNoChange()) {
      //   return;
      // }
      if (!this.checkInputDuplicated(this.skillsets)) {
        return;
      }
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(updateSkillSet, {
          input: {
            id: this.dialog.skillSet.id,
            name: this.dialog.skillSet.name
          }
        })
      )
        .then(res => {
          console.info(`SkillSet updated`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error updating SkillSet`, e);
        })
        .finally(() => {
          this.dialog.visible = false;
        });
    },
    deleteSkillSet(skillSet) {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(deleteSkillSet, {
          input: {
            id: skillSet.id
          }
        })
      )
        .then(res => {
          console.info(`SkillSet ${skillSet.id} removed`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error removing SkillSet ${skillSet.id}`, e);
        });
    },
    newSkill() {
      if (!this.checkInputEmpty()) {
        return;
      }
      //   if (!this.checkInputDuplicated(this.dialog.skillset.skills)) {
      //     return;
      //   }
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(createSkill, {
          input: {
            name: this.dialog.skill.name,
            skillSkillsetId: this.dialog.skillSet.id
          }
        })
      )
        .then(res => {
          console.info(`Skill created`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error creating Skill`, e);
        })
        .finally(() => {
          this.dialog.visible = false;
        });
    },
    editSkill() {
      if (!this.checkInputEmpty()) {
        return;
      }
      // if (!this.checkInputNoChange()) {
      //   return;
      // }
      // tbd
      // if (!this.checkInputDuplicated(this.skillsets)) {
      //   return;
      // }
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(updateSkill, {
          input: {
            id: this.dialog.skill.id,
            name: this.dialog.skill.name
          }
        })
      )
        .then(res => {
          console.info(`Skill updated`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error updating Skill`, e);
        })
        .finally(() => {
          this.dialog.visible = false;
        });
    },
    deleteSkill(skill) {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(deleteSkill, {
          input: {
            id: skill.id
          }
        })
      )
        .then(res => {
          console.info(`SkillSet ${skill.id} removed`, res);
          this.fetchSkillSets();
        })
        .catch(e => {
          console.error(`Error removing SkillSet ${skill.id}`, e);
        });
    },

    checkInputEmpty() {
      let checkInput;
      if (this.isSkillSetDialog) {
        checkInput = this.dialog.skillSet.name;
      } else {
        checkInput = this.dialog.skill.name;
      }
      if (!checkInput) {
        this.$message("名称不能为空，请重新输入。");
        return false;
      } else {
        return true;
      }
    },
    // checkInputNoChange(oldValue) {
    //   return oldValue !== this.dialog.input;
    // },
    checkInputDuplicated(existingItems) {
      const findIndex = existingItems.findIndex(item => {
        return item === this.dialog.input;
      });
      if (findIndex >= 0) {
        this.$message("名称已存在，请重新输入。");
        return false;
      } else {
        return true;
      }
    },
    isSkillSet(skillSetOrSkill) {
      return !!skillSetOrSkill.skills;
    }
  }
};
</script>