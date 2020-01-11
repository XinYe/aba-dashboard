<template>
  <div class="page-body">
    <div class="nav-header">
      <i class="el-icon-user"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/principal' }">{{principal.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mentor' }">{{mentor.name}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/teacher' }">{{teacher.name}} ({{teacher.email}})</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h1/>
    <div>
      <i class="el-icon-view">学生列表</i>
    </div>

    <el-table :data="students" stripe style="width: 100%" @row-click="onRowClick">
      <el-table-column label="学生" prop="name"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
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

    <el-dialog title="学生信息" :visible.sync="inviteDialogVisible">
      <el-form :model="inviteForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.gender" autocomplete="off"></el-input>
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
    mentor() {
      return this.$data.appContext.curMentor;
    },
    teacher() {
      return this.$data.appContext.curTeacher;
    },
    students() {
      const teacher = this.teacher;
      return this.$data.appContext.students.filter(student => {
        return student.teacher === teacher.email;
      });
    }
  },
  data() {
    return {
      inviteDialogVisible: false,
      inviteForm: {
        name: "",
        gender: ""
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    OnInvite() {
      if (!this.inviteForm.name || !this.inviteForm.gendar) {
        this.$message("各属性信息不能为空，请重新输入.");
        return;
      }
      const students = this.$data.appContext.students;
      const isExist = students.find(student => {
        return student.name === this.inviteForm.name;
      });
      if (isExist) {
        this.$message("姓名信息已存在，请重新输入.");
        return;
      }
      this.$data.appContext.students.push({
        teacher: this.teacher.email,
        name: this.inviteForm.name,
        gender: this.inviteForm.gender
      });
      this.inviteDialogVisible = false;
    },
    onRowClick(row, column) {
      if (!column.property) {
        return;
      }
      this.$data.appContext.curStudent = this.$data.appContext.students.find(
        student => {
          return student.name === row.name;
        }
      );
      this.$router.push({
        name: "student"
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
          const students = this.$data.appContext.students;
          const index = students.findIndex(student => {
            return student.name === row.name;
          });
          if (index >= 0) {
            students.splice(index, 1);
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