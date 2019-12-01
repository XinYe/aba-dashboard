<template>
  <div>
    <div style="display: flex">
      <i class="el-icon-back" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{owner.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/principal' }">{{principal.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1/>
    <div style="display: flex">
      <i class="el-icon-user"></i>
      <span>{{mentor.name}}</span>
      <span>-</span>
      <span>({{mentor.email}})</span>
    </div>
    <h1 />
    <div>
      <i class="el-icon-date"></i>
    </div>

    <el-table :data="teachers" stripe style="width: 100%" @row-dblclick="onRowClick">
      <el-table-column label="教师" prop="name"></el-table-column>
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

    <div class="table-row-note">* 双击表格行跳转至下一级</div>

    <el-dialog title="教师信息" :visible.sync="inviteDialogVisible">
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
    owner() {
      return this.$data.appContext.owner;
    },
    principal() {
      return this.$data.appContext.curPrincipal;
    },
    mentor() {
      return this.$data.appContext.curMentor;
    },
    teachers() {
      const mentor = this.mentor;
      return this.$data.appContext.teachers.filter(teacher => {
        return teacher.invitor === mentor.email;
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
      const teachers = this.$data.appContext.teachers;
      const isExist = teachers.find(teacher => {
        return teacher.email === this.inviteForm.email;
      });
      if (isExist) {
        this.$message("Email信息已存在，请重新输入.");
        return;
      }
      this.$data.appContext.teachers.push({
        invitor: this.mentor.email,
        name: this.inviteForm.name,
        email: this.inviteForm.email,
        status: "Pending"
      });
      this.inviteDialogVisible = false;
    },
    onRowClick(event) {
      this.$data.appContext.curTeacher = this.$data.appContext.teachers.find(
        teacher => {
          return teacher.email === event.email;
        }
      );
      this.$router.push({
        name: "teacher"
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
          const teachers = this.$data.appContext.teachers;
          const index = teachers.findIndex(teacher => {
            return teacher.email === row.email;
          });
          if (index >= 0) {
            teachers.splice(index, 1);
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