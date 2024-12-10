import React from "react";
import DirImg from "./dir.svg";
import "./dir.css";

function Dir(props) {
    return (
        <div class="container">
        <div class="dir-class">
            <img
                style={{ width: "80px", height: "80px" }}
                src={DirImg}
            />
        </div>
        <div>
            {props.filename}
        </div>
        </div>
    );
}

export default Dir;