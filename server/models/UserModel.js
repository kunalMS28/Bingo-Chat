import { genSalt } from "bcrypt";
import mongoose from "mongoose";
import { hash } from "bcrypt";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
           type:String,
           required:[true,"password required"],
           
    },
    firstName:{
        type:String,
        required:false,
        
    },
    lastName:{
        type:String,
        required:false,
        
    },
    image:{
        type:String,
        required:false,
        
    },
    color:{
        type:Number,
        required:false,
        
    },
    profileSetUp:{
        type:Boolean,
        required:false,
        
    },
});

userSchema.pre("save",async function(next){   // before saving the data this function is executed
const salt = await  genSalt();
this.password = await hash(this.password,salt);
next();
});

const User = mongoose.model("Users",userSchema);

export default  User;