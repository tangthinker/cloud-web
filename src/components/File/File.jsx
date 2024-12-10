import React from "react";
import FileImg from "./file.svg";
import "./file.css";

function File(props) {
    return (
        <div class="container">
        <div class="file-class">
            <img
                style={{ width: "80px", height: "80px" }}
                src={FileImg}
            />
        </div>
        <div>
            {props.filename}
        </div>
        </div>
    );
}

export default File;