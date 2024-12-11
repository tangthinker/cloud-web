import React, {useState} from "react";
import FileImg from "./file.svg";
import "./file.css";
import { Button, Modal, Input, Flex } from "antd";
import { BaseUrl } from "../../constrant";
import base64 from "base-64";
import { FileOutlined } from "@ant-design/icons";

const { TextArea } = Input;


function File(props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");


    const filesize = props.filesize / 1024 / 1024; // MB

    const modTime = new Date(props.filetimestamp * 1000); // Unix timestamp to JS timestamp

    // 获取日期部分
    const year = modTime.getFullYear();
    const month = String(modTime.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(modTime.getDate()).padStart(2, '0');

    // 获取时间部分
    const hours = String(modTime.getHours()).padStart(2, '0');
    const minutes = String(modTime.getMinutes()).padStart(2, '0');
    const seconds = String(modTime.getSeconds()).padStart(2, '0');

    // 格式化为 YYYY-MM-DD HH:mm:ss
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const showLoading = () => {
        setVisible(true);
        setLoading(true);

        if (filesize < 5) {
            fetch(BaseUrl + "/api/v1/storage/get?filepath=" + props.filepath)
            .then((response) => response.json())
            .then((data) => {
                data = base64.decode(data.data);
                setContent(data);
                setLoading(false);
            });
        } else {
            setContent("File too large to display");
            setLoading(false);
        }

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


    function handleClick() {
        showLoading();
    }

    return (
        <>
            <div class="container">
            <div class="file-class">
                {/* <img
                    style={{ width: "80px", height: "80px" }}
                    src={FileImg}
                    onClick={handleClick}
                /> */}
                <FileOutlined style={{ fontSize: '35px', color: "black" }} onClick={handleClick} />

            </div>
            {
                filenameVendor()
            }
            </div>

            <Modal
                title={props.filename}
                footer={
                    <Button type="primary" onClick={showLoading}>
                    Reload
                    </Button>
                }
                open={visible}
                loading={loading}
                width={800}
                onCancel={() => setVisible(false)}
            >
                <p>文件大小: {filesize.toFixed(2) + "MB"} </p>
                <p>更新时间: {formattedDate}</p>
                <TextArea
                    style={{ height: 500, resize: 'none' }}
                    defaultValue={content}>
                    {content}
                </TextArea>
                
            </Modal>
        </>
    );
}

export default File;