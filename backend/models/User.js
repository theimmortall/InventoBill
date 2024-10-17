const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true, "Please Enter your name"],
        maxLength:[32, "Name Can't Exceed 32 Characters"],
        minLength: [4, "Name should have at least 4 Characters"],
    },

    email :{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
    },

    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "password should have at least 6 Characters"],
        maxLength: [128, "password cannot exceed 128 characters"],
        select: false,
    },

    contactNumber: {
        type: String,
        required: [true, "Please enter your contact number"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    

    createdAt: {
        type: Date,
        default: Date.now(),
      },
    role: {
        type: String,
        default: "user",
      },
      resetPasswordToken: String,
      resetPasswordExpiry: Date,
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWTToken
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, "alfa",{
        expiresIn:"1h",
        
    });
};

//verifying password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  
  module.exports = mongoose.model("User", userSchema);