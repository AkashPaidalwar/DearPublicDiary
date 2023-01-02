const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const fetch = require("node-fetch");

dotenv.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB"))
  .catch(console.log("cant connect to the database"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
app.post("/api/upload", async (req, res) => {

  try {
    console.log("this line in api/upload ic called")
    console.log(req.body)
    let response = await fetch(
      `https://www.filestackapi.com/api/store/S3?key=AUvPiLE8TkaaaCDM2hZRQz&filename=${req.body.name}`,
      {
        headers: { "Content-Type": "image/jpeg",
      },
        method: "POST",
        body: req.files
        //body: req.files.file.data,
        //body: req.files.postImage.data,
      }
    );
    let data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);
var filePath = "./client/build/index.html";
var resolvedPath = path.resolve(filePath);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
