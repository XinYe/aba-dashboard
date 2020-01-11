<template>
  <div class="page-body">
    <div class="nav-header">
      <i class="el-icon-user"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/principal' }">{{principal.name}} ({{principal.email}})</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1/>
    <div>
      <i class="el-icon-medal">督导列表</i>
    </div>

    <el-table :data="mentors" stripe style="width: 100%" @row-click="onRowClick">
      <el-table-column label="督导" prop="name"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
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

    <el-dialog title="督导信息" :visible.sync="inviteDialogVisible">
      <el-form :model="inviteForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.email" autocomplete="off"></el-input>
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
    principal() {
      return this.$data.appContext.curPrincipal;
    },
    mentors() {
      const principal = this.principal;
      return this.$data.appContext.mentors.filter(mentor => {
        return mentor.invitor === principal.email;
      });
    }
  },
  data() {
    return {
      inviteDialogVisible: false,
      inviteForm: {
        name: "",
        email: ""
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    OnInvite() {
      if (!this.inviteForm.email || !this.inviteForm.name) {
        this.$message("各属性信息不能为空，请重新输入.");
        return;
      }
      const mentors = this.$data.appContext.mentors;
      const isExist = mentors.find(mentor => {
        return mentor.email === this.inviteForm.email;
      });
      if (isExist) {
        this.$message("Email信息已存在，请重新输入.");
        return;
      }
      this.$data.appContext.mentors.push({
        invitor: this.principal.email,
        name: this.inviteForm.name,
        email: this.inviteForm.email,
        status: "Pending"
      });
      this.inviteDialogVisible = false;
    },
    onRowClick(row, column) {
      if (!column.property) {
        return;
      }
      this.$data.appContext.curMentor = this.$data.appContext.mentors.find(
        mentor => {
          return mentor.email === row.email;
        }
      );
      this.$router.push({
        name: "mentor"
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
          const mentors = this.$data.appContext.mentors;
          const index = mentors.findIndex(mentor => {
            return mentor.email === row.email;
          });
          if (index >= 0) {
            mentors.splice(index, 1);
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