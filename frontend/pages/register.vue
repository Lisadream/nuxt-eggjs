<template>
  <el-container>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" type="text" autocomplete="off" name="email"></el-input>
      </el-form-item>
      <el-form-item label="邮箱验证码">
        <el-col :span="14">
          <el-input v-model="ruleForm.emailcode" type="text" prop="emailcode" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="10" style="padding-left:12px;box-sizing:border-box">
          <el-button @click="sendCode()">发送验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形验证码" prop="user">
        <el-col :span="14" style="height:40px;">
          <el-input v-model="ruleForm.captcha" type="text" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="10">
          <img :src="code.captcha" @click="resetCaptcha()" />
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" show-password autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '185646179@qq.com',
        pass: '222',
        checkPass: '222',
        emailcode: '1232',
        nickname: '534534',
        captcha: 'dxdt'
      },
      code: {
        captcha: '/api/user/captcha'
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入正确的邮箱' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetCaptcha() {
      this.code.captcha = '/api/user/captcha?_t=' + new Date().getTime()
    },
    async sendCode() {
      let ret = await this.$http.get('/user/sendcode?email=' + this.ruleForm.email)
      if (ret.data.code === 0) {
        this.$notify({
          title: '发送成功',
          type: 'success'
        })
        console.log(ret.data.code)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log('loading切换')
          let obj = {
            email: this.ruleForm.email,
            emailcode: this.ruleForm.emailcode,
            password: this.ruleForm.pass,
            captcha: this.ruleForm.captcha,
            nickname: this.ruleForm.nickname
          }
          console.log(obj)
          let ret = await this.$http.post('/user/register', obj)
          console.log('返回的ret' + ret)
          if (ret.data.code === 0) {
            console.log('注册成功' + ret)
          } else {
            this.$notify({
              title: ret.data.message,
              type: 'warning'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
