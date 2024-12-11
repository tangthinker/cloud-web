import React from "react";
import File from "../File/File";
import Dir from "../Dir/Dir";
import ImgM from "../imgm/ImgM";
import { List, Space } from "antd";
import { BaseUrl } from "../../constrant";
import "./list.css";

function ListList(props) {

    const ImgageList = props.listdata?.filter((item) => item.Filename.endsWith(".jpg") || item.Filename.endsWith(".png"));

    const FileList = props.listdata?.filter((item) => !item.Dir && !item.Filename.endsWith(".jpg") && !item.Filename.endsWith(".png"));

    const DirList = props.listdata?.filter((item) => item.Dir);

    return (
        <>
        <List >
            {DirList?.map((item, index) => {
                    return (
                        <List.Item>
                            <Dir filename={""} OnClick={() => props.onUpdate(item.Path)}/><div class="list-filename-class">{item.Filename}</div>
                        </List.Item>
                    );
            })}

            {FileList?.map((item, index) => {
                return (
                    <List.Item>
                        <File filename={""} filepath={item.Path} 
                            filesize={item.Size} filetimestamp={item.Timestamp}
                        /><div class="list-filename-class">{item.Filename}</div>
                    </List.Item>
                );
            })}

            {ImgageList?.map((item, index) => {
                return (
                    <List.Item>
                        <ImgM src={BaseUrl + "/api/v1/storage/get?filepath=" + item.Path} filename={""}  thuUrl={BaseUrl + "/api/v1/storage/get-thumbnail?filepath=" + item.Path}/> 
                        <div class="list-filename-class">{item.Filename}</div>
                    </List.Item>
                );
            })} 
            
        </List>

        </>
    );
}

export default ListList;
