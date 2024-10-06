import React,{FC,useState} from "react";
import type { MouseEvent } from "react";
import Card from "../Card/Card";
const Index:FC = ()=>{
    let getUid = ()=>(Math.random()+'').slice(-3)
    let [lists,setlists] = useState([
        {
            id:getUid(),
            name:"张三",
            age:"18"
        },
        {
            id:getUid(),
            name:"李四",
            age:"18"
        },
        {
            id:getUid(),
            name:"王二麻子",
            age:"18"
        },
        {
            id:getUid(),
            name:"惠",
            age:"18"
        },

    ])
    var del = (id:string)=>{
        setlists(lists.filter(item => item.id !==id))
    }
    return (
        <>
            <ul>
                {lists.map((item) => {

                    return (
                       <Card
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        age={item.age}
                        delItem={del}
                       />
                    )
                })}
            </ul>
            <button>添加</button>
        </>
    )
}
export default Index;