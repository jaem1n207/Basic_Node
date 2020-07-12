const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* 스키마 생성 */
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  /* 관리자: 1 or 일반유저: 0 */
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  /* 토큰 유효기간 */
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  // Password encryption
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

/* User 모델 생성 */
const User = mongoose.model("User", userSchema);

module.exports = { User };
