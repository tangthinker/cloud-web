import React from "react";
import File from "../File/File";
import Dir from "../Dir/Dir";
import ImgM from "../imgm/ImgM";
import { Row, Col } from "antd";
import { BaseUrl } from "../../constrant";

function List(props) {
    const [curCol, setCurCol] = React.useState(0);

    const ImgageList = props.listdata?.filter((item) => item.Filename.endsWith(".jpg") || item.Filename.endsWith(".png"));

    const FileList = props.listdata?.filter((item) => !item.Dir && !item.Filename.endsWith(".jpg") && !item.Filename.endsWith(".png"));

    const DirList = props.listdata?.filter((item) => item.Dir);

    return (
        <div>
        <Row gutter={[24, 24]}>
            {DirList?.map((item, index) => {
                return (
                    <Col span={3}>
                        <Dir filename={item.Filename} OnClick={() => props.onUpdate(item.Path)}/>
                    </Col>
                );
            })}

           
        </Row>

        <Row gutter={[24, 24]}>
            {FileList?.map((item, index) => {
                return (
                    <Col span={3}>
                        <File filename={item.Filename} filepath={item.Path} 
                            filesize={item.Size} filetimestamp={item.Timestamp}
                        />
                    </Col>
                );
            })}
        </Row>

        <Row gutter={[10, 10]}>
            {ImgageList?.map((item, index) => {
                return (
                    <Col span={4.3}>
                        <ImgM src={BaseUrl + "/api/v1/storage/get?filepath=" + item.Path} filename={item.Filename}  thuUrl={BaseUrl + "/api/v1/storage/get-thumbnail?filepath=" + item.Path}/>
                    </Col>
                );
            })}
        </Row>
        </div>
    );
}

export default List;


// {props.listdata?.map((item, index) => {
//     if (!item.Dir) {
//         if (item.Filename.endsWith(".jpg") || item.Filename.endsWith(".png")) {
//             return (
//                 <Col span={5}>
//                     <ImgM src={BaseUrl + "/api/v1/storage/get?filepath=" + item.Path} filename={item.Filename}  thuUrl={BaseUrl + "/api/v1/storage/get-thumbnail?filepath=" + item.Path}/>
//                 </Col>
//             );
//         }
//         return (
//             <Col span={3}>
//                 <File filename={item.Filename} filepath={item.Path} />
//             </Col>
//         );
//     } else {
//         return (
//             <Col span={3}>
//                 <Dir filename={item.Filename} OnClick={() => props.onUpdate(item.Path)}/>
//             </Col>
//         );
//     } 
// })}