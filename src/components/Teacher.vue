<template>
  <div class="generic-user">
    <div class="nav-header">
      <i :class="roleUserIcon"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{roleUser.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1 />
    <div>
      <i :class="memberIcon">{{memberName}}</i>
    </div>

    <el-table :data="getMembers()" stripe style="width: 100%" @row-click="onRowClick">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="备注" prop="note"></el-table-column>
      <!-- <el-table-column label="状态" prop="status"></el-table-column> -->
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onInvite">添加学生</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="onEdit(scope.$index, scope.row)"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="memberDialogTitle"
      :visible.sync="memberDialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="memberForm" :rules="formRules" ref="memberForm" status-icon>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="memberForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="note">
          <el-input v-model="memberForm.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGenericUserProxy,
  getGenericUserByEmailProxy
} from "../utils/GenericUserUtil";
import {
  createStudentProxy,
  updateStudentProxy,
  deleteStudentProxy
} from "../utils/TeacherUtil";

export default {
  props: {
    role: {
      default: 'teacher',
      type: String
    },
    id: String
  },
  async created() {
    let genericUserInfo;
    if (this.id) {
      genericUserInfo = await getGenericUserProxy(this.role, this.$Amplify, this.id);
    } else {
      // login directly, not from navigation
      const loginUser = this.$store.state.user;
      if (loginUser) {
        genericUserInfo = await getGenericUserByEmailProxy(
          this.role,
          this.$Amplify,
          loginUser.email
        );
      }
    }
    this.roleUser = genericUserInfo || {};
    this.$data.appContext[this.role] = this.roleUser;
  },
  computed: {
    roleUserIcon() {
      return "el-icon-user";
    },
    memberIcon() {
      return 'el-icon-view';
    },
    memberName() {
      return '学生';
    },
    memberRole() {
      return 'student';
    }
  },
  data() {
    return {
      roleUser: {},
      memberDialogVisible: false,
      memberDialogTitle: "",
      memberForm: {
        name: "",
        note: ""
      },
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        note: []
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    getMembers() {
      if (this.roleUser && this.roleUser.members) {
        return this.roleUser.members.items || [];
      } else {
        return [];
      }
    },
    onInvite() {
      this.memberForm.id = "";
      this.memberForm.name = "";
      this.memberForm.note = "";
      this.memberDialogTitle = "添加";
      this.memberDialogVisible = true;
    },
    onEdit(index, row) {
      this.memberForm.id = row.id;
      this.memberForm.name = row.name;
      this.memberForm.note = row.note;
      this.memberDialogTitle = "编辑";
      this.memberDialogVisible = true;
    },
    async onConfirm() {
      const userId = this.memberForm.id;
      const userName = this.memberForm.name;
      const userNote = this.memberForm.note;
      if (!userId) {
        try {
          // add user in members
          const newMember = await createStudentProxy(
            this.$Amplify,
            this.roleUser.id,
            userName,
            userNote
          );
          console.log(newMember);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          // edit member
          const editedMember = await updateStudentProxy(
            this.$Amplify,
            userId,
            userName,
            userNote
          );
          console.log(editedMember);
        } catch (error) {
          console.error(error);
        }
      }
      // retrive again
      this.roleUser = await getGenericUserProxy(this.role, this.$Amplify, this.roleUser.id);
      console.log(this.roleUser);
      this.$refs["memberForm"].resetFields();
      this.memberDialogVisible = false;
    },
    onCancel() {
      this.$refs["memberForm"].resetFields();
      this.memberDialogVisible = false;
    },
    onRowClick(row, column) {
      if (!column.property) {
        return;
      }
      this.$router.push({
        name: this.memberRole,
        params: {
          id: row.id
        }
      });
    },
    handleClose(done) {
      this.$refs["memberForm"].resetFields();
      done();
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteStudentProxy(this.$Amplify, row.id)
            .then(() => {
              getGenericUserProxy(
                this.role,
                this.$Amplify,
                this.roleUser.id
              ).then(genericUser => {
                // retrive again
                this.roleUser = genericUser;
              });
            })
            .catch(e => {
              console.error(e);
            });
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style scoped>
.generic-user {
  margin: 20px;
}
.nav-header {
  display: flex;
}
</style>