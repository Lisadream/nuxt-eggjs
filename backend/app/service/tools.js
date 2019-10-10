// 暴露服务的类
const Service = require('egg').Service
const nodemailer = require('nodemailer')
// 生成验证码的的工具 svg-captcha
const svgCaptcha = require('svg-captcha')

const userEmail = "185646179@qq.com"

let  transporter = nodemailer.createTransport({
    service:'qq',
    port:465,
    secureConnetion:true,
    auth:{
        user: userEmail,
        pass: 'btlsjrfznifdbhbj'
    }
})

class ToolsService extends Service{
    captcha() {
        let captcha = svgCaptcha.create({
            size:4,
            fontSize:40,
            width:100,
            height:40
        })
        return captcha
    }
    async sendEmail(email,title,html){
        //用到第三方库
        const mailOptions ={
            from:userEmail,
            to:email,
            subject:title,
            html
        }
        try{
          await transporter.sendMail(mailOptions)
          return true
        }catch(err){
            console.log(err)
            return false
        }

    }
}
module.exports = ToolsService

