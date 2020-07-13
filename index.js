const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const { User } = require("./models/User");

/* DB 연결 */
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

/* Route */

app.get("/", (req, res) => res.send("hello"));

app.post("/register", (req, res) => {
  // 회원 가입에 필요한 정보들을 client에서 가져와 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // 요청된 이메일을 DB에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    // 제공된 이메일에 해당하는 유저가 없다면
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
  });

  // 요청된 이메일이 DB에 있다면 비밀번호가 일치하는지 확인.
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    // 비밀번호가 일치한다면 토큰을 생성한다.
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
