import React from "react";
import "./Eula.css";
import close_img from "./assets/close1.png";

const Eula = (props) => {
  function close_eula() {
    props.close_eula_func();
  }
  return (
    <div className="eula_popup_cont">
      <img
        src={close_img}
        className="close_eula"
        alt="close"
        onClick={close_eula}
      />
      <div className="eula_popup_text">dkfjghjh dfgdlfkjhg dfkgkfjg</div>
    </div>
  );
};

export default Eula;
