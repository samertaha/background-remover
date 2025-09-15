import React, { useRef, useState, useEffect } from "react";
import "./Bg.css";
import close_x from "./assets/close.png";
import logo from "./assets/logo.png";
import banner from "./assets/banner.png";
import axios from "axios";

import Downloadimg from "./Downloadimg";
import Nobg from "./Nobg";
import Downloadpopup from "./Download_popup";
import Eula from "./Eula";

export const Bg = () => {
  const [selected_tab, setSelected_tab] = useState(true);
  const [show_download_popup, setshow_download_popup] = useState(false);
  const [show_eula_popup, setshow_eula_popup] = useState(false);
  const [show_err_msg, setshow_err_msg] = useState(false);
  const [show_err_msg_size, setshow_err_msg_size] = useState(false);
  const [image_name, setimage_name] = useState("");
  const [bg_color, setbg_color] = useState("green");
  const [show_loader, setshow_loader] = useState(false);

  useEffect(() => {
    setshow_loader(false);
  }, [image_name]);

  function choose_tab() {
    setSelected_tab(!selected_tab);
  }

  function show_download_popup_func() {
    setshow_download_popup(true);
  }

  function close_popup_func() {
    setshow_download_popup(false);
  }

  function show_eula() {
    setshow_eula_popup(true);
  }

  function close_eula_func() {
    setshow_eula_popup(false);
  }

  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.click();
  };

  function uploaded_file(e) {
    setshow_loader(true);

    let file_info = e.target.files[0];

    // let url = "http://localhost:5000/upload_file";
    let url = "https://background-remover-2ape.onrender.com/upload_file";

    if (file_info.size <= 10000000) {
      if (
        file_info.type === "image/png" ||
        file_info.type === "image/jpeg" ||
        file_info.type === "image/jpg"
      ) {
        let formData = new FormData();

        formData.append("file", file_info);
        formData.append("color", bg_color);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        axios
          .post(url, formData, config)
          .then((response) => {
            setimage_name(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setshow_err_msg(true);
      }
    } else {
      setshow_err_msg_size(true);
    }
  }

  function save_color_func(color) {
    setbg_color(color);
  }

  return (
    <>
      <div className="bg_general">
        <img src={close_x} alt="close" className="close_img" />
        <div className="title">העלאת תמונה כדי להסיר את הרקע</div>
        <input
          type="file"
          ref={inputElement}
          className="input_file"
          onChange={uploaded_file}
        />
        <button className="upload_btn" onClick={focusInput}>
          העלאת תמונה
        </button>

        <div className="upload_text">פורמטים נתמכים .png,.jpg,.jpeg</div>
        {show_err_msg ? <div className="err_msg"> קובץ לא נתמך</div> : <></>}
        {show_err_msg_size ? (
          <div className="err_msg"> קובץ גדול מידי</div>
        ) : (
          <></>
        )}

        <div className="middle_div">
          <div className="right_div">
            <div className="right_div_inner">
              <Downloadimg
                show_download_popup_func={show_download_popup_func}
                title="תמונה חינם"
                subtitle="תצוגה מקדימה של תמונה"
                top="false"
                btn_text="הורד"
                last_title="איכות טובה עד 0.25 מגה פיקסל"
              ></Downloadimg>

              <Downloadimg
                title="Pro"
                subtitle="תמונה מלאה"
                top="true"
                btn_text="הורד HD"
                last_title="האיכות הטובה ביותר עד 25 מגה פיקסל"
              ></Downloadimg>
            </div>
          </div>
          <div className="left_div">
            <div className="tabs_cont">
              <div
                className={"tab " + (selected_tab ? "selected_tab" : "")}
                onClick={choose_tab}
              >
                הוסר רקע
              </div>
              <div
                className={"tab " + (!selected_tab ? "selected_tab" : "")}
                onClick={choose_tab}
              >
                מקורי
              </div>
            </div>

            <div className="left_div_inner">
              {selected_tab ? (
                <Nobg
                  save_color_func={save_color_func}
                  img_name={image_name}
                  title="Nobg"
                ></Nobg>
              ) : (
                <Nobg img_name={image_name} title="original"></Nobg>
              )}
            </div>

            <div className="left_div_footer">
              <button className="takanon_btn" onClick={show_eula}>
                תקנון החברה
              </button>
              <div className="takanon_text">
                על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות שלנו. אתר זה מוגן
                וחלים מדיניות ופרטיון.
              </div>
            </div>
          </div>
        </div>
        <div className="footer_cont">
          <img src={logo} className="footer_logo" alt="" />
          <img src={banner} className="footer_banner" alt="" />
        </div>
      </div>

      {show_download_popup ? (
        <>
          <div className="layout"> </div>
          <Downloadpopup
            img_name={image_name}
            close_popup_func={close_popup_func}
          >
            {" "}
          </Downloadpopup>
        </>
      ) : (
        <></>
      )}

      {show_eula_popup ? (
        <>
          <div className="layout"> </div>
          <Eula close_eula_func={close_eula_func}> </Eula>
        </>
      ) : (
        <></>
      )}

      {show_loader ? (
        <div className="loader">
          <div className="loader_in"> 39% </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Bg;
