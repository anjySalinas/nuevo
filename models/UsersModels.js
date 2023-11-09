const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

//definir el modelo para los users

const UserSchema = new mongoose.Schema(
    {

    name:{
        type:String,
        required:[true, "nombre requerido"],
    },
    email:{
        type:String,
        required:[true, "email requerido"],
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            ,
            "email no valido"
        ]
    },
    role:{
        type: String,
        required:[true, "rol requerido"],
        enum:[
            "user",
            "publisher"
        ]
    },
    password:{
        type: String,
        required:[true, "contraseña requerido"],
        max:6,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//crear la accion pre
UserSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.password = await bcryptjs.
                    hash(this.password, sal)
})

const User=
mongoose.model('user', UserSchema)

module.exports=User
