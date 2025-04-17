import { useState } from "react"

const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

function Player({name,symbol,isActive}){
    const [playerName,updatePlayerName] = useState(name);
    const [isEditing,updateEdit] = useState(false);

    function changeHandler(event){
        console.log(event);
        updatePlayerName(event.target.value)
    }
    let playerBlock = <span className="text-xl flex-1 bg-cyan-200 shadow-amber-200 rounded-2xl p-1">{playerName}</span>
    if (isEditing){
        playerBlock= <input type="text" placeholder="Enter Name" className="input flex-1" required defaultValue={playerName} onChange={changeHandler}/>
    }
    return <div className="flex-1 text-center" playerid={symbol}>
        <div className="flex">
        {playerBlock}
        <span className="flex-1">
            <button className={`btn ${isEditing?"bg-emerald-50":"bg-blue-300"}`} onClick={()=>updateEdit(!isEditing)}>{isEditing ? "Save" : "Edit"}</button>
        </span>
        </div>
        <p className="flex-1">Player Symbol: <span className="text-2xl">{symbol}</span></p>
        </div>
}

function Board(){
    const [currentPlayer,updatePlayer] = useState('X');
    const [currentBoard,updateBoard] = useState(board);
    console.log("Printing the currentboard : ",currentBoard);
    

    function boardclickHandler(row,col){
        let player = "X"
        if (currentPlayer){
            player = "O"
        }
        console.log("clicked element index: ",row,col)
        updateBoard((currentBoard) =>{
            let updatedboard = [...currentBoard.map((data)=>([...data]))]
            console.log("Copied board: ",updatedboard);
            if(!updatedboard[row][col]){
                updatedboard[row][col] = player
            }
            return updatedboard;
        })
        updatePlayer(!currentPlayer)
    }

    return <>
    {currentBoard.map((row,rowIndex)=>(
        <ol key={rowIndex}>
            <div className="flex flex-row" key={rowIndex}>
                {row.map((col,colIndex)=>(
                    <li key={colIndex} className="btn bg-amber-50 m-2 w-40 h-40" onClick={()=>(boardclickHandler(rowIndex,colIndex))}> 
                    <button>
                        {col}
                    </button>
                    </li>))}
           </div>
        
        </ol>))}
    </>
}

export default function TicTocToe(){
    const [activePlayer,updateActivePlayer] = useState("X");
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
            <div className="board flex flex-col justify-center items-center">
                <Board />
            </div>
            
        </div>
    </div>
    </>
}