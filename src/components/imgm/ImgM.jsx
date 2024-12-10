import React from "react";
import "./ImgM.css";
import { Image } from "antd";

function ImgM(props) {
    return (
        <div class="container">
        <div class="img-with-shadow">
            <Image
                src={props.src}
            />
        </div>
        <div>
            {props.filename}
        </div>
        </div>
    );
}

export default ImgM;