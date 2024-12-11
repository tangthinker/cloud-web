import React from "react";
import DirImg from "./dir.svg";
import "./dir.css";

function Dir(props) {
    function handleClick() {
        props.OnClick();
    }

    return (
        <div class="container">
        <div class="dir-class">
            <img
                style={{ width: "80px", height: "80px" }}
                src={DirImg}
                onClick={handleClick}
            />
        </div>
        <div class="filename-class">
            {props.filename}
        </div>
        </div>
    );
}

export default Dir;