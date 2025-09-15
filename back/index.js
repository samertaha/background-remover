const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");
const send_to_api = require("./send_to_api");
const fs = require("fs");
const path = require("path");

// Ensure upload_img and no_bg_img directories exist
const uploadDir = path.join(__dirname, "upload_img");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const noBgDir = path.join(__dirname, "no_bg_img");
if (!fs.existsSync(noBgDir)) {
  fs.mkdirSync(noBgDir);
}

app.use(cors());
app.use(fileupload());

app.use("/no_bg_img", express.static("no_bg_img"));
app.use("/upload_img", express.static("upload_img"));
// app.use(express.static("no_bg_img"));
// app.use(express.static("upload_img"));

const port = process.env.PORT || 5000;

app.post("/upload_file", (req, res) => {
  let d = new Date();
  let time = d.getTime();

  let color = req.body.color;

  let fileName = time + "_" + req.files.file.name;

  let file_path = path.join(uploadDir, fileName);

  req.files.file.mv(file_path, async function (err) {
    if (err) {
      console.log(err);
    } else {
      //  console.log("uploaded");

      await send_to_api(file_path, fileName, color);

      res.send(fileName);
      //console.log("fileName : " + fileName);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
