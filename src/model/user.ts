import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdon: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {type: String, required: true},
    createdon: {type: Date, required: true, default: Date.now}
});


export interface User extends Document {
    username: string;
    email:string
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];

}

const UserSchema: Schema<User> = new Schema({
    username: {
        String,
        required:[true,"Username is required"],
        trim: true,
        lowercase: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email:{
        String,
        required:[true,"Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2, 3})+$/,"Please enter a valid email"],
        
    },
    password: {
        String,
        required:[true,"Password is required"],
        minlength: 6,
        maxlength: 20
    },
    verifyCode: {
        String,
        required:[true,"Verification code is required"],
    },
    verifyCodeExpiry: {
        Date,
        required:[true,"Verification code expiry is required"],
    },
    isVerified: {
        Boolean, 
        default:false
    },
    isAcceptingMessages: {
        Boolean,
        default:true

    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>)||mongoose.model<User>("User", UserSchema);

export default UserModel;