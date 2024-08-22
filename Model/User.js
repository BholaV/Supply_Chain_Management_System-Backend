import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim : true,
        unique:true
    },
    password:{
        type: String,
        trim: true,
        set: function(password){
            let saltKey = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password,saltKey);
        }
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    }
},{versionKey: false});

const User = mongoose.model("User",userSchema);

User.checkPassword = (password, encryptedPassword)=>{
  return bcrypt.compareSync(password,encryptedPassword);
}

export default User;