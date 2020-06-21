<template>
  <div class="page-body">
    <el-table :data="skills" row-key="id" border>
      <el-table-column type="index" width="40" />
      <el-table-column prop="name" :label="name" />
      <el-table-column align="right" width="130">
        <template slot="header">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onNewSkill()" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="onEditSkill(scope.row)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="onDeleteSkill(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogCaption" :visible.sync="dialog.visible">
      <el-form>
        <el-form-item label="技能类型">
          <el-input v-model="name" disabled />
        </el-form-item>
        <el-form-item label="技能名称">
          <el-input v-model="dialog.skill.name" autocomplete="off" clearable  @change="onEnter" />
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
import { getSkillSet } from "../store/graphql/queries";
import { createSkill, updateSkill, deleteSkill } from "../graphql/mutations";

const SkillEditMode = {
  Skill_New: 1,
  Skill_Edit: 2
};

export default {
  created() {
    this.fetchSkillSet();
  },
  props: {
    id: String,
    name: String
  },
  data() {
    return {
      skills: [],
      dialog: {
        skill: {}
      }
    };
  },
  computed: {
    dialogCaption() {
      if (this.dialog.mode === SkillEditMode.Skill_New) {
        return "新增";
      } else if (this.dialog.mode === SkillEditMode.Skill_Edit) {
        return "重命名";
      } else {
        return "";
      }
    }
  },
  methods: {
    onEnter: function() {
       this.onOk();
    },
    fetchSkillSet() {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(getSkillSet, {
          id: this.id,
          limit: 100
        })
      )
        .then(res => {
          const skills = res.data.getSkillSet.skills.items;
          skills.sort((item1, item2) => {
            return item1.name < item2.name ? -1 : 1;
          });
          skills.forEach(skill => {
            skill.skillSetId = this.id;
          });
          this.skills = skills;
          console.info(`SkillSet successfully fetched`, res);
        })
        .catch(e => {
          console.error(`Error fetching SkillSet`, e);
        });
    },
    onOk() {
      switch (this.dialog.mode) {
        case SkillEditMode.Skill_New:
          this.newSkill();
          break;
        case SkillEditMode.Skill_Edit:
          this.editSkill();
          break;
        default:
      }
    },
    onNewSkill(skillSet) {
      this.dialog = {
        visible: true,
        mode: SkillEditMode.Skill_New,
        skillSet: skillSet,
        skill: {}
      };
    },
    onEditSkill(skill) {
      this.dialog = {
        visible: true,
        skill: {}
      };
      this.dialog.skill = Object.assign({}, skill);
      this.dialog.mode = SkillEditMode.Skill_Edit;
    },
    onDeleteSkill(skill) {
      this.$confirm("确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSkill(skill);
        })
        .catch(() => {
          // do nothing for the cancel
        });
    },
    newSkill() {
      if (!this.checkInputEmpty()) {
        return;
      }
      if (!this.checkInputDuplicated(this.dialog.skill.name)) {
        return;
      }
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(createSkill, {
          input: {
            name: this.dialog.skill.name,
            skillSkillsetId: this.id
          }
        })
      )
        .then(res => {
          console.info(`Skill created`, res);
          this.fetchSkillSet();
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
      if (!this.checkInputDuplicated(this.dialog.skill.name)) {
        return;
      }
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
          const editingSkill = this.skills.find(skill => {
            return skill.id === this.dialog.skill.id;
          });
          if (editingSkill) {
            // editingSkill.name = this.dialog.skill.name;
            this.fetchSkillSet();
          } else {
            console.error(
              "failed to find skill to edit from id: " + this.dialog.skill.id
            );
          }
        })
        .catch(e => {
          console.error(`Error updating Skill`, e);
        })
        .finally(() => {
          this.dialog.visible = false;
        });
    },
    deleteSkill(deletingSkill) {
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(deleteSkill, {
          input: {
            id: deletingSkill.id
          }
        })
      )
        .then(res => {
          console.info(`SkillSet ${deletingSkill.id} removed`, res);
          //   this.fetchSkillSets();
          const deleteIndex = this.skills.findIndex(skill => {
              return skill.id === deletingSkill.id;
          });
          if (deleteIndex >= 0) {
              // this.skills.splice(deleteIndex, 1);
              this.fetchSkillSet();
          } else {
              console.error(
                "failed to find skill to remove from id: " + deletingSkill.id
            );
          }
        })
        .catch(e => {
          console.error(`Error removing SkillSet ${deletingSkill.id}`, e);
        });
    },

    checkInputEmpty() {
      let checkInput = this.dialog.skill.name;
      if (!checkInput) {
        this.$message("名称不能为空，请重新输入。");
        return false;
      } else {
        return true;
      }
    },
    checkInputDuplicated(inputValue) {
      const findIndex = this.skills.findIndex(item => {
        return item.name === inputValue;
      });
      if (findIndex >= 0) {
        this.$message("名称已存在，请重新输入。");
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>