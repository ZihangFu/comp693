import React,{FC,useState} from "react";
type TodayListType = {
    id : string,
    name : string,
    desc : string,
    status : number,
    delItem? : (id : string)=> void,
    editItem? :(id : string)=> void,
}
const TodayList : FC<TodayListType> = (props)=>{
    function edit(){
        if(props.editItem) props.editItem(props.id);
        return;
    }
    
    function del(){
        if(props.delItem) props.delItem(props.id);
        return;
    }

    return(
        <li><span>{props.name}</span><span>{props.desc}</span>{props.status===0?<span>待办</span>:<span>完成</span>}<button onClick={edit}>修改</button><button onClick={del}>删除</button></li>
    )
}
export type {TodayListType};
export default TodayList;