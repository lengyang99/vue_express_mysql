<template>
  <el-table
    :data="userList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="userName"
      prop="userName">
    </el-table-column>
    <el-table-column
      label="age"
      prop="age">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="请输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        userList: [{
          userName: '张三',
          age: 24,
        }],
      }
    },
    methods: {
      addUser() {
        var name = this.userName;
        var age = this.age;
        this.$http.post('/api/user/addUser', {
          username: name,
          age: age
        },{}).then((response) => {
          console.log(response);
        })
      },
      getUser() {
        this.$http.get('/api/user/getUser').then((response) => {
          console.log(response,'????');
          this.userList = response ? response.body.data : [];
        })
      },
      updateUser() {
        this.$http.get('/api/user/updateUser',{filed:1}).then((response) => {
          console.log(response,'????');
          this.userList = response ? response.body.data : [];
        })
      },
      delUser() {
        this.$http.get('/api/user/delUser').then((response) => {
          console.log(response,'????');
          this.userList = response ? response.body.data : [];
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
