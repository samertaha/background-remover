import React, { useRef, useState } from "react";
import "./Nobg.css";
import warning from "./assets/warning.png";

const Nobg = (props) => {
  const [color_hex, setColor_hex] = useState("");

  const inputElement = useRef();

  function choose_color_func() {
    inputElement.current.click(); // Trigger the color input click event
  }

  function bg_color(e) {
    setColor_hex(e.target.value);
    props.save_color_func(e.target.value);
  }

  return (
    <div className="no_bg_cont">
      {props.title === "Nobg" ? (
        <>
          {" "}
          <div className="nobg_title">
            אל תשכח להוריד את הקבצים, הם ימחקו אוטומטית כשתצא מהדף
          </div>
          <img className="warning" src={warning} alt="warning" />
          <button className="choose_color" onClick={choose_color_func}>
            צבע רקע{" "}
            <span
              className="span_color"
              style={{ backgroundColor: color_hex }}
            ></span>
          </button>
          <input
            type="color"
            ref={inputElement}
            className="input_color"
            onChange={bg_color}
          />
        </>
      ) : (
        <></>
      )}
      {props.img_name && props.title === "Nobg" ? (
        <img
          className="uploaded_img"
          src={"http://localhost:5000/no_bg_img/no_bg_" + props.img_name}
          alt="uploaded"
        />
      ) : (
        <></>
      )}

      {props.img_name && props.title === "original" ? (
        <img
          className="uploaded_img"
          src={"http://localhost:5000/upload_img/" + props.img_name}
          alt="uploaded"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Nobg;
