import { useState } from "react"

function Player({name,symbol}){
    const [playerName,updatePlayerName] = useState(name);
    const [isEditing,updateEdit] = useState(false);

    function changeHandler(event){
        console.log(event);
        updatePlayerName(event.target.value)
    }
    let playerBlock = <span className="text-2xl mr-5 flex-1 bg-cyan-500 w-32 p-2 shadow-amber-200 rounded-xl">{playerName}</span>
    if (isEditing){
        playerBlock= <input type="text" placeholder="Enter Name" className="input flex-1" required defaultValue={playerName} onChange={changeHandler}/>
    }
    return <p className="flex-1 ml-20" playerid={symbol}>
        {playerBlock}
        <button className={`btn flex-1 ${isEditing?"bg-emerald-50":"bg-blue-300"}`} onClick={()=>updateEdit(!isEditing)}>{isEditing ? "Save" : "Edit"}</button>
        <span className="ml-4 flex-1">Player Symbol:{symbol}</span>
        </p>
}

export default function TicTocToe(){
    return <>
    <div className="bg-cyan-100 mx-10 p-3">
        <h1 className="text-3xl font-bold text-center">
            Tic-Toc-Toe
        </h1>
        <div className="playground">
            <div className="players flex">
               <Player name={"player 1"} symbol={"X"}/>
               <Player name={"player 2"} symbol={"O"}/>
            </div>

            <div className="board">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            
        </div>
    </div>
    </>
}