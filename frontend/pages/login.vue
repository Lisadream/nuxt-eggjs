<template>
  <el-container>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" name="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password type="password" prop="password" name="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
.el-container {
  justify-content: center;
}
.el-form {
  width: 400px;
}
</style>
