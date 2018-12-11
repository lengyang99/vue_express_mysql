<template>
  <div>
    <user-search-bar @getUserByParams="getUserByParams"/>
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" @selection-change="onRowSelectedChange">
      <el-table-column v-if="showCheckedBox" type="selection" width="55"></el-table-column>
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="手机" prop="tel"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="onVisibleChange(true)">添加</el-button>
          <el-button type="primary" @click="handleDeleteMore">批量删除</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

<el-pagination
	@size-change="handleSizeChange"
	@current-change="handleCurrentChange"
	:current-page="currentPage"
	:page-sizes="[10, 20, 50, 100]"
	:page-size="pagesize"
	layout="total, sizes, prev, pager, next, jumper"
	:total="userList.length">
</el-pagination>
    <user-dailog
      :dialogFormVisible="dialogFormVisible"
      :form="form"
      :action="action"
      @subFormData="subFormData"
      @onVisibleChange="onVisibleChange"
    />
  </div>
</template>

<script>
import UserDailog from "./UserDailog";
import UserSearchBar from "./UserSearchBar";
export default {
  name: "hello",
  components: {
    UserDailog: UserDailog,
    UserSearchBar: UserSearchBar
  },
  data() {
    return {
      userList: [
        {
          userName: "张三",
          sex: "男",
          age: 24,
          tel: "15624879112"
        }
      ],
      dialogFormVisible: false,
      showCheckedBox: false,
      form: {
        userName: "",
        sex: "",
        age: "",
        tel: ""
      },
      currentPage:1,
      pagesize:10,
      rowId: null,
      action: "add",
      selectedRows: []
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    handleSizeChange(size){
      this.pagesize=size;
    },
    handleCurrentChange(current){
      this.currentPage=current;
    },
    onVisibleChange(dialogFormVisible) {
      this.action = "add";
      this.form = {
        userName: "",
        sex: "",
        age: "",
        tel: ""
      };
      this.dialogFormVisible = dialogFormVisible;
    },
    subFormData(formData) {
      if (this.action === "add") {
        this.addUser(formData);
      } else {
        this.updateUser(formData);
      }
    },
    getUserByParams(params) {
      this.$http.get("/api/user/getUserByParams", { params }).then(response => {
        this.userList = response ? response.data.data : [];
      });
    },
    addUser(formData) {
      this.$http.post("/api/user/addUser", formData, {}).then(response => {
        if (response && response.data.message === "success") {
          this.$message({ message: "添加成功", type: "success" });
          this.getUser();
        }
      });
    },
    getUser() {
      this.$http.get("/api/user/getUser").then(response => {
        this.userList = response ? response.data.data : [];
      });
    },
    updateUser(formData) {
      Object.assign(formData, { id: this.rowId });
      this.$http.post("/api/user/updateUser", formData).then(response => {
        if (response && response.data.message === "success") {
          this.$message({ message: "修改成功", type: "success" });
          this.getUser();
        }
      });
    },
    onRowSelectedChange(row) {
      this.selectedRows = row;
    },
    handleEdit(index, row) {
      const { userName, sex, age, tel, id } = row;
      this.action = "edit";
      this.rowId = id;
      this.form = { userName, sex, age, tel };
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get("/api/user/delUser", { params: { id: row.id } })
            .then(response => {
              if (response && response.data.message === "success") {
                this.$message({ message: "删除成功", type: "success" });
                this.getUser();
              }
            });
        })
        .catch(() => {
          this.$message({ message: "已取消删除", type: "info" });
        });
    },
    handleEditMore() {},
    handleDeleteMore() {
      if (this.showCheckedBox) {
        if (this.selectedRows.length === 0) {
          this.$message({ message: "请勾选需要删除的记录", type: "warn" });
        } else {
          const ids = [];
          this.selectedRows.forEach(item => {
            ids.push(item.id);
          });
          this.$http
            .get("/api/user/delMoreUser", { params: { ids: ids.toString() } })
            .then(response => {
              if (response && response.data.message === "success") {
                this.$message({ message: "删除成功", type: "success" });
                this.getUser();
              }
            });
        }
      } else {
        this.showCheckedBox = !this.showCheckedBox;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
