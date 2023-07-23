import mongoose from "mongoose";

// An interface that describe the properties that are required to create a new user
interface UserAttrs{
    email: string,
    password: string
}


const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//This is for validating the ts.
const buildUsers=(attrs: UserAttrs)=>{
    return new User(attrs);
}

const User = mongoose.model('User',userSchema)
export {User, buildUsers}