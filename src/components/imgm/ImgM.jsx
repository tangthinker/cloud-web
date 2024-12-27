import React from "react";
import "./ImgM.css";
import { Image, Space } from "antd";
import { DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined, 
} from "@ant-design/icons";
import { invoke } from "@tauri-apps/api/core";

async function fetchImage(url) {
    try {
        const response = await invoke("get_img_data", {
            url: url,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}


function ImgM(props) {

    const [fetchD, setFetchD] = React.useState("");

    const [fetchS, setFetchS] = React.useState("");

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "data:image/jpeg;base64," + fetchS;
        link.download = props.filename;
        link.click();
    }

    const look = () => {
        // fetch(props.src)
        // .then((response) => response.json())
        // .then((data) => {
        //     setFetchS(data.data);
        // });
        fetchImage(props.src).then((data) => {
            setFetchS(data);
        });
    }

    React.useEffect(() => {
        fetch(props.thuUrl)
        .then((response) => response.json())
        .then((data) => {
            setFetchD(data.data);
        });
    }, [props.thuUrl])

    return (
        <div class="container">
        <div class="img-with-shadow">
            <Image
                src={"data:image/jpeg;base64," + fetchD}
                preview={{
                    src: "data:image/jpeg;base64," + fetchS,
                    toolbarRender: (
                        _,
                        {
                          transform: { scale },
                          actions: {
                            onFlipY,
                            onFlipX,
                            onRotateLeft,
                            onRotateRight,
                            onZoomOut,
                            onZoomIn,
                            onReset,
                          },
                        },
                    ) => {

                            return [
                            <Space size={12} className="toolbar-wrapper">
                                <DownloadOutlined onClick={handleDownload} />
                                <SwapOutlined rotate={90} onClick={onFlipY} />
                                <SwapOutlined onClick={onFlipX} />
                                <RotateLeftOutlined onClick={onRotateLeft} />
                                <RotateRightOutlined onClick={onRotateRight} />
                                <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                <UndoOutlined onClick={onReset} />
                            </Space>
                            ]
                        
                    },
                    onVisibleChange: () => {
                        look()
                    }
                }}
            />
        </div>
        <div class="filename-class">
            {props.filename}
        </div>
        </div>
    );
}

export default ImgM;