import React,{FC,useState,useEffect} from "react";

const Hooks :FC = ()=>{
    const [text,setText] = useState("");
    const [count,setCount] = useState(0);
    useEffect(()=>{
        alert(1)
        console.log("cout++")
    },[count])
    return (
        <>
            <p>Hooks</p>
            <h2>{count}</h2>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <button onClick={()=>{setCount(count+1)}}>Add</button>
        </>
    )
}

export default Hooks;