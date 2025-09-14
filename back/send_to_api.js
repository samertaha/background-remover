// Requires "axios" and "form-data" to be installed (see https://www.npmjs.com/package/axios and https://www.npmjs.com/package/form-data)
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.apikey;

module.exports = async function send_to_api(file_path, file_name, color) {
  const inputPath = file_path;
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    fs.createReadStream(inputPath),
    path.basename(inputPath)
  );
  formData.append("bg_color", color);

  await axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    responseType: "arraybuffer",
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": apiKey,
    },
    encoding: null,
  })
    .then((response) => {
      if (response.status !== 200) {
        return console.error("Error:", response.status, response.statusText);
      }
      console.log("reached!");
      fs.writeFileSync(
        __dirname + "/no_bg_img/no_bg_" + file_name,
        response.data
      );
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
};
