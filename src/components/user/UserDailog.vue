<template>
  <el-dialog title="用户管理" :visible.sync="dialogFormVisible">
  <el-form :model="form" ref="form">
    <el-form-item label="姓名" :label-width="labelWidth">
      <el-input v-model="form.userName" autocomplete="off" ></el-input>
    </el-form-item >
    <el-form-item label="性别" :label-width="labelWidth">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年龄" :label-width="labelWidth">
      <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
    </el-form-item>
    <el-form-item label="手机" :label-width="labelWidth">
      <el-input v-model="form.tel" placeholder="请输入手机号码"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="onCancel('form')">取 消</el-button>
    <el-button type="primary" @click="onOk('form')">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
  export default {
    name: 'userDailog',
    props:['dialogFormVisible','form','action'],
    data() {
      return {
        labelWidth: '120px'
      };
    },
    methods: {
      onOk(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form,'from');
            this.$emit('subFormData',this.form);
            this.$emit('onVisibleChange',false);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCancel(formName){
        this.$refs[formName].resetFields();
        this.$emit('onVisibleChange',false);
      }
    }
  };
</script>

