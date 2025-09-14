import React from "react";
import "./Download_popup.css";
import close_img from "./assets/close1.png";
import not_robot from "./assets/not_robot.png";

const Downloadpopup = (props) => {
  function close_download_popup() {
    props.close_popup_func();
  }

  function download_img() {
    let no_bg_img = "no_bg_" + props.img_name;

    fetch("http://localhost:5000/" + no_bg_img).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = no_bg_img;
        a.click();
      });
    });
  }

  return (
    <div className="Download_popup_cont">
      <div className="top_div"></div>

      <img
        src={close_img}
        className="close_img"
        alt="close"
        onClick={close_download_popup}
      />

      <div className="download_title"> אישור להורדת תמונה</div>

      <div className="download_subtitle"> האם להוריד את התמונה ?</div>

      <div className="checkbox_cont">
        <input type="checkbox" />
        <div> אני לא רובוט </div>
        <img src={not_robot} className="not_robot_img" alt="not_robot" />
      </div>

      <div className="download_btn_cont">
        <button className="cancel_btn" onClick={close_download_popup}>
          ביטול
        </button>
        <button className="approve_btn" onClick={download_img}>
          אישור
        </button>
      </div>
    </div>
  );
};

export default Downloadpopup;
