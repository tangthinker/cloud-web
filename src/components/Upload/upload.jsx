import React from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./upload.css";



function Upload(props) {

    const [file, setFile] = React.useState(null)

    const fileInputRef = React.useRef(null)

    React.useEffect(() => {
        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("path", props.path)
        formData.append("filename", file.name)

        fetch(props.url, {
            method: "POST",
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 0) {
                props.onSuccess()
            }
        })
    }, [file])

    const handleUpload = (event) => {
       setFile(event.target.files[0])
    }

    return (
        <div class="upload-container">
        <div class="upload-class">
            <CloudUploadOutlined style={{ fontSize: '35px', color: "black" }}  onClick={e => fileInputRef.current && fileInputRef.current.click()}>
            </CloudUploadOutlined>
            <input type="file" ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} />
        </div>
        </div>
    );
}

export default Upload;