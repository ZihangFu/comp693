import React,{FC,useState} from "react";
import type { ChangeEvent } from "react";
import TodayList from "./TodayList";
import type { TodayListType } from "./TodayList";
function Uid(){
    return (Math.random()+'').slice(-3);
}
const TodayMain :FC = ()=>{
    var typelists : TodayListType[] = [];
    let [TodayLists,setTodayLists] = useState(typelists);
    let [name,setName] = useState("");

    function nameValue(e:ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }
    function del(id:string){
        setTodayLists(TodayLists.filter(item => item.id !== id));
    }
    function edit(id:string){
        setTodayLists(TodayLists.map((item)=>{
            if (item.id !==id) return item
            return {
                ...item,
                status :1
            }
        }))
    }
    function add(){
        setTodayLists(TodayLists.concat({
            id:Uid(),
            name,
            desc:"cs",
            status:0
        }))
    }
    return(
        <div style={{display:"flex",flexWrap:"wrap"}}>
            <ul>
                {TodayLists.map((i)=>{
                   return <TodayList
                    key={i.id}
                    id={i.id}
                    name={i.name}
                    desc={i.desc}
                    status={i.status}
                    delItem={del}
                    editItem={edit}
                    />
                })}
            </ul>
            <div>
                <input type="text" value={name} onChange={e => nameValue(e)} />
                <button onClick={add}>添加</button>
            </div>
        </div>

    )
}

export default TodayMain;