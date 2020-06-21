<template>
  <div class="page-body">
    <el-table :data="skillsets" row-key="id" border @row-click="onRowClick">
      <el-table-column type="index" width="40" />
      <el-table-column prop="name" label="技能类型" />
      <el-table-column align="right" width="130">
        <template slot="header">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onNewSkillSet()" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-edit"
            @click="onEditSkillSet(scope.row)"
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
          <el-input v-model="dialog.skillSet.name" />
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
import { listSkillSets } from "../store/graphql/queries";
import {
  createSkillSet,
  updateSkillSet,
  deleteSkillSet
} from "../graphql/mutations";

const SkillEditMode = {
  SkillSet_New: 1,
  SkillSet_Edit: 2
};

export default {
  created() {
    this.fetchSkillSets();
  },
  data() {
    return {
      skillsets: [],
      dialog: {
        skillSet: {}
      }
    };
  },
  computed: {
    dialogCaption() {
      if (this.dialog.mode === SkillEditMode.SkillSet_New) {
        return "新增";
      } else if (this.dialog.mode === SkillEditMode.SkillSet_Edit) {
        return "重命名";
      } else {
        return "";
      }
    }
  },
  methods: {
    onRowClick(row, column) {
      if (!column.property) {
        return;
      }
      this.$router.push({
        name: "skillset",
        params: {
          id: row.id,
          name: row.name
        }
      });
    },
    fetchSkillSets() {
      const loading = this.$loading({
        lock: true,
        // text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$Amplify.API.graphql(
        this.$Amplify.graphqlOperation(listSkillSets, {
          filter: null,
          limit: 100
        })
      )
        .then(res => {
          const skillsets = res.data.listSkillSets.items;
          skillsets.sort((item1, item2) => {
            return item1.name < item2.name ? -1 : 1;
          });
          skillsets.forEach(skillSet => {
            skillSet.hasSkill = skillSet.skills.items.length > 0;
          });
          this.skillsets = skillsets;
          console.info(`SkillSets successfully listed`, this.skillsets);
        })
        .catch(e => {
          console.error(`Error listing SkillSets`, e);
        })
        .finally(() => {
          loading.close();
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
        default:
      }
    },
    onNewSkillSet() {
      this.dialog = {
        visible: true,
        mode: SkillEditMode.SkillSet_New,
        skillSet: {
          name: ""
        }
      };
    },
    onEditSkillSet(skillSet) {
      this.dialog = {
        visible: true,
        skillSet: {}
      };
      this.dialog.skillSet = Object.assign({}, skillSet);
      this.dialog.mode = SkillEditMode.SkillSet_Edit;
    },
    onDeleteSkillSet(skillSet) {
      this.$confirm("确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSkillSet(skillSet);
        })
        .catch(() => {
          // do nothing for the cancel
        });
    },
    newSkillSet() {
      if (!this.checkInputEmpty()) {
        return;
      }
      if (
        !this.checkInputDuplicated(this.skillsets, this.dialog.skillSet.name)
      ) {
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
      if (
        !this.checkInputDuplicated(this.skillsets, this.dialog.skillSet.name)
      ) {
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
    checkInputEmpty() {
      let checkInput = this.dialog.skillSet.name;
      if (!checkInput) {
        this.$message("名称不能为空，请重新输入。");
        return false;
      } else {
        return true;
      }
    },
    checkInputDuplicated(existingItems, inputValue) {
      const findIndex = existingItems.findIndex(item => {
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