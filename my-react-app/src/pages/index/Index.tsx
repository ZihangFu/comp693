import React,{FC,useState} from "react";
import type { MouseEvent } from "react";
import Card from "../Card/Card";
const Index:FC = ()=>{
    let getUid = ()=>(Math.random()+'').slice(-3)
    let [lists,setlists] = useState([
        {
            id:getUid(),
            name:"Amy",
            age:"18"
        },
        {
            id:getUid(),
            name:"Jack",
            age:"18"
        },
        {
            id:getUid(),
            name:"Jeff",
            age:"18"
        },
        {
            id:getUid(),
            name:"Andy",
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
            <button>Add</button>
        </>
    )
}
export default Index;