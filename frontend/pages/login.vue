<template>
  <el-container>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" type="text" autocomplete="off" name="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password type="password" prop="password" name="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
export default {
  layout: 'login',
  data() {
    // const validateEmail = (rule, value, callback) => {
    //   console.log(value)
    //   callback()
    // }
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(form) {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log('wqer', valid)
        if (valid) {
          let obj = {
            email: this.ruleForm.email,
            password: this.ruleForm.password
          }
          console.log(this.$store)
          let ret = await this.$store.dispatch('/user/login', obj)
          // let ret = await this.$http.post('/user/login', obj)
          // console.log('返回的ret' + ret)
        }
      })
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
