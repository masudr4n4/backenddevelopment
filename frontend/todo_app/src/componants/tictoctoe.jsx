import { useState } from "react"
import Toast from "./ToastMessage.jsx";
const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
let cordinate =undefined;

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
    return <div className={`flex-1 text-center ${isActive? "font-bold":undefined}`} playerid={symbol}>
                <div className="flex">
                    {playerBlock}
                    <span className="flex-1">
                        <button className={`btn ${isEditing?"bg-emerald-50":"bg-blue-300"}`} onClick={()=>updateEdit(!isEditing)}>{isEditing ? "Save" : "Edit"}</button>
                    </span>
                </div>
                <p className="flex-1">Player Symbol: <span className="text-2xl">{symbol}</span></p>

        </div>
}

function Board({currentPlayer,playerHandler}){
    const [currentBoard,updateBoard] = useState(board);
    console.log("Printing the currentBoard : ",currentBoard);
    function boardclickHandler(row,col){
        if(!currentBoard[row][col]){
            playerHandler();
            cordinate=[row,col]
        }
        console.log("clicked element index: ",row,col)
        updateBoard((currentBoard) =>{
            let updatedboard = [...currentBoard.map((data)=>([...data]))]
            console.log("Copied board: ",updatedboard);
            if(!updatedboard[row][col]){
                updatedboard[row][col] = currentPlayer;
            }
            return updatedboard;
        })
        
    }
    function resetBoard(){
        updateBoard(board);
    }

    return <>
    {currentBoard.map((row,rowIndex)=>(
        <ol key={rowIndex}>
            <div className="flex flex-row" key={rowIndex}>
                {row.map((col,colIndex)=>(
                    <li key={colIndex} className="btn bg-amber-50 m-2 w-20 md:w-40 h-20 md:h-40" onClick={()=>(boardclickHandler(rowIndex,colIndex))}> 
                    <button> 
                        {col}
                    </button>
                    </li>))}
           </div>
        
        </ol>))}
        <button className="btn btn-primary" onClick={resetBoard}>RESET BOARD!</button>
    </>
}

export default function TicTocToe(){
    const [currentActivePlayer,updateCurrentPlayer] = useState('X');
    


    function changeplayer(){
        console.log("Changing Player ,current player: ",currentActivePlayer)
        updateCurrentPlayer((player)=>{
            if(player=="X"){
                return "O"
            }
            if (player=="O"){
                return "X"
            }
        })
    }
    return <>
    <div className="bg-cyan-100 mx-0 md:mx-10 p-3 mb-10">
        <h1 className="text-3xl font-bold text-center">
            Tic-Toc-Toe
        </h1>
        <div className="playground">
            <div className="players flex">
            <Player name={"player 1"} symbol={"X"} isActive={currentActivePlayer=="X"}/>
            <Player name={"player 2"} symbol={"O"} isActive={currentActivePlayer=="O"}/>
            </div>
            <p className="text-blue-600/50 dark:text-sky-400/50 font-bold content-center text-center">Next turn is for <span className="text-red-300">{currentActivePlayer}</span> symbol holder! </p>
            <div className="board flex flex-col justify-center items-center">
                <Board currentPlayer={currentActivePlayer} playerHandler={changeplayer}/>
            </div>
            { cordinate ?<Toast message={`Player with ${currentActivePlayer=="X"?"O":"X"} symbol has just click on cordinate: ${cordinate}  !!`} type="info"/> : ''}
            
        </div>
    </div>
    </>
}