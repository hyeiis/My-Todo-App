const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//CORS오류방지
app.use(cors());

// router 분리
const router = require("./routes/todo");
app.use("/", router);

// 오류 처리
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// db 연결
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
