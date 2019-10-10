module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    mongoose.connection.once('open',function(err){
        if(!err){
         console.log('数据库连接成功')
         }
    })

    const UserSchema = new Schema({
        email:{type:String,require:true},
        password:{type:String,require:true},
        nickname:{type:String,require:true}
        // 
    },{ timestamps:true })
    return mongoose.model('User',UserSchema)
}