import React from "react";
import DirImg from "./dir.svg";
import "./dir.css";
import { FolderOutlined } from "@ant-design/icons";

function Dir(props) {
    function handleClick() {
        props.OnClick();
    }

    const filenameVendor = () => {
        if (props.filename.length > 0) {
            return (
                <div class="filename-class">
                    {props.filename}
                </div>
            )
        }
    }

    return (
        <div class="container">
        <div class="dir-class">
            {/* <img
                style={{ width: "80px", height: "80px" }}
                src={DirImg}
                onClick={handleClick}
            /> */}
            <FolderOutlined style={{ fontSize: '35px', color: "black" }} onClick={handleClick} />
        </div>
        { 
            filenameVendor()
        }
        
        </div>
    );
}

export default Dir;