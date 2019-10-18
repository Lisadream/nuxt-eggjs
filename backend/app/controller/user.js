'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
    async index() {
        const { ctx } = this;
        ctx.body = '用户信息';
    }
    async checkEmail(email){
        // 去库里查
        const user = await this.ctx.model.User.findOne({email})
        return user
    }
    async login(){
      const {ctx} =this
      ctx.body='kwg kwg wgkwg wg'

    }
    async create() {
        console.log(this)
        const {ctx}=this
        let {email,emailcode,captcha,nickname,password} = ctx.request.body
        
        
        // 数据校验  连接moogodb
        //console.log(emailcode,ctx.session.emailcode)
        //if(emailcode !== ctx.session.emailcode){
         //   return this.error('邮箱验证码出错bbbbb')
        //}
        //if(captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()){
        //    return this.error('图片验证码出错')
        //}
        //console.log('注册成功')

        //if(await this.checkEmail(email)){
        //   return this.error('邮箱已经存在')
        // }
       
        let ret = await ctx.model.User.create({
            email,
            password,
            nickname
         },(err,res)=>{
            
            console.log(this)
            this.ctx.body={message:"注册成功"}
             
            if(!err){
                
                console.log('数据创建成功') 
                
            }
            

         })
         
         
         console.log("ret----------" + ret)
         //ctx.body= {message:ret}
         //console.log("------------------------") 
         //console.log(ctx.model.User.create())
         //ctx.body={message:"注册成功"}

         
         
         
        //if(ret.id){
        //  this.message('注册成功')
        //}

    }
    async captcha() {
        // 生成验证码，需要service 
        
        const {ctx} = this 
        let captcha = await this.service.tools.captcha()
        ctx.session.captcha = captcha.text
        console.log("图片验证码" + captcha.text)
        ctx.response.type = 'image/svg+xml'
        ctx.body = captcha.data

    }
    async email() {
        // controller写业务逻辑，通用的逻辑，抽象成service
        const { ctx } = this
        const email = ctx.query.email
        const code = Math.random().toString().slice(2, 6)
        console.log('邮件验证码' + code)
        const title = '登录邮箱验证码'
        const html = `
            <h1>注册邮箱验证码</h1>
            <a >${code}</a>
        `
        const hasSend = this.service.tools.sendEmail(email, title, html)
        console.log(hasSend)

        if (hasSend) {
            ctx.session.emailcode = code
            this.message('发送成功')
        } else {
            this.error('发送失败')
        }

    }
    demoinfo() {
        console.log(this.ctx.session)
        //this.message('成功信息')
        this.success('成功信息')
        // ctx.body = {
        //     code:0,
        //     data:'测试信息'
        // }; 
    }
}

module.exports = UserController;