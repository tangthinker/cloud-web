import React from "react";
import BackImg from "./back.svg";
import "./back.css";


function Back(props) {
    return (
        <div class="back-container">
        <div class="back-class">
            <img
                style={{ width: "80px", height: "80px" }}
                src={BackImg}
                onClick={props.OnClick}
            />
        </div>
        </div>
    );
}

export default Back;