import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    fullname: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    profilePicture: {
      type: String,
      trim: true,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password
UserSchema.pre("save", async function () {
  try {
    await bcryptjs.hash(this.password, 10);
    console.log("✅ Password are hashed successfully");
  } catch (error) {
    console.log("❌ Error occoured while hashing the password");
  }
});

// Check the password correction
UserSchema.method.isPasswordCorrect = async function (password) {
  try {
    const isMatch = await bcryptjs.compare(password, this.password);

    if (isMatch) console.log("✅ Password Successfully Hashed");
  } catch (error) {
    console.log("❌ The Plain & Hashed Password didnot match");
  }
};

// Access token generation
UserSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Refresh token generation
UserSchema.method.generateAccessToken = function () {
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

export const User = mongoose.model("User", UserSchema);
