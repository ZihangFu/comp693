import React,{FC} from "react";
type ListType ={
    id : string,
    name : string,
    age : string
    delItem?:(id : string)=> void
}
const Card:FC<ListType> = (props)=>{
    let del =() => {
        if(props.delItem){
            props.delItem(props.id)
        }
    }
    return(
        <>
             <li>
                            <span>{props.name}</span>
                            <span>{props.age}</span>
                            <button>Amend</button>
                            <button onClick={del}>Delete</button>
                        </li>
        </>
    )
}

export default Card;