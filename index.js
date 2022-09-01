const path = require("path"); //절대경로 내장모듈
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
// mongodb 관련 모듈
const MongoClient = require("mongodb").MongoClient;

let db = null;
MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
  console.log("연결");
  if (err) {
    console.log(err);
  }
  db = client.db("crudapp");
});
//post방식으로 날아온 데이터 받을때
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  // res.send("hello crud :)");
  res.render("index");
});
app.get("/write", (req, res) => {
  // res.sendFile(path.join(__dirname, "public/html/write.html"));
  res.render("write");
});
app.post("/add", (req, res) => {
  db.collection("counter").findOne({ name: "total" }, (err, result) => {
    const total = result.totalPost;
    const subject = req.body.subject;
    const contents = req.body.contents;
    console.log(subject);
    console.log(contents);
    // insert delete update select sql
    // insert into
    const insertData = {
      no: total + 1,
      subject: subject,
      contents: contents,
    };
    db.collection("crud").insertOne(insertData, (err, result) => {
      db.collection("counter").updateOne({ name: "total" }, { $inc: { totalPost: 1 } }, (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log("잘들어갔음");
        res.send(`<script>alert("입력창띄우기"); location.href="/list"</script>`);
      });
    });
  });

  // req.console.log("write에서 post로 보낸 data 받는 곳");
  // res.send("잘 도착했어요!");
  // res.sendFile(path.join(__dirname, "public/html/result.html"));
  // res.redirect("/list");
});
app.get("/list", (req, res) => {
  // db crud 컬렉션에서 데이터 받은것을 파일로 보내줘야 한다.
  db.collection("crud")
    .find()
    .toArray((err, result) => {
      console.log(result);
      // res.send();res.json();res.sendFile();
      // res.json(result); //프론트가 알아서 처리해서 쓰기
      res.render("list", { list: result, title: "테스트용입니다." }); //페이지 내가 만들어서 보내주기
    });
  // res.send("list페이지");
});
// app.get("/detail", (req, res) => {
//   console.log(req.query.id);
//   res.render("detail");
// });
app.get("/detail/:no", (req, res) => {
  console.log(req.params.no);
  const no = parseInt(req.params.no);
  db.collection("crud").findOne({ no: no }, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.render("detail", { subject: result.subject, contents: result.contents });
    }
  });
  // res.render("detail");
});
app.listen(8099, () => {
  console.log("8099에서 서버 대기중");
});
