import React from "react";
import File from "../File/File";
import Dir from "../Dir/Dir";
import ImgM from "../imgm/ImgM";
import { Row, Col } from "antd";
import { BaseUrl } from "../../constrant";

function List(props) {
    const [curCol, setCurCol] = React.useState(0);

    return (
        <div>
        <Row gutter={[24, 24]}>
            {props.listdata?.map((item, index) => {
                if (!item.Dir) {
                    if (item.Filename.endsWith(".jpg") || item.Filename.endsWith(".png")) {
                        return (
                            <Col span={4}>
                                <ImgM src={BaseUrl + "/api/v1/storage/download?filepath=" + item.Path} filename={item.Filename}  />
                            </Col>
                        );
                    }
                    return (
                        <Col span={4}>
                            <File filename={item.Filename} filepath={item.Path} />
                        </Col>
                    );
                } else {
                    return (
                        <Col span={4}>
                            <Dir filename={item.Filename} OnClick={() => props.onUpdate(item.Path)}/>
                        </Col>
                    );
                } 
            })}
        </Row>
        </div>
    );
}

export default List;