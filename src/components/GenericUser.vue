<template>
  <div class="generic-user">
    <div class="nav-header">
      <i :class="roleUserIcon"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{roleUser.email}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1 />
    <div>
      <i :class="memberIcon">{{memberName}}</i>
    </div>

    <el-table :data="getMembers()" stripe style="width: 100%" @row-click="onRowClick">
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="备注" prop="note"></el-table-column>
      <!-- <el-table-column label="状态" prop="status"></el-table-column> -->
      <el-table-column align="right">
        <template slot="header">
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="onInvite">邀请加入</el-button>
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
        <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
          <el-input
            v-model="memberForm.email"
            autocomplete="off"
            :disabled="memberForm.emaildisabled"
          ></el-input>
        </el-form-item>
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
import { createUserProxy } from "../utils/UserUtil";
import {
  getGenericUserProxy,
  getGenericUserByEmailProxy,
  createGenericUserProxy,
  updateGenericUserProxy,
  deleteGenericUserProxy
} from "../utils/GenericUserUtil";

export default {
  props: {
    role: String,
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
      switch (this.role) {
        case 'admin':
          return 'el-icon-school';
        case 'principal':
          return 'el-icon-medal';
        case 'mentor':
          return 'el-icon-timer';
        case 'teacher':
          return 'el-icon-view';
        default:
          return '';
      }
    },
    memberName() {
      switch (this.role) {
        case 'admin':
          return '校长';
        case 'principal':
          return '督导';
        case 'mentor':
          return '教师';
        case 'teacher':
          return '学生';
        default:
          return '';
      }
    },
    memberRole() {
      switch (this.role) {
        case 'admin':
          return 'principal';
        case 'principal':
          return 'mentor';
        case 'mentor':
          return 'teacher';
        case 'teacher':
          return 'student';
        default:
          return '';
      }
    }
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Email 地址不能为空"));
      } else {
        const members = this.getMembers();
        const isExist = members.find(member => {
          return member.email === value;
        });
        if (isExist) {
          callback(new Error("Email 地址已存在"));
        } else {
          callback();
        }
      }
    };
    return {
      roleUser: {},
      memberDialogVisible: false,
      memberDialogTitle: "",
      memberForm: {
        email: "",
        name: "",
        note: ""
      },
      formRules: {
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
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
      this.memberForm.email = "";
      this.memberForm.name = "";
      this.memberForm.note = "";
      this.memberForm.emaildisabled = false;
      this.memberDialogTitle = "邀请";
      this.memberDialogVisible = true;
    },
    onEdit(index, row) {
      this.memberForm.id = row.id;
      this.memberForm.email = row.email;
      this.memberForm.name = row.name;
      this.memberForm.note = row.note;
      this.memberForm.emaildisabled = true;
      this.memberDialogTitle = "编辑";
      this.memberDialogVisible = true;
    },
    async onConfirm() {
      const userId = this.memberForm.id;
      const userEmail = this.memberForm.email;
      const userName = this.memberForm.name;
      const userNote = this.memberForm.note;
      const memberRole = this.memberRole;
      if (!userId) {
        try {
          // create user in user table
          const newUser = await createUserProxy(
            this.$Amplify,
            userEmail,
            userName,
            memberRole
          );
          console.log(newUser);
          // add user in members
          const newMember = await createGenericUserProxy(
            memberRole,
            this.$Amplify,
            userEmail,
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
          const editedMember = await updateGenericUserProxy(
            memberRole,
            this.$Amplify,
            userId,
            userEmail,
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
          role: this.memberRole,
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
          deleteGenericUserProxy(this.memberRole, this.$Amplify, row.id)
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