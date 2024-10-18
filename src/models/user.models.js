import mongoose, { schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new schema(
  {
    username: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: string,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: string, // using cloudinary url
      required: true,
    },
    coverimage: {
      type: string, // using cloudinary url
    },
    watchHistor: [
      {
        type: schema.types.objectId,
        ref: "Video",
      },
    ],
    password: {
      type: string,
      required: [true, "password is required"],
    },
    refereshTokens: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.ispasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
 return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRy,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
};

export const User = mongoose.model("User", userSchema);
