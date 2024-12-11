import React, {useState} from "react";
import FileImg from "./file.svg";
import "./file.css";
import { Button, Modal, Input, Flex } from "antd";
import { BaseUrl } from "../../constrant";
import base64 from "base-64";

const { TextArea } = Input;


function File(props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");

    const showLoading = () => {
        setVisible(true);
        setLoading(true);

        fetch(BaseUrl + "/api/v1/storage/get?filepath=" + props.filepath)
        .then((response) => response.json())
        .then((data) => {
            data = base64.decode(data.data);
            setContent(data);
            setLoading(false);
        });
    }


    function handleClick() {
        showLoading();
    }

    return (
        <>
            <div class="container">
            <div class="file-class">
                <img
                    style={{ width: "80px", height: "80px" }}
                    src={FileImg}
                    onClick={handleClick}
                />
            </div>
            <div>
                {props.filename}
            </div>
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
                <Flex vertical gap={31}>
                <TextArea
                    style={{ height: 500, resize: 'none' }}
                    defaultValue={content}
                >
                    {content}
                </TextArea>
                {/* <pre>{content}</pre> */}
                </Flex>
                
            </Modal>
        </>
    );
}

export default File;