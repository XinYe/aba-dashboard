<template>
  <div>
    <div>
      <i class="el-icon-user"></i>
    </div>
    <div>
      <span>{{owner.name}}</span>
      <span>-</span>
      <span>({{owner.email}})</span>
    </div>
    <h1 />
    <div>
      <i class="el-icon-school"></i>
    </div>

    <el-table :data="principals" style="width: 100%">
      <el-table-column label="学校" prop="school"></el-table-column>
      <el-table-column label="校长" prop="name"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
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

    <el-dialog title="校长信息" :visible.sync="inviteDialogVisible">
      <el-form :model="inviteForm">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校名称" :label-width="formLabelWidth">
          <el-input v-model="inviteForm.name" autocomplete="off"></el-input>
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
      return this.$data.appData.owner;
    },
    principals() {
      return this.$data.appContext.getPrincipals(this.owner.email);
    }
  },
  data() {
    return {
      search: "",
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
      this.inviteDialogVisible = false;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>