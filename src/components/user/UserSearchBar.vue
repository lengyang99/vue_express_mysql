<template>
  <el-row type="flex" justify="space-around" align="center" :style="{marginBottom: 10+'px'}">
    <el-col :span="2" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <label>用户名称：</label>
    </el-col>
    <el-col :span="4" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <el-input v-model="userName" placeholder="按用户名称搜索"></el-input>
    </el-col>
    <el-col :span="1" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <label>年龄:</label>
    </el-col>
    <el-col :span="2" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <el-input v-model="age" placeholder="按年龄搜索"></el-input>
    </el-col>
    <el-col :span="1" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <label>手机:</label>
    </el-col>
    <el-col :span="3" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <el-input v-model="tel" placeholder="按手机搜索"></el-input>
    </el-col>
    <el-col :span="1" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <label>性别:</label>
    </el-col>
    <el-col :span="3">
      <el-select v-model="sex" placeholder="按性别搜索">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-col>
    <el-col :span="1" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <el-button type="primary" @click="searchUser">搜索</el-button>
    </el-col>
    <el-col :span="1" :style="{lineHeight: 40+'px', textAlign: 'right'}">
      <el-button @click="reset">重置</el-button>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: "UserSearchBar",
  data() {
    return {
      userName: "",
      age: "",
      tel: "",
      sex: ""
    };
  },
  methods: {
    searchUser() {
      const params = {
        userName: this.userName,
        age: this.age,
        tel: this.tel,
        sex: this.sex
      };
      this.$emit("getUserByParams", params);
    },
    reset() {
      this.userName = "";
      this.age = "";
      this.tel = "";
      this.sex = "";
      this.$emit("getUserByParams", {});
    }
  }
};
</script>