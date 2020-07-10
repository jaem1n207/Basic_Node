const express = require("express");
const app = express();
const port = 8080;

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

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
