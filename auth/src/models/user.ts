import { Password } from './../services/password';
import mongoose from "mongoose";

// An interface that describe the properties 
// that are required to create a new user
interface UserAttrs{
    email: string,
    password: string
}

//An interface that describes the properties 
// that are required to create a new User
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
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
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id
            delete ret.password;
            delete ret.__v
            delete ret._id
        }
    }
});

userSchema.pre('save',async function (done) {
    if(this.isModified('password')){
        const hased=await Password.toHash(this.get('password'));
        this.set('password',hased);
    }
    done();
})

userSchema.statics.build=(attrs: UserAttrs)=>{
    return new User(attrs);
}


const User = mongoose.model<UserDoc,UserModel>('User',userSchema)
export {User}