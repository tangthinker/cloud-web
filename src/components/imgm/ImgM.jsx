import React from "react";
import "./ImgM.css";
import { Image } from "antd";

function ImgM(props) {

    const [fetchD, setFetchD] = React.useState("");

    const [fetchS, setFetchS] = React.useState("");

    React.useEffect(() => {
        fetch(props.src)
        .then((response) => response.json())
        .then((data) => {
            setFetchS(data.data);
        });
    }, [])

    React.useEffect(() => {
        fetch(props.thuUrl)
        .then((response) => response.json())
        .then((data) => {
            setFetchD(data.data);
        });
    }, [])

    return (
        <div class="container">
        <div class="img-with-shadow">
            <Image
                src={"data:image/jpeg;base64," + fetchD}
                preview={{
                    src: "data:image/jpeg;base64," + fetchS,
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