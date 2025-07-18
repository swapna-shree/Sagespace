import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
  isFromUser?: boolean;
  isAI?: boolean;
}

const MessageSchema: Schema<Message> = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    isFromUser: {
      type: Boolean,
      default: true,
    },
    isAI: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false, 
  }
);


export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  displayName?: string;
  avatarUrl?: string;
  messages: Message[];
  createdAt?: Date;
  updatedAt?: Date;
  lastVerificationSentAt ?: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verifyCode: {
      type: String,
      required: [true, "Enter a valid verification code"],
    },
    verifyCodeExpiry: {
      type: Date,
      required: [true, "Verification code expiry is required"],
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    lastVerificationSentAt: {
      type: Date,
      default: null,
    },    
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
