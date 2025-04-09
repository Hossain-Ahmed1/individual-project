import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address: 
    {
        type: new mongoose.Schema({
            address1:{
                type:String,
                required: true
            },
            address2:{
                type:String,
                default:""
            },
            postcode:{
                type:String,
                required: true
            }
        }),
        //required:true
        default:{
            address1:"no where",
            postcode:"ab123"
        }
    },
    items:{
        type:[mongoose.ObjectId],
        default:[]
    }
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

const User = mongoose.model('User',userSchema)


export default User