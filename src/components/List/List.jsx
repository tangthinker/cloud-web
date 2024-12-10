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