const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const { User } = require("./models/User");

/* DB 연결 */
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jaemin:dlwoals0307@basicnode.zawmr.mongodb.net/basicnode?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("2020년 7월 12일 오후 2시"));

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
