<template>
  <div>
    <div>
      <i class="el-icon-user"></i>
      <span>{{owner.name}}</span>
      <span>-</span>
      <span>({{owner.email}})</span>
    </div>
    <h1 />
    <div>
      <i class="el-icon-school"></i>
    </div>

    <el-table :data="principals" stripe style="width: 100%" @row-dblclick="onRowDblClick">
      <el-table-column label="校长" prop="name"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column label="学校" prop="school"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="inviteDialogVisible = true"
          >邀请加入</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-row-note">* 双击表格行跳转至下一级</div>

    <el-dialog title="校长信息" :visible.sync="inviteDialogVisible">
      <el-form :model="inviteForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校名称" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.school" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inviteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="OnInvite()">邀请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    owner() {
      return this.$data.appContext.owner;
    },
    principals() {
      const owner = this.owner;
      return this.$data.appContext.principals.filter(principal => {
        return principal.invitor === owner.email;
      });
    }
  },
  data() {
    return {
      inviteDialogVisible: false,
      inviteForm: {
        name: "",
        email: "",
        school: ""
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    OnInvite() {
      if (
        !this.inviteForm.email ||
        !this.inviteForm.name ||
        !this.inviteForm.school
      ) {
        this.$message("各属性信息不能为空，请重新输入.");
        return;
      }
      const principals = this.$data.appContext.principals;
      const isExist = principals.find(principal => {
        return principal.email === this.inviteForm.email;
      });
      if (isExist) {
        this.$message("Email信息已存在，请重新输入.");
        return;
      }
      this.$data.appContext.principals.push({
        invitor: this.owner.email,
        name: this.inviteForm.name,
        email: this.inviteForm.email,
        school: this.inviteForm.school,
        status: "Pending"
      });
      this.inviteDialogVisible = false;
    },
    onRowDblClick(event) {
      this.$data.appContext.curPrincipal = this.$data.appContext.principals.find(
        principal => {
          return principal.email === event.email;
        }
      );
      this.$router.push({
        name: "principal"
      });
    },
    handleEdit() {
      this.$message("Coming soon.");
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const principals = this.$data.appContext.principals;
          const index = principals.findIndex(principal => {
            return principal.email === row.email;
          });
          if (index >= 0) {
            principals.splice(index, 1);
          }
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style>
.table-row-note {
  color: gray;
  font-size: 14px;
}
</style>