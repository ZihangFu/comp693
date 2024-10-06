import { useState } from 'react'
import type { ChangeEvent } from 'react'
// import Index from './pages/index/Index'
// import TodayMain from './pages/TodayList/TodayMain'
import Hooks from './pages/Hooks/Hooks';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  let [test,setTest] = useState("");
  function myTest(){
    console.log(test)
  }
  function getTest(e :ChangeEvent<HTMLInputElement>){
    setTest(e.target.value);
  }
  return (
    <>
     {/* <TodayMain/> */}
     <Hooks/>
    </>
  )
}

export default App
