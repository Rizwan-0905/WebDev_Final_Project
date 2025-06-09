const mongoose= require ("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    userName: {
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        minLength: 8,
        required:true
    
    },
    role: {
        type: String,
        enum: ["client", "seller"], 
        default: "seller",
        required: true
      }
})
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("user", userSchema);

module.exports = User;