import React from "react";
import File from "../File/File";
import Dir from "../Dir/Dir";
import ImgM from "../imgm/ImgM";
import { Row, Col } from "antd";

function List(props) {
    const [curCol, setCurCol] = React.useState(0);

    return (
        <div>
        <Row>
            {props.listdata?.map((item, index) => {
                if (!item.Dir) {
                    if (item.Filename.endsWith(".jpg") || item.Filename.endsWith(".png")) {
                        let result = ""
                        const response = fetch("http://127.0.0.1:9999/api/v1/storage/get?path=" + item.Path)
                            .then((response) => response.json())
                            .then((data) => result = data.data)
                        
                        console.log("result: " + result);
                        return (
                            <Col span={4}>
                                <img src={`data:image/png;base64,${result}`} filename={item.Filename}  />
                            </Col>
                        );
                    }
                    return (
                        <Col span={4}>
                            <File filename={item.Filename} />
                        </Col>
                    );
                } else {
                    return (
                        <Col span={4}>
                            <Dir filename={item.Filename} />
                        </Col>
                    );
                } 
            })}
        </Row>
        </div>
    );
}

export default List;